class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: %i[destroy]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to admin_users_url, notice: 'User was successfully created.'
    else
      render :new
    end
  end

  def destroy
    if @user.destroy
      redirect_to admin_users_url, notice: 'User was successfully deleted.'
    else
      redirect_to admin_users_url, notice: 'User could not be deleted.'
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
    ).to_h
  end
end
