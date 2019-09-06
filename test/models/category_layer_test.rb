require 'test_helper'

class CategoryLayerTest < ActiveSupport::TestCase
  test 'valid?' do
    assert_not CategoryLayer.new.valid?

    record = CategoryLayer.new(
      layer: layers(:risk_of_conflict),
      category: categories(:conflict),
    )

    assert record.valid?
  end
end
