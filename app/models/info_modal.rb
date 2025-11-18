class InfoModal < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :info_modal_id, presence: true, uniqueness: true

  def to_param
    info_modal_id
  end
end
