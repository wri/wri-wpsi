Rails.application.routes.draw do
  root 'root#index'

  # API endpoint
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index]
      resources :layers, only: [:index]
      resources :pages, only: [:index]

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
  get '/map/*ignored', to: 'root#map'
  get '/info/*ignored', to: 'root#map'

  get '/learn', to: 'root#learn'
  get '/dialogue', to: 'root#dialogue'
  get '/about-us', to: 'root#about_us'
  get '/contact', to: 'root#contact'

  # Admin routes
  get '/admin', to: redirect('/admin/layers'), as: 'admin'

  devise_for(
    :users,
    controllers: {
      sessions: 'admin/sessions',
      registrations: 'admin/registrations',
      passwords: 'admin/passwords',
    },
    path: '/admin',
  )

  namespace :admin do
    resources :categories
    resources :layers
    resources :pages
    resources :users, only: [:index, :new, :create, :destroy]
  end

  # Default AWS ELB health check path
  get 'health-check', to: 'root#health_check'
  # A check to force an exception notification
  get 'notifier-check', to: 'root#notifier_check'
  # A check to force a timeout. WARNING: burns CPU!
  get 'timeout-check', to: 'root#timeout_check'
end
