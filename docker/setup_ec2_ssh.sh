#!/bin/bash

# EC2 SSH Setup Script for WRI WPSI Docker Container
# This script helps set up SSH access FROM the container TO EC2 instances

# Function to add EC2 instance configuration
add_ec2_instance() {
    local instance_name=$1
    local hostname=$2
    local username=$3
    local key_file=$4
    local port=${5:-22}
    
    echo "Adding EC2 instance: $instance_name"
    
    # Create SSH config entry
    local ssh_config_entry="
Host $instance_name
    HostName $hostname
    User $username
    IdentityFile /root/.ssh/$key_file
    Port $port
    ForwardAgent yes
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null"
    
    # Add to container's SSH config
    docker exec wri_app bash -c "echo '$ssh_config_entry' >> /root/.ssh/config"
    
    echo "EC2 instance '$instance_name' added successfully!"
}

# Function to copy SSH key to container
copy_ssh_key() {
    local key_file=$1
    local container_key_name=${2:-$(basename $key_file)}
    
    if [ ! -f "$key_file" ]; then
        echo "Error: SSH key file '$key_file' not found."
        return 1
    fi
    
    echo "Copying SSH key '$key_file' to container..."
    docker cp "$key_file" "wri_app:/root/.ssh/$container_key_name"
    docker exec wri_app chmod 600 "/root/.ssh/$container_key_name"
    echo "SSH key copied and permissions set."
}

# Function to test EC2 connection
test_ec2_connection() {
    local instance_name=$1
    
    echo "Testing connection to EC2 instance: $instance_name"
    docker exec wri_app ssh -o ConnectTimeout=10 "$instance_name" "echo 'Connection successful!'"
    
    if [ $? -eq 0 ]; then
        echo "✅ Connection to $instance_name successful!"
    else
        echo "❌ Connection to $instance_name failed."
        echo "Please check your configuration and ensure the EC2 instance is accessible."
    fi
}

# Function to show current SSH config
show_config() {
    echo "Current SSH configuration in container:"
    echo "====================================="
    docker exec wri_app cat /root/.ssh/config
}

# Function to show help
show_help() {
    echo "EC2 SSH Setup Script for WRI WPSI Docker Container"
    echo "============================================"
    echo ""
    echo "Usage: $0 [COMMAND] [ARGUMENTS]"
    echo ""
    echo "Commands:"
    echo "  setup                    - Initial setup (creates SSH config file)"
    echo "  copy-key KEY_FILE        - Copy SSH key to container"
    echo "  add-instance NAME HOST USER KEY [PORT] - Add EC2 instance configuration"
    echo "  test INSTANCE_NAME      - Test connection to EC2 instance"
    echo "  show-config             - Show current SSH configuration"
    echo "  help                    - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup"
    echo "  $0 copy-key ~/.ssh/my-ec2-key.pem"
    echo "  $0 add-instance production ec2-123-45-67-89.compute-1.amazonaws.com ubuntu my-ec2-key.pem"
    echo "  $0 test production"
    echo "  $0 show-config"
}

# Check if container is running
check_container() {
    if ! docker ps | grep -q "wri_app"; then
        echo "Error: Container 'wri_app' is not running."
        echo "Please start the container first with: docker-compose up -d"
        exit 1
    fi
}

# Main script logic
case "${1:-help}" in
    "setup")
        check_container
        echo "Setting up EC2 SSH access..."
        docker exec wri_app bash -c "echo '# SSH Client Configuration for EC2 Instances' > /root/.ssh/config"
        docker exec wri_app chmod 600 /root/.ssh/config
        echo "EC2 SSH setup complete!"
        ;;
    "copy-key")
        check_container
        if [ -z "$2" ]; then
            echo "Error: Please provide the path to your SSH key file."
            echo "Usage: $0 copy-key /path/to/key.pem"
            exit 1
        fi
        copy_ssh_key "$2"
        ;;
    "add-instance")
        check_container
        if [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ] || [ -z "$5" ]; then
            echo "Error: Please provide all required arguments."
            echo "Usage: $0 add-instance NAME HOST USER KEY [PORT]"
            exit 1
        fi
        add_ec2_instance "$2" "$3" "$4" "$5" "$6"
        ;;
    "test")
        check_container
        if [ -z "$2" ]; then
            echo "Error: Please provide the instance name to test."
            echo "Usage: $0 test INSTANCE_NAME"
            exit 1
        fi
        test_ec2_connection "$2"
        ;;
    "show-config")
        check_container
        show_config
        ;;
    "help"|*)
        show_help
        ;;
esac
