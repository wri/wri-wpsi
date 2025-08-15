require "tzinfo"

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
