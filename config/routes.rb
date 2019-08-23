Rails.application.routes.draw do
  root 'root#index'

  devise_for :users

  # Single page app endpoint
  get '/map', to: 'root#map'
  get '/map/*ignored', to: 'root#map'

  # Admin routes
  get '/admin', to: redirect('/admin/layers')
  namespace :admin do
    resources :layers
    resources :categories
  end

  # default AWS ELB health check path
  get 'health-check', to: 'root#health_check'
  # a check to force an exception notification
  get 'notifier-check', to: 'root#notifier_check'
  # a check to force a timeout WARNING: burns CPU!
  get 'timeout-check', to: 'root#timeout_check'
end
