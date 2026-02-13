#!/bin/bash

# Fix RVM Permissions Script for Production Server
# This script fixes the RVM log directory permission issues that appear during deployments

echo "====================================="
echo "RVM Permission Fix for Production"
echo "====================================="
echo ""
echo "This script will:"
echo "  1. Create the RVM log directory if missing"
echo "  2. Set proper permissions (775)"
echo "  3. Set proper ownership"
echo ""
echo "You will need to enter your SSH key passphrase when prompted."
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

echo ""
echo "Connecting to production server..."

ssh wri-prod << 'ENDSSH'
echo ""
echo "Creating RVM log directory..."
sudo mkdir -p /usr/share/rvm/log

echo "Setting permissions..."
sudo chmod 775 /usr/share/rvm/log

echo "Setting ownership..."
sudo chown -R root:rvm /usr/share/rvm/log 2>/dev/null || sudo chown -R root:staff /usr/share/rvm/log

echo ""
echo "✅ RVM permissions fixed!"
echo ""
echo "Verifying..."
ls -la /usr/share/rvm/ | grep log

echo ""
echo "Done! The RVM permission errors should no longer appear in deployments."
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully fixed RVM permissions on production server!"
else
    echo ""
    echo "❌ Failed to connect or fix permissions. Please check your SSH connection."
    exit 1
fi


