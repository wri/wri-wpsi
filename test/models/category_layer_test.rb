require 'test_helper'

class CategoryLayerTest < ActiveSupport::TestCase
  test 'valid?' do
    assert_not CategoryLayer.new.valid?

    record = CategoryLayer.new(
      layer: layers(:conflict_one),
      category: categories(:conflict),
    )

    assert record.valid?
  end
end
