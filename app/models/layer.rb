class Layer < ApplicationRecord
  belongs_to :category,
             primary_key: 'slug',
             foreign_key: 'category_slug',
             inverse_of: 'layers'

  validates :layer_id, :dataset_id, :category, :name, presence: true

  def self.published
    where(published: true)
  end

  def self.serialized_for_react_app
    published.map do |layer|
      {
        id: layer.layer_id,
        dataset: layer.dataset_id,
        category: layer.category.title,
        name: layer.name,
        description: layer.description,
        initially_on: layer.primary?,
      }
    end
  end
end
