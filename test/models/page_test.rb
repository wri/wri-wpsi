require 'test_helper'

class PageTest < ActiveSupport::TestCase
  test 'self.options_for_menu_select' do
    top_level_page = create(:page, menu: '')
    create(:page, menu: top_level_page.slug)
    create(:page, menu: nil)

    fixture_options = Page.where(menu: '').map { |page| [page.name, page.slug] }

    expected = [
      ['- Do not include in any menu -', 'none'],
      ['- Include as a top-level menu item -', ''],
    ] + fixture_options

    assert_equal expected, Page.options_for_menu_select
  end

  test 'redirect targets' do
    assert_equal :map, pages(:map).redirect_target
    assert_nil create(:page, menu: nil).redirect_target
  end

  test 'contentless conditions' do
    assert pages(:about).contentless?
    assert pages(:map).contentless?
    assert_not create(:page, menu: nil).contentless?
  end
end
