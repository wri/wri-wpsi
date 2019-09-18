Rails.application.routes.draw do
  root 'root#index'

  # API endpoint
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index]
      resources :layers, only: [:index]

      get 'widget_datapoints/:gid_2/:field_name',
        to: 'widget_datapoints#index',
        as: 'widget_datapoints',
        format: false,
        defaults: { format: 'json' },
        constraints: { gid_2: %r{[^\/]+}, field_name: %r{[^\/]+} }
    end
  end

  # Single page app endpoint
  get '/map', to: 'root#map'
  get '/about', to: 'root#map'
  get '/methodology', to: 'root#map'
  get '/map/*ignored', to: 'root#map'

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

  # Default AWS ELB health check path
  get 'health-check', to: 'root#health_check'
  # A check to force an exception notification
  get 'notifier-check', to: 'root#notifier_check'
  # A check to force a timeout. WARNING: burns CPU!
  get 'timeout-check', to: 'root#timeout_check'
end
