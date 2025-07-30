namespace :anomalies do
  desc 'Upload JSON files to the map-anomalies/anomalies directory'
  task :upload do
    on roles(:app) do
      within release_path do
        anomalies_dir = "#{fetch(:deploy_to)}/shared/public/map-anomalies/anomalies"
        
        # Create map-anomalies/anomalies directory if it doesn't exist
        execute :mkdir, '-p', anomalies_dir
        
        puts "📁 Map-anomalies/anomalies directory: #{anomalies_dir}"
        puts "📋 Current anomalies files:"
        execute :ls, '-la', anomalies_dir
      end
    end
  end
  
  desc 'Upload local JSON files to the server'
  task :upload_files do
    on roles(:app) do
      within release_path do
        anomalies_dir = "#{fetch(:deploy_to)}/shared/public/map-anomalies/anomalies"
        
        # Create map-anomalies/anomalies directory if it doesn't exist
        execute :mkdir, '-p', anomalies_dir
        
        puts "📁 Uploading files to: #{anomalies_dir}"
        
        # Upload files from local public/map-anomalies/anomalies directory
        if Dir.exist?('public/map-anomalies/anomalies')
          puts "📤 Uploading files from local public/map-anomalies/anomalies..."
          upload! 'public/map-anomalies/anomalies/', anomalies_dir, recursive: true
          puts "✅ Files uploaded successfully"
        else
          puts "❌ Local directory public/map-anomalies/anomalies does not exist"
          puts "💡 Create the directory and add your JSON files, then run this task again"
        end
      end
    end
  end
  
  desc 'Upload a specific JSON file to the server'
  task :upload_file, [:file_path] do |task, args|
    on roles(:app) do
      within release_path do
        anomalies_dir = "#{fetch(:deploy_to)}/shared/public/map-anomalies/anomalies"
        
        # Create map-anomalies/anomalies directory if it doesn't exist
        execute :mkdir, '-p', anomalies_dir
        
        file_path = args[:file_path]
        if file_path && File.exist?(file_path)
          puts "📤 Uploading file: #{file_path}"
          upload! file_path, "#{anomalies_dir}/#{File.basename(file_path)}"
          puts "✅ File uploaded successfully"
        else
          puts "❌ File not found: #{file_path}"
          puts "💡 Usage: cap production anomalies:upload_file[path/to/your/file.geojson]"
        end
      end
    end
  end
  
  desc 'Sync local anomalies directory with server'
  task :sync do
    on roles(:app) do
      within release_path do
        anomalies_dir = "#{fetch(:deploy_to)}/shared/public/map-anomalies/anomalies"
        
        # Create map-anomalies/anomalies directory if it doesn't exist
        execute :mkdir, '-p', anomalies_dir
        
        puts "🔄 Syncing local anomalies directory with server..."
        
        # Upload files from local public/map-anomalies/anomalies directory
        if Dir.exist?('public/map-anomalies/anomalies')
          puts "📤 Uploading files from local public/map-anomalies/anomalies..."
          upload! 'public/map-anomalies/anomalies/', anomalies_dir, recursive: true
          puts "✅ Directory synced successfully"
        else
          puts "❌ Local directory public/map-anomalies/anomalies does not exist"
          puts "💡 Create the directory and add your JSON files, then run this task again"
        end
      end
    end
  end
  
  desc 'Sync custom local directory with server anomalies'
  task :sync_from, [:source_dir] do |task, args|
    on roles(:app) do
      within release_path do
        anomalies_dir = "#{fetch(:deploy_to)}/shared/public/map-anomalies/anomalies"
        source_dir = args[:source_dir]
        
        if source_dir && Dir.exist?(source_dir)
          # Create map-anomalies/anomalies directory if it doesn't exist
          execute :mkdir, '-p', anomalies_dir
          
          puts "🔄 Syncing from #{source_dir} to server..."
          puts "📤 Uploading files from #{source_dir}..."
          upload! "#{source_dir}/", anomalies_dir, recursive: true
          puts "✅ Directory synced successfully"
        else
          puts "❌ Source directory not found: #{source_dir}"
          puts "💡 Usage: cap production anomalies:sync_from[/path/to/your/anomalies/folder]"
        end
      end
    end
  end
  
  desc 'List all JSON files in the map-anomalies/anomalies directory'
  task :list do
    on roles(:app) do
      within release_path do
        anomalies_dir = "#{fetch(:deploy_to)}/shared/public/map-anomalies/anomalies"
        
        if test("[ -d \"#{anomalies_dir}\" ]")
          puts "📋 JSON files in map-anomalies/anomalies directory:"
          execute :find, anomalies_dir, '-name', '*.json', '-o', '-name', '*.geojson', '-type', 'f', '-exec', 'ls', '-lh', '{}', ';'
        else
          puts "❌ Map-anomalies/anomalies directory does not exist: #{anomalies_dir}"
        end
      end
    end
  end
  
  desc 'Create map-anomalies/anomalies directory structure'
  task :setup do
    on roles(:app) do
      within release_path do
        anomalies_dir = "#{fetch(:deploy_to)}/shared/public/map-anomalies/anomalies"
        
        puts "📁 Creating map-anomalies/anomalies directory: #{anomalies_dir}"
        execute :mkdir, '-p', anomalies_dir
        execute :chmod, '755', anomalies_dir
        
        puts "✅ Map-anomalies/anomalies directory created successfully"
      end
    end
  end
end 