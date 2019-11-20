class Page < ApplicationRecord
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  scope :top_level, -> { where(menu: '').ordered }

  def to_param
    slug
  end

  def self.ordered
    order(:sort_priority, :id)
  end

  def children
    Page.where(menu: slug).ordered
  end

  def parent
    Page.find_by(slug: menu)
  end

  def contentless?
    return unless persisted?

    # Pages with children are contentless menu items
    slug == 'map' || children.any?
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
