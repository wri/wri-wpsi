class Layer < ApplicationRecord
  has_many :category_layers, dependent: :delete_all
  has_many :categories, through: :category_layers

  validates :layer_id, :dataset_id, :name, presence: true

  def categories_string
    categories.join ', '
  end

  def self.published
    where(published: true)
  end

  def self.serialized_for_react_app
    published.map do |layer|
      {
        id: layer.layer_id,
        category_slugs: layer.categories.map(&:slug),
        name: layer.name,
        short_description: layer.short_description,
        long_description: layer.long_description,
        initially_on: layer.primary?,
      }
    end
  end
end
