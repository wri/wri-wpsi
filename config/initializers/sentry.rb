Sentry.init do | config |
  config.dsn = ENV["SENTRY_DSN"]
  config.environment = Rails.env
end
