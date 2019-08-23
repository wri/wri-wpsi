class CategoryLayer < ApplicationRecord
  belongs_to :category
  belongs_to :layer

  validates :category, :layer, presence: true

  self.table_name = 'categories_layers'
end
