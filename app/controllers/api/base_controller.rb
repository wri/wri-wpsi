class Api::BaseController < ActionController::API
  include ActionController::MimeResponds

  # API-specific configuration can go here
  # This controller inherits from ActionController::API instead of ApplicationController
  # to avoid unnecessary middleware and provide a cleaner API experience
end
