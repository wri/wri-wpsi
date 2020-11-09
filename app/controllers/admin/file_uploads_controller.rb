class Admin::FileUploadsController < Admin::BaseController
  before_action :set_file_upload, only: %i[destroy]

  def index
    @file_uploads = FileUpload.all
  end

  def new
    @file_upload = FileUpload.new
  end

  def create
    @file_upload = FileUpload.new(file_upload_params)

    if @file_upload.save
      redirect_to admin_file_uploads_url, notice: 'File Upload was successfully created.'
    else
      render :new
    end
  end

  def destroy
    if @file_upload.destroy
      redirect_to admin_file_uploads_url, notice: 'File Upload was successfully deleted.'
    else
      redirect_to admin_file_uploads_url, notice: 'File Upload could not be deleted.'
    end
  end

  private

  def set_file_upload
    @file_upload = FileUpload.find(params[:id])
  end

  def file_upload_params
    params.require(:file_upload).permit(
      :description,
    ).to_h
  end
end
