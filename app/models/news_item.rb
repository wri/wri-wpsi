class NewsItem < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :article_url, url: { allow_blank: false }
  validates :image_url, url: { allow_blank: false }
  validates :image_alt_text, presence: true
  validates :date, presence: true

  scope :published, -> { where(published: true) }
  scope :current, -> { published.date_sort }
  scope :archived, -> { current }

  before_save do
    self.categories = categories.reject(&:empty?)
  end

  ALLOWED_CATEGORIES = %w[
    News
    Publication
    Blog
    Podcast
    Video
    Media
  ].freeze

  def self.date_sort
    order(date: :desc)
  end

  def self.with_category(*args)
    where('news_items.categories @> ARRAY[?]::varchar[]', args)
  end
end
