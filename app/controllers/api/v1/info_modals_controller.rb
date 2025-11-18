class Api::V1::InfoModalsController < Api::BaseController
  def index
    info_modals = InfoModal.all.map do |info_modal|
      {
        id: info_modal.info_modal_id,
        title: info_modal.title,
        content: info_modal.content
      }
    end

    render json: info_modals
  end
end
