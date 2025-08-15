# config valid for current version and patch releases of Capistrano
lock '~> 3.16.0'

set :application, 'wri-wpsi'
set :repo_url, 'git@github.com:wri/wri-wpsi.git'

set :rvm_ruby_version, '2.6.6'

set :puma_init_active_record, true

set :nginx_ssl_certificate, '/etc/ssl/certs/waterpeacesecurity_org.crt'
set :nginx_ssl_certificate_key, '/etc/ssl/private/waterpeacesecurity_org.key'
set :nginx_use_ssl, true
# Default value for :linked_files is []

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system', 'public/map-reservoir-surface-anomalies/anomalies'

# React build configuration
set :react_repo_url, 'git@github.com:wri/wri-wpsi-2.git'
set :react_branch, 'main'
set :react_build_dir, 'dist'
set :react_public_dir, 'public/map-reservoir-surface-anomalies'

# Default value for keep_releases is 5
set :keep_releases, 5

# require_relative '../lib/capistrano/slack'
# set :slackistrano,
#     klass: Slackistrano::CustomMessaging,
#     channel: '#gr-wri-notices',
#     username: 'Capistrano',
#     icon_emoji: ':ship:',
#     webhook: ENV['WRI_SLACK_WEBHOOK']

# Build Next.js application after deployment
after 'deploy:updated', 'react:build'

after 'deploy', :restart_puma
