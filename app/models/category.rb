class Category < ApplicationRecord
  has_many :layers,
           primary_key: 'slug',
           foreign_key: 'category_slug',
           dependent: :restrict_with_error,
           inverse_of: 'category'

  validates :title, :slug, presence: true

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
