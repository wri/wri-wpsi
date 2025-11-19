# Deployment Troubleshooting Guide

## Current Issue: Next.js Build Failing During Production Deployment

### Problem Summary

The production deployment is failing during the `react:build` Capistrano task with the error:
```
ERROR ❌ Failed to build Next.js application: closed stream
```

This happens during `npm install --force` in the temporary build directory `/tmp/react-build-*`.

### Root Causes

1. **SSH Connection Timeout**: The `npm install` operation takes too long, causing the SSH connection to timeout and close
2. **Lack of SSH Keepalive**: No keepalive packets were being sent during long-running operations
3. **Possible Resource Constraints**: Server may be running low on memory or disk space during npm install

### Solutions Implemented

#### 1. SSH Keepalive Configuration (✅ DONE)

Added SSH options to `config/deploy.rb`:
```ruby
set :ssh_options, {
  keepalive: true,
  keepalive_interval: 60,  # Send keepalive every 60 seconds
  timeout: 600,            # Connection timeout: 10 minutes
  forward_agent: true,
  auth_methods: %w(publickey password)
}
```

This prevents the SSH connection from timing out during long operations like npm install.

#### 2. Helper Scripts Created

**`docker/check_prod_resources.sh`**: Check server resources before deploying
```bash
./docker/check_prod_resources.sh
```

**`docker/fix_rvm_permissions.sh`**: Fix RVM log permission warnings (optional)
```bash
./docker/fix_rvm_permissions.sh
```

### Next Steps

1. **Try Deployment Again**:
   ```bash
   cap production deploy
   ```
   The SSH keepalive settings should now prevent the connection timeout.

2. **If It Still Fails, Check Server Resources**:
   ```bash
   ./docker/check_prod_resources.sh
   ```
   Look for:
   - Low disk space (should have at least 2-3 GB free in `/tmp`)
   - Low memory (should have at least 1 GB available)
   - Existing stale build directories in `/tmp`

3. **Optional: Fix RVM Warnings** (non-critical):
   ```bash
   ./docker/fix_rvm_permissions.sh
   ```

### Alternative Solutions (if issue persists)

#### Option A: Increase npm timeout
Add to `lib/capistrano/tasks/react_build.rake` line 55:
```ruby
execute "cd #{temp_dir} && npm install --force --fetch-timeout=60000 --fetch-retries=3"
```

#### Option B: Use npm ci instead of npm install
Replace line 55 with:
```ruby
execute "cd #{temp_dir} && npm ci --force"
```
This is faster and more reliable for CI/CD environments.

#### Option C: Add swap space on server
If memory is the issue, SSH to prod and add swap:
```bash
ssh wri-prod
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### Option D: Clean up /tmp before deployment
Add to `react_build.rake` before line 22:
```ruby
# Clean up old build directories
execute :rm, '-rf', '/tmp/react-build-*', '2>/dev/null', '||', 'true'
```

### Monitoring Deployment

To monitor the deployment in real-time, SSH into the production server in a separate terminal:
```bash
ssh wri-prod
tail -f /var/log/nginx/access.log
# Or watch the build directory
watch -n 1 'ls -lh /tmp/react-build-*'
```

### Related Issues

- **RVM Permission Warnings**: Non-critical, but can be fixed with `./docker/fix_rvm_permissions.sh`
- **Connection Timeout**: Fixed with SSH keepalive settings
- **Memory/Disk Issues**: Check with `./docker/check_prod_resources.sh`

---

## Useful Commands

### Check deployment logs:
```bash
cat log/capistrano.log | grep -A 10 "ERROR"
```

### SSH to production:
```bash
ssh wri-prod
```

### Check running processes on production:
```bash
ssh wri-prod "ps aux | grep -E '(npm|node|ruby)'"
```

### Manual cleanup of failed builds:
```bash
ssh wri-prod "rm -rf /tmp/react-build-*"
```

### Check Capistrano releases:
```bash
ssh wri-prod "ls -lt /var/www/wri-wpsi/releases | head -10"
```

---

## Prevention

To prevent future deployment issues:

1. **Regularly clean /tmp**: Set up a cron job to clean old build directories
2. **Monitor server resources**: Use monitoring tools like Datadog, New Relic, or simple cron alerts
3. **Use npm ci**: Faster and more reliable for deployments
4. **Increase server RAM**: If budget allows, upgrade to at least 2GB RAM
5. **Consider CI/CD pipeline**: Build artifacts in CI and deploy pre-built assets


