class Tag < ApplicationRecord
  scope :ordered_by_name, -> { order(name: :asc) }
end
