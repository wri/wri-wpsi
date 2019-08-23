class Layer < ApplicationRecord
  has_many :category_layers, dependent: :delete_all
  has_many :categories, through: :category_layers

  validates :layer_id, :dataset_id, :name, presence: true
  validates :source_url, url: { allow_blank: true }

  def categories_string
    categories.join ', '
  end

  def self.published
    where(published: true)
  end

  def self.serialized_for_react_app # rubocop:disable Metrics/MethodLength
    published.map do |layer|
      {
        id: layer.layer_id,
        category_slugs: layer.categories.map(&:slug),
        name: layer.name,
        short_description: layer.short_description,
        long_description: layer.long_description,
        initially_on: layer.primary?,
        source_name: layer.source_name,
        source_url: layer.source_url,
        source_description: layer.source_description,
      }
    end
  end
end
