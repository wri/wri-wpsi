#!/bin/bash

# CONFIG
URL="https://waterpeacesecurity.org/"
PUMA_SERVICE="puma"
SLACK_WEBHOOK_URL="https://slack.com/api/chat.postMessage"
SLACK_TOKEN="xoxb-xxx"
STATUS_FILE="/tmp/website_status.txt"
SLACK_CHANNEL="C098X6S0FQC"

# Function to send Slack message
send_slack_message() {
    local message="$1"
    curl -X POST -H "Authorization: Bearer $SLACK_TOKEN" \
    -H "Content-type: application/json" \
    -d "{\"text\": \"$message\", \"channel\": \"$SLACK_CHANNEL\"}" \
    "$SLACK_WEBHOOK_URL"
}

# Function to get current status
get_website_status() {
    curl -s -o /dev/null -w "%{http_code}" "$URL"
}

# Function to get previous status
get_previous_status() {
    if [ -f "$STATUS_FILE" ]; then
        cat "$STATUS_FILE"
    else
        echo "200"  # Assume it was working before
    fi
}

# Function to save current status
save_status() {
    echo "$1" > "$STATUS_FILE"
}

# Get current and previous status
CURRENT_STATUS=$(get_website_status)
PREVIOUS_STATUS=$(get_previous_status)

echo "[$(date)] Current status: $CURRENT_STATUS, Previous status: $PREVIOUS_STATUS"

# Check if website is down
if [ "$CURRENT_STATUS" -ne 200 ]; then
    echo "[$(date)] Website down. Status: $CURRENT_STATUS"
    
    # Only send message if this is the first time it's down (was working before)
    if [ "$PREVIOUS_STATUS" -eq 200 ]; then
        echo "[$(date)] Website just went down. Sending Slack notification..."
        send_slack_message "🚨 $URL is down (Status: $CURRENT_STATUS)"
        
        # Restart Puma
        echo "[$(date)] Restarting Puma service..."
        sudo systemctl restart "$PUMA_SERVICE"
        
        # Wait a bit for the service to restart
        sleep 10
        
        # Check if restart fixed it
        NEW_STATUS=$(get_website_status)
        if [ "$NEW_STATUS" -eq 200 ]; then
            echo "[$(date)] Website recovered after Puma restart"
            send_slack_message "✅ $URL recovered after Puma restart"
        else
            echo "[$(date)] Website still down after Puma restart (Status: $NEW_STATUS)"
            send_slack_message "⚠️ $URL still down after Puma restart (Status: $NEW_STATUS)"
        fi
        save_status "$NEW_STATUS"
    else
        echo "[$(date)] Website still down. No additional Slack message sent."
        # Still try to restart Puma in case it helps
        sudo systemctl restart "$PUMA_SERVICE"
        sleep 10
        NEW_STATUS=$(get_website_status)
        save_status "$NEW_STATUS"
    fi
else
    # Website is up
    if [ "$PREVIOUS_STATUS" -ne 200 ]; then
        echo "[$(date)] Website recovered!"
        send_slack_message "✅ $URL is back online"
    else
        echo "[$(date)] Website is up and running"
    fi
    save_status "$CURRENT_STATUS"
fi
