namespace :gr do
  task :last_revision do
    revisions = Set.new
    on roles(:all) do |_host|
      log_line = capture(:tail, '-n 1', "#{deploy_path}/revisions.log").to_s
      revision = begin
                   /at ([0-9a-f]+)/.match(log_line.to_s)[1]
                 rescue StandardError
                   nil
                 end
      revisions << revision
    end
    warn 'FIXME: not all host have the same revision' if revisions.size > 1
    puts revisions.first
    set :gr_last_revision, revisions.first
  end

  task pending: :last_revision do
    run_locally do
      puts capture(:git, :shortlog, "#{fetch(:gr_last_revision)}..#{fetch(:branch, 'HEAD')}")
    end
  end

  task diff: :last_revision do
    run_locally do
      puts capture(:git, :diff, "#{fetch(:gr_last_revision)}..#{fetch(:branch, 'HEAD')}")
    end
  end
end
