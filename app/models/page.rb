class Page < ApplicationRecord
  validates :name, :slug, presence: true

  def to_s
    name
  end

  def self.serialized_for_react_app
    all.map do |page|
      {
        name: page.name,
        slug: page.slug,
        content: page.content,
      }
    end
  end
end
