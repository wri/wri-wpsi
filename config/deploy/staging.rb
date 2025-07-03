# Host wri-staging-server
#   HostName ec2-3-137-167-78.us-east-2.compute.amazonaws.com
#   User ubuntu
#   IdentityFile ~/.ssh/wri-wpsi-staging-key-pair.pem
#   IdentitiesOnly yes
server 'wri-staging', roles: %w[app db web]

set :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Set Node.js environment - use the specific version we know exists
set :default_env, { 
  PATH: '/home/ubuntu/.nvm/versions/node/v16.15.0/bin:$PATH',
  NODE_ENV: 'production'
}

set :rvm_custom_path, '/home/ubuntu/.rvm'

append :linked_dirs, 'storage'

append :linked_files, '.env.staging'

# It is read from /var/www/wri-wpsi/shared/.env.react
# append :linked_files, '.env.react'

set :keep_releases, 2

after "deploy:restart", "deploy:cleanup"