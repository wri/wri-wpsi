class Layer < ApplicationRecord
  has_many :category_layers, dependent: :delete_all
  has_many :categories, through: :category_layers

  validates :layer_id, :dataset_id, :name, presence: true, if: :published?
  validates :source_url, url: { allow_blank: true }

  WIDGET_FIELDS_DICTIONARY = {
    '969fe99d-b861-46a1-8c8e-7c44cbafd1d6' => ['locdensity'],
    '3a5a0c20-54da-4ba3-bfae-0dbed4ab9b50' => ['SP.DYN.IMRT.IN'],
    '7a08dee3-6301-45d2-9ced-c2918f6f3c6b' => ['SL.AGR.EMPL.ZS'],
    'fdf06d8c-72e9-48a7-80f1-27bd5f19342c' => ['bws'],
    '2a652430-f94c-4185-b1ad-fae38502dfd2' => ['rfr'],
    'd2f0d40c-65cd-4046-a509-041b0ec692bd' => ['sev'],
    '98b8e4f5-d961-463a-8732-7116de16808c' => ['iav'],
  }.freeze

  def categories_string
    categories.join ', '
  end

  def widget_fields
    WIDGET_FIELDS_DICTIONARY[layer_id]
  end

  def self.published
    where(published: true)
  end

  def self.serialized_for_react_app # rubocop:disable Metrics/MethodLength
    published.map do |layer|
      {
        id: layer.layer_id,
        category_slugs: layer.categories.map(&:slug),
        categories: layer.categories.serialized_for_react_app,
        name: layer.name,
        short_description: layer.short_description,
        long_description: layer.long_description,
        initially_on: layer.primary?,
        source_name: layer.source_name,
        source_url: layer.source_url,
        source_description: layer.source_description,
        widget_fields: layer.widget_fields,
      }
    end
  end
end
