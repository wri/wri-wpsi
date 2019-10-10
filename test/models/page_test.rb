require 'test_helper'

class PageTest < ActiveSupport::TestCase
  setup do
    @page_one = create(:page)
    @page_two = create(:page)
    @pages = Page.where(id: [@page_one.id, @page_two.id])
  end

  test 'self.serialized_for_react_app' do
    expected = [
      {
        name: @page_one.name,
        slug: @page_one.slug,
        content: @page_one.content,
      },
      {
        name: @page_two.name,
        slug: @page_two.slug,
        content: @page_two.content,
      },
    ]

    assert_equal expected, @pages.serialized_for_react_app
  end
end
