class Page < ApplicationRecord
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  scope :top_level, -> { where(menu: '').ordered }

  SLUG_REDIRECTS = {
    'map' => :map,
    'news-and-publications' => :news,
    'news-archive' => :archive,
  }.freeze

  def self.news
    Page.find_by(slug: 'news-and-publications')
  end

  def self.map
    Page.find_by(slug: 'map')
  end

  def self.archive
    Page.find_by(slug: 'news-archive')
  end

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

  def redirect_target
    SLUG_REDIRECTS[slug]
  end

  def contentless?
    return unless persisted?

    # Pages with children are contentless menu items
    redirect_target.present? || children.any?
  end

  def self.options_for_menu_select
    [
      ['- Do not include in any menu -', 'none'],
      ['- Include as a top-level menu item -', ''],
    ] + top_level.pluck(:name, :slug)
  end
end
