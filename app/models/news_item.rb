class NewsItem < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :article_url, url: { allow_blank: false }
  validates :image_url, url: { allow_blank: false }
  validates :image_alt_text, presence: true
  validates :date, presence: true

  scope :published, -> { where(published: true) }

  before_save do
    self.categories = categories.reject(&:empty?)
  end

  ALLOWED_CATEGORIES = %w[
    Podcast
    Blog
    News
    Video
    Publication
    Media
  ].freeze
end
