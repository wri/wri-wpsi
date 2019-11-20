class Card
  include ActiveModel::Model

  attr_accessor :title, :desc, :image, :href, :options, :credit
end
