Rails.application.routes.draw do
  root 'root#index'

  # Admin routes
  get '/admin', to: redirect('/admin/layers')

  devise_for(
    :users,
    controllers: {
      sessions: 'admin/sessions',
      registrations: 'admin/registrations',
    },
    path: '/admin',
  )

  namespace :admin do
    resources :users, only: [:index, :new, :create, :destroy]
    resources :layers
    resources :categories
  end

  # Single page app endpoint
  get '/map', to: 'root#map'

  # Forward all requests to root#map but requests
  # must be non-Ajax (!req.xhr?) and HTML Mime type (req.format.html?).
  # This does not include the root ("/") path.
  get '*page', to: 'root#map', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  # Default AWS ELB health check path
  get 'health-check', to: 'root#health_check'
  # A check to force an exception notification
  get 'notifier-check', to: 'root#notifier_check'
  # A check to force a timeout. WARNING: burns CPU!
  get 'timeout-check', to: 'root#timeout_check'
end
