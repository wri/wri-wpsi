class Layer < ApplicationRecord
  def self.published
    where(published: true)
  end

  def self.serialized_for_react_app
    published.map do |layer|
      {
        id: layer.layer_id,
        dataset: layer.dataset_id,
        category: layer.category,
        name: layer.name,
        description: layer.description,
        initially_on: layer.primary?,
      }
    end
  end
end
