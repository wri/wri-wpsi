Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://waterpeacesecurity.org', 'https://www.waterpeacesecurity.org', 'https://wpstaging.carloshdelreal.com'  # You can restrict this to specific domains in production

    resource '/api/*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: false
  end
end 