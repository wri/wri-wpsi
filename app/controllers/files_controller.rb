class FilesController < ApplicationController
  def show
    load_file_upload

    response.headers['Content-Type'] = content_type_header
    response.headers['Content-Disposition'] = content_disposition_header

    @file_upload.file.download do |chunk|
      response.stream.write(chunk)
    end
  end

  private

  def load_file_upload
    @file_upload = FileUpload.find(params[:id])
  end

  def content_type_header
    @file_upload.file.content_type
  end

  def content_disposition_header
    "inline; #{@file_upload.file.filename.parameters}"
  end
end
