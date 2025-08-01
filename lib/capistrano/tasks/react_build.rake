namespace :react do
  desc 'Build Next.js application from external repository'
  task :build do
    on roles(:app) do
      within release_path do
        # Configuration variables - customize these for your React repo
        react_repo_url = fetch(:react_repo_url)
        react_branch = fetch(:react_branch)
        react_build_dir = fetch(:react_build_dir)
        react_public_dir = fetch(:react_public_dir)
        
        # Create temporary directory for React build
        timestamp = fetch(:release_timestamp) || Time.now.utc.strftime('%Y%m%d%H%M%S')
        temp_dir = "/tmp/react-build-#{timestamp}"
        
        begin
          puts "🔄 Cloning Next.js repository: #{react_repo_url} (branch: #{react_branch})"
          puts "📁 Using temporary directory: #{temp_dir}"
          
          # Clone the Next.js repository
          execute :git, 'clone', '-b', react_branch, react_repo_url, temp_dir

          # Copy .env.map2 from local to temp_dir and rename to .env
          puts "📄 Copying .env.map2 from local to server..."
          upload! '.env.map2', "#{temp_dir}/.env"
          puts "✅ .env file created from local .env.map2"
          
          # Verify the directory was created
          unless test("[ -d \"#{temp_dir}\" ]")
            error "❌ Failed to create temporary directory: #{temp_dir}"
            exit 1
          end
          
          puts "✅ Repository cloned successfully to #{temp_dir}"
          
          # Navigate to React project directory
          puts "📂 Checking repository contents..."
          execute :ls, '-la', temp_dir
          
          puts "📦 Checking for package.json..."
          if test("[ -f #{temp_dir}/package.json ]")
            puts "📦 Installing dependencies..."

            # Source NVM and use Node.js version from .nvmrc
            execute "cd #{temp_dir} && source ~/.nvm/nvm.sh && nvm use"
            execute "cd #{temp_dir} && source ~/.nvm/nvm.sh && node -v"
            execute "cd #{temp_dir} && source ~/.nvm/nvm.sh && npm install --force"
            puts "🔨 Building Next.js application with npm..."
            execute "cd #{temp_dir} && source ~/.nvm/nvm.sh && npm run build"
            
            # Ensure build directory exists
            if test("[ -d #{temp_dir}/#{react_build_dir} ]")
              puts "📁 Build completed successfully"
              
              # Create backup of existing public directory (excluding Rails assets)
              backup_dir = "#{react_public_dir}_backup_#{timestamp}"
              if test("[ -d \"#{react_public_dir}\" ]")
                execute :mkdir, '-p', backup_dir
                # Copy Rails-specific files to backup
                execute :cp, '-r', "#{react_public_dir}/assets", backup_dir, '2>/dev/null', '||', 'true'
                execute :cp, '-r', "#{react_public_dir}/packs", backup_dir, '2>/dev/null', '||', 'true'
                execute :cp, '-r', "#{react_public_dir}/.well-known", backup_dir, '2>/dev/null', '||', 'true'
                execute :cp, "#{react_public_dir}/favicon.ico", backup_dir, '2>/dev/null', '||', 'true'
                execute :cp, "#{react_public_dir}/robots.txt", backup_dir, '2>/dev/null', '||', 'true'
                execute :cp, "#{react_public_dir}/404.html", backup_dir, '2>/dev/null', '||', 'true'
                execute :cp, "#{react_public_dir}/422.html", backup_dir, '2>/dev/null', '||', 'true'
                execute :cp, "#{react_public_dir}/500.html", backup_dir, '2>/dev/null', '||', 'true'
              end
              
              # Create public directory if it doesn't exist
              execute :mkdir, '-p', react_public_dir
              
              # Clear public directory but preserve the map-anomalies symlink
              puts "🗑️  Clearing public directory while preserving map-anomalies symlink..."
              # Remove everything except the map-anomalies directory
              execute :find, react_public_dir, '-mindepth', '1', '-not', '-path', "#{react_public_dir}/map-anomalies*", '-delete'
              
              # Copy React build artifacts to public directory
              execute :cp, '-r', "#{temp_dir}/#{react_build_dir}/*", react_public_dir
              
              # Restore Rails assets from backup (map-anomalies symlink is preserved)
              if test("[ -d \"#{backup_dir}\" ]")
                execute :cp, '-r', "#{backup_dir}/*", react_public_dir
                execute :rm, '-rf', backup_dir
              end
              
              # Ensure proper permissions
              execute :chmod, '-R', '755', react_public_dir
              
              # Verify map-anomalies symlink is still intact
              map_anomalies_path = "#{react_public_dir}/anomalies"
              if test("[ -L \"#{map_anomalies_path}\" ]")
                puts "✅ Map-anomalies symlink preserved after build"
                execute :ls, '-la', map_anomalies_path
              else
                puts "⚠️  Map-anomalies symlink may have been affected, attempting to recreate..."
                # Try to recreate the symlink if it was broken
                shared_anomalies_path = "#{shared_path}/public/map-anomalies/anomalies"
                execute :rm, '-rf', map_anomalies_path, '2>/dev/null', '||', 'true'
                execute :ln, '-sf', shared_anomalies_path, map_anomalies_path
                puts "✅ Map-anomalies symlink recreated"
              end
              
              puts "✅ Next.js application built and deployed to #{react_public_dir}"
            else
              error "❌ Build directory '#{react_build_dir}' not found after build in #{temp_dir}"
              exit 1
            end
          else
            error "❌ package.json not found in Next.js repository at #{temp_dir}"
            exit 1
          end
        rescue => e
          error "❌ Failed to build Next.js application: #{e.message}"
          error "Debug info: temp_dir=#{temp_dir}, release_path=#{release_path}"
          exit 1
        ensure
          # Clean up temporary directory
          execute :rm, '-rf', temp_dir
        end
      end
    end
  end
  
  desc 'Clean up Next.js build artifacts'
  task :clean do
    on roles(:app) do
      within release_path do
        react_public_dir = fetch(:react_public_dir, 'public')
        
        # Remove React build artifacts (be careful not to remove Rails assets)
        if test("[ -d \"#{react_public_dir}\" ]")
          puts "🧹 Cleaning up Next.js build artifacts..."
          
          # Remove only React-specific files, preserve Rails assets and map-anomalies
          execute :find, react_public_dir, '-name', '*.js', '-not', '-path', '*/assets/*', '-not', '-path', '*/packs/*', '-not', '-path', '*/map-anomalies/*', '-delete'
          execute :find, react_public_dir, '-name', '*.css', '-not', '-path', '*/assets/*', '-not', '-path', '*/packs/*', '-not', '-path', '*/map-anomalies/*', '-delete'
          execute :find, react_public_dir, '-name', '*.html', '-not', '-name', '404.html', '-not', '-name', '422.html', '-not', '-name', '500.html', '-delete'
          execute :find, react_public_dir, '-name', 'static', '-type', 'd', '-not', '-path', '*/map-anomalies/*', '-exec', 'rm', '-rf', '{}', '+'
          
          puts "✅ Next.js build artifacts cleaned up"
        end
      end
    end
  end
  
  desc 'Show Next.js build configuration'
  task :config do
    puts "Next.js Build Configuration:"
    puts "  Repository: #{fetch(:react_repo_url)}"
    puts "  Branch: #{fetch(:react_branch)}"
    puts "  Build Directory: #{fetch(:react_build_dir)}"
    puts "  Public Directory: #{fetch(:react_public_dir)}"
  end
end 