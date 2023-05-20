# Host wri-staging-server
#   HostName ec2-3-137-167-78.us-east-2.compute.amazonaws.com
#   User ubuntu
#   IdentityFile ~/.ssh/wri-wpsi-staging-key-pair.pem
#   IdentitiesOnly yes
server 'wri-staging', roles: %w[app db web]

set :branch, `git rev-parse --abbrev-ref HEAD`.chomp

set :default_env, { PATH: '$HOME/.nvm/versions/node/v16.20.0/bin/:$PATH' }

set :rvm_custom_path, '/home/ubuntu/.rvm'

append :linked_dirs, 'storage'

append :linked_files, '.env.staging'

set :keep_releases, 5

after "deploy:restart", "deploy:cleanup"