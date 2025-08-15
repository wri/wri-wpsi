desc 'Restart puma to pick up latest code changes'
task :restart_puma do
  ruby_version = File.read(".ruby-version").chomp.split("-").last

  on roles(:app) do
    execute "bash -l -c 'cd #{fetch(:release_path)} && PATH=/home/ubuntu/.nvm/versions/node/v16.15.0/bin:$PATH rvm #{ruby_version} do bundle exec pumactl -S #{fetch(:deploy_to)}/shared/tmp/pids/puma.state -F #{fetch(:deploy_to)}/shared/puma.rb restart'"
  end
end

desc 'Restart puma to pick up latest code changes in production'
task :restart_puma_prod do
  ruby_version = File.read(".ruby-version").chomp.split("-").last

  on roles(:app) do
    execute "bash -l -c 'cd #{fetch(:release_path)} && rvm #{ruby_version} do bundle exec pumactl -S #{fetch(:deploy_to)}/shared/tmp/pids/puma.state -F #{fetch(:deploy_to)}/shared/puma.rb restart'"
  end
end