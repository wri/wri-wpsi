class Page < ApplicationRecord
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  scope :top_level, -> { where(menu: '') }

  def self.ordered
    order(:sort_priority, :id)
  end

  def children
    Page.where(menu: name).order(:sort_priority)
  end

  def parent
    Page.where(name: menu).first
  end

  def self.serialized_for_react_app
    ordered.map do |page|
      {
        name: page.name,
        slug: page.slug,
        menu: page.menu,
        content: page.content,
      }
    end
  end
end
