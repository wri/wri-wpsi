class Admin::RegistrationsController < ::Devise::RegistrationsController
  layout 'admin'

  # Disable sign-ups by overwriting the new action
  def new
    redirect_to admin_users_path
  end

  # Disable sign-ups by overwriting the create action
  def create
    redirect_to admin_users_path
  end
end
