class NewsItem < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :article_url, url: { allow_blank: false }
  validates :image_url, url: { allow_blank: false }
  validates :image_alt_text, presence: true
  validates :date, presence: true

  scope :published, -> { where(published: true) }
  scope :current, -> { published.date_sort }
  scope :archived, -> { published.date_sort }

  before_save do
    self.categories = categories.reject(&:empty?)
  end

  CATEGORY_LABELS = {
    'News' => 'News',
    'Publication' => 'Publications',
    'Blog' => 'Blogs',
    'Podcast' => 'Podcasts',
    'Video' => 'Webinars and Videos',
    'Media' => 'Media Mentions',
    'Impact Story' => 'Impact Story',
  }.freeze

  ALLOWED_CATEGORIES = CATEGORY_LABELS.keys

  def self.allowed_categories
    CATEGORY_LABELS.keys
  end

  def self.category_labels
    CATEGORY_LABELS
  end

  def self.date_sort
    order(date: :desc, id: :desc)
  end

  def self.with_category(*args)
    where('news_items.categories @> ARRAY[?]::varchar[]', args)
  end

  def allowed_categories
    self.class.allowed_categories
  end

  def category_labels
    self.class.category_labels
  end
end
