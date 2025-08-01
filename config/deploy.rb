require "tzinfo"

# Load environment variables from .env.react file
require 'dotenv'
Dotenv.load('.env.react') if File.exist?('.env.react')
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
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system', 'public/map-anomalies/anomalies'

# React build configuration
set :react_repo_url, 'git@github.com:wri/wri-wpsi-2.git'
set :react_branch, 'main'
set :react_build_dir, 'dist'
set :react_public_dir, 'public/map-anomalies'

# Default value for keep_releases is 5
set :keep_releases, 5

# require_relative '../lib/capistrano/slack'
# set :slackistrano,
#     klass: Slackistrano::CustomMessaging,
#     channel: '#gr-wri-notices',
#     username: 'Capistrano',
#     icon_emoji: ':ship:',
#     webhook: ENV['WRI_SLACK_WEBHOOK']

def time_in_vermont
  tz = TZInfo::Timezone.get('US/Eastern')
  Time.now.getlocal(tz.current_period.offset.utc_total_offset)
end

desc 'Tag the deployed revision'
task :push_deploy_tag do
  on roles(:app) do
    env = fetch(:rails_env)
    timestamp = fetch(:release_timestamp) || Time.now.utc.strftime('%Y%m%d%H%M')

    run_locally do
      user = capture('git config --get user.name').chomp
      message = "Deployed by #{user} at #{time_in_vermont.strftime('%H:%M')} Vermont time"
      execute "git tag #{env}-#{timestamp} #{fetch(:current_revision)} -m '#{message}'"
      execute 'git push --tags origin'
    end
  end
end

# Build Next.js application after deployment
after 'deploy:updated', 'react:build'

append :linked_dirs, 'public/map-anomalies/anomalies'

desc 'Restart puma to pick up latest code changes'
task :restart_puma do
  ruby_version = File.read(".ruby-version").chomp.split("-").last

  on roles(:app) do
    execute "bash -l -c 'cd #{fetch(:release_path)} && PATH=/home/ubuntu/.nvm/versions/node/v16.15.0/bin:$PATH rvm #{ruby_version} do bundle exec pumactl -S #{fetch(:deploy_to)}/shared/tmp/pids/puma.state -F #{fetch(:deploy_to)}/shared/puma.rb restart'"
  end
end

after 'deploy', :restart_puma
