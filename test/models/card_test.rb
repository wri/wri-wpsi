require 'test_helper'

class CardTest < ActiveSupport::TestCase
  test 'initialize' do
    card_attributes = {
      title: 'Test title',
      desc: 'Test desc',
      image: 'Test image',
      href: 'Test href',
      options: { type: 'test type' },
      credit: 'Test credit',
    }

    card = Card.new(card_attributes)

    card_attributes.each do |attribute, value|
      assert_equal value, card.send(attribute)
    end
  end
end
