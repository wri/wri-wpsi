class Category < ApplicationRecord
  has_many :category_layers, dependent: :delete_all
  has_many :layers, through: :category_layers

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true

  def to_s
    title
  end

  def self.serialized_for_react_app
    all.map do |category|
      {
        title: category.title,
        slug: category.slug,
        description: category.description,
      }
    end
  end
end
