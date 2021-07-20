# config valid for current version and patch releases of Capistrano
lock '~> 3.16.0'

set :application, 'wri-wpsi'
set :repo_url, 'git@github.com:greenriver/wri-wpsi.git'

set :rvm_custom_path, '/usr/share/rvm'
set :rvm_ruby_version, '2.6.6'

set :puma_init_active_record, true

set :nginx_ssl_certificate, '/etc/ssl/certs/waterpeacesecurity_org.crt'
set :nginx_ssl_certificate_key, '/etc/ssl/private/waterpeacesecurity_org.key'
set :nginx_use_ssl, true
# Default value for :linked_files is []
append :linked_files, '.env.production'

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system'

# Default value for keep_releases is 5
set :keep_releases, 5

require_relative '../lib/capistrano/slack'
set :slackistrano,
    klass: Slackistrano::CustomMessaging,
    channel: '#gr-wri-notices',
    username: 'Capistrano',
    icon_emoji: ':ship:',
    webhook: 'https://hooks.slack.com/services/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'

def time_in_vermont
  tz = TZInfo::Timezone.get('US/Eastern')
  Time.now.getlocal(tz.current_period.offset.utc_total_offset)
end

desc 'Tag the deployed revision'
task :push_deploy_tag do
  on roles(:util) do
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

before 'deploy', 'gr:last_revision'
after 'deploy:log_revision', :push_deploy_tag
