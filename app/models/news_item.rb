class NewsItem < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :article_url, url: { allow_blank: false }
  validates :image_url, presence: true
  validates :image_alt_text, presence: true
  # no validation for date?
end
