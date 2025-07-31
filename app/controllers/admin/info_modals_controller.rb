class Admin::InfoModalsController < Admin::BaseController
  before_action :set_info_modal, only: %i[show edit update destroy]

  def index
    @info_modals = InfoModal.all
  end

  def show; end

  def new
    @info_modal = InfoModal.new
  end

  def edit; end

  def create
    @info_modal = InfoModal.new(info_modal_params)

    if @info_modal.save
      redirect_to [:admin, @info_modal], notice: 'Info modal was successfully created.'
    else
      render :new
    end
  end

  def update
    if @info_modal.update(info_modal_params)
      redirect_to [:admin, @info_modal], notice: 'Info modal was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @info_modal.destroy
    redirect_to admin_info_modals_url, notice: 'Info modal was successfully deleted.'
  end

  private

  def set_info_modal
    @info_modal = InfoModal.find_by!(info_modal_id: params[:id])
  end

  def info_modal_params
    params.require(:info_modal).permit(
      :title,
      :content,
      :info_modal_id,
    )
  end
end 