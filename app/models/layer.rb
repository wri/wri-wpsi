class Layer < ApplicationRecord
  MAIN_LAYER_ID = '107b72a6-6a52-4c8e-a261-d01706627322'.freeze

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
        initially_on: layer.layer_id == MAIN_LAYER_ID,
      }
    end
  end
end
