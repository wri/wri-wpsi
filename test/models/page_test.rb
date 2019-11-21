require 'test_helper'

class PageTest < ActiveSupport::TestCase
  test 'self.options_for_menu_select' do
    top_level_page = create(:page, menu: '')
    create(:page, menu: top_level_page.slug)
    create(:page, menu: nil)

    expected = [
      ['- Do not include in any menu -', 'none'],
      ['- Include as a top-level menu item -', ''],
      [top_level_page.name, top_level_page.slug],
    ]

    assert_equal expected, Page.options_for_menu_select
  end
end
