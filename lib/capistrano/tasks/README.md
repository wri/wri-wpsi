# Capistrano Tasks Organization

This directory contains all the custom Capistrano tasks organized by functionality.

## Task Files

### `deployment_tags.rake`
- **Purpose**: Handles deployment tagging and version management
- **Tasks**:
  - `push_deploy_tag`: Tags the deployed revision with environment and timestamp
- **Hooks**: Runs after `deploy:log_revision`

### `puma.rake`
- **Purpose**: Manages Puma application server
- **Tasks**:
  - `restart_puma`: Restarts Puma to pick up latest code changes
- **Hooks**: Runs after `deploy`

### `react_build.rake`
- **Purpose**: Builds and deploys Next.js React application
- **Tasks**:
  - `react:build`: Builds Next.js application from external repository
  - `react:clean`: Cleans up Next.js build artifacts
  - `react:config`: Shows Next.js build configuration
- **Hooks**: Runs after `deploy:updated`

### `symlinks.rake`
- **Purpose**: Manages symbolic links for persistent data
- **Tasks**:
  - `symlinks:create_map_anomalies`: Creates map-anomalies symlink
  - `symlinks:verify_map_anomalies`: Verifies map-anomalies symlink
- **Hooks**: Runs after `deploy:updated`

### `anomalies.rake`
- **Purpose**: Handles anomaly data processing and management
- **Tasks**: (See file for specific tasks)

### `gr.rake`
- **Purpose**: Git revision management and deployment tracking
- **Tasks**:
  - `gr:last_revision`: Gets the last deployed revision
  - `gr:pending`: Shows pending changes since last deployment
  - `gr:diff`: Shows diff since last deployment
- **Hooks**: Runs before `deploy`

## Usage

All tasks are automatically loaded by Capistrano. You can run them individually:

```bash
# Build React application
bundle exec cap staging react:build

# Create symlinks
bundle exec cap staging symlinks:create_map_anomalies

# Verify symlinks
bundle exec cap staging symlinks:verify_map_anomalies

# Restart Puma
bundle exec cap staging puma:restart_puma

# Tag deployment
bundle exec cap staging push_deploy_tag
```

## Adding New Tasks

When adding new tasks:
1. Create a new `.rake` file with a descriptive name
2. Use appropriate namespaces for related tasks
3. Add proper hooks to integrate with the deployment process
4. Update this README with the new task information 