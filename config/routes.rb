Rails.application.routes.draw do # rubocop:disable Metrics/BlockLength
  # Public routes
  root 'root#index'

  ## User defined pages
  get '/info/:page_slug', to: 'root#show', as: 'page', param: :slug

  ## Single page app endpoint
  get '/map', to: 'root#map'
  get '/map/*ignored', to: 'root#map'

  get '/news', to: 'root#news'
  get '/archive', to: 'root#archive'

  get '/causal', to: 'root#causal'
  get "/causal/*ignored", to: "root#causal"

  ## Static route to file uploads
  resources :files, only: %i[show]

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
    resources :pages, param: :slug
    resources :users, only: %i[index new create destroy]
    resources :news_items
    resources :file_uploads, only: %i[index new create destroy]
    get '/style_guides/article', to: 'style_guides#article'
  end

  # API endpoint
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index]
      resources :layers, only: [:index]
      resources :pages, only: [:index]

      get 'widget_datapoints/:gid_1/:field_name',
          to: 'widget_datapoints#index',
          as: 'widget_datapoints',
          format: false,
          defaults: { format: 'json' },
          constraints: { gid_1: %r{[^/]+}, field_name: %r{[^/]+} }

      get 'widget_datapoints/:gid_1/:field_name/csv',
          to: 'widget_datapoints#index',
          as: 'widget_datapoints_csv',
          format: false,
          defaults: { format: 'csv' },
          constraints: { gid_1: %r{[^/]+}, field_name: %r{[^/]+} }
    end
  end

  # Default AWS ELB health check path
  get 'health-check', to: 'root#health_check'
  # A check to force an exception notification
  get 'notifier-check', to: 'root#notifier_check'
  # A check to force a timeout. WARNING: burns CPU!
  get 'timeout-check', to: 'root#timeout_check'
end
