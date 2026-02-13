#!/bin/bash

# Check Production Server Resources
# This script helps diagnose deployment issues by checking server resources

echo "==========================================="
echo "Production Server Resource Check"
echo "==========================================="
echo ""
echo "This will check disk space, memory, and npm/node versions on production."
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

echo ""
echo "Connecting to production server..."

ssh wri-prod << 'ENDSSH'
echo ""
echo "📊 Disk Space:"
echo "=============="
df -h | grep -E '(Filesystem|/$|/var|/tmp)'

echo ""
echo "💾 Memory Usage:"
echo "================"
free -h

echo ""
echo "🔧 Node.js & NPM Versions:"
echo "=========================="
echo "Node: $(node -v 2>/dev/null || echo 'Not found in PATH')"
echo "NPM: $(npm -v 2>/dev/null || echo 'Not found in PATH')"

echo ""
echo "📦 Checking /tmp directory:"
echo "============================"
ls -lh /tmp | grep react-build | tail -5 || echo "No react-build directories found"

echo ""
echo "🔍 Active npm processes:"
echo "========================"
ps aux | grep npm | grep -v grep || echo "No npm processes running"

echo ""
echo "🚀 RVM Ruby:"
echo "============"
/usr/share/rvm/bin/rvm current 2>/dev/null || echo "RVM not accessible"

echo ""
echo "📁 RVM Log Directory Permissions:"
echo "=================================="
ls -ld /usr/share/rvm/log 2>/dev/null || echo "RVM log directory doesn't exist"

echo ""
echo "✅ Resource check complete!"
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅ Successfully checked server resources"
    echo "======================================"
else
    echo ""
    echo "❌ Failed to check resources. Please verify your SSH connection."
    exit 1
fi


