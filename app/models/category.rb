class Category < ApplicationRecord
  def self.serialized_for_react_app
    all.map do |category|
      {
        title: category.title,
        description: category.description,
      }
    end
  end
end
