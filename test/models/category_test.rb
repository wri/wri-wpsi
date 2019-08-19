require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  setup do
    @category_one = categories(:community)
    @category_two = categories(:conflict)
    @categories = Category.where(id: [@category_one.id, @category_two.id])
  end

  test 'self.serialized_for_react_app' do
    expected = [
      {
        title: @category_one.title,
        slug: @category_one.slug,
        description: @category_one.description,
      },
      {
        title: @category_two.title,
        slug: @category_two.slug,
        description: @category_two.description,
      },
    ]

    assert_equal expected, @categories.serialized_for_react_app
  end
end
