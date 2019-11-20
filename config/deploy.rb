# config valid for current version and patch releases of Capistrano
lock '~> 3.11.2'

set :application, 'wri-wpsi'
set :repo_url, 'git@github.com:greenriver/wri-wpsi.git'

set :rvm_custom_path, '/usr/share/rvm'
set :rvm_ruby_version, '2.6.5'

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
