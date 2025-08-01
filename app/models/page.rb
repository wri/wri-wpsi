class Page < ApplicationRecord
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  has_and_belongs_to_many :team_members, join_table: :page_team_members

  scope :top_level, -> { where(menu: '').ordered }

  SLUG_REDIRECTS = {
    'map' => :map,
    'map-anomalies' => 'map-anomalies',
    'news-and-publications' => :news,
    'news-archive' => :archive,
    'our-team' => :our_team,
    'events' => :events
  }.freeze

  # Array of slugs that should be passed without /info/ prefix
  SLUGS_WITHOUT_PREFIX = [
    'our-team',
    'causal',
    'causal/*',
  ].freeze

  def self.news
    Page.find_by(slug: 'news-and-publications')
  end

  def self.map
    Page.find_by(slug: 'map')
  end

  def self.map_anomalies
    Page.find_by(slug: 'map-anomalies')
  end

  def self.archive
    Page.find_by(slug: 'news-archive')
  end

  def self.our_team
    Page.find_by(slug: 'our-team')
  end

  def self.events
    Page.find_by(slug: 'events')
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
    redirect_target.present? || children.any? || location.present?
  end

  # Get the proper URL path for this page
  def url_path
    if SLUGS_WITHOUT_PREFIX.include?(slug)
      "#{slug}"
    elsif SLUG_REDIRECTS[slug]
      "#{SLUG_REDIRECTS[slug]}"
    elsif !parent.present?
      "#{slug}"
    else
      "info/#{slug}"
    end
  end

  def self.options_for_menu_select
    [
      ['- Do not include in any menu -', 'none'],
      ['- Include as a top-level menu item -', ''],
    ] + top_level.pluck(:name, :slug)
  end
end
