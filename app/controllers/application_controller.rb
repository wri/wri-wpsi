class ApplicationController < ActionController::Base
  unless Rails.env.test?
    http_basic_authenticate_with(
      name: ENV['HTTP_AUTH_NAME'] || 'test',
      password: ENV['HTTP_AUTH_PASSWORD'] || 'test',
    )
  end

  def after_sign_in_path_for(resource)
    stored_location_for(resource) || admin_path
  end

  def after_sign_out_path_for(_resource)
    new_user_session_path
  end
end
