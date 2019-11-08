require 'application_system_test_case'

class PagesTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @page = create(:page)
    @new_page = build(:page, menu: 'About Us', sort_priority: 1)
  end

  test 'visiting the index' do
    visit admin_pages_url
    assert_selector 'h2', text: 'Listing pages'
  end

  test 'creating a Page' do
    visit admin_pages_url
    click_on 'new page'

    fill_in 'Name', with: @new_page.name
    fill_in 'Slug', with: @new_page.slug
    fill_in 'Menu', with: @new_page.menu
    fill_in 'Sort priority', with: @new_page.sort_priority
    tinymce_fill_in 'page_content', with: @new_page.content
    click_on 'Create Page'

    assert_text 'Page was successfully created'
    click_on 'Back'
  end

  test 'updating a Page' do
    visit admin_pages_url
    click_on 'Edit', match: :first

    fill_in 'Name', with: @new_page.name
    fill_in 'Slug', with: @new_page.slug
    fill_in 'Menu', with: @new_page.menu
    fill_in 'Sort priority', with: @new_page.sort_priority
    tinymce_fill_in 'page_content', with: @new_page.content
    click_on 'Update Page'

    assert_text 'Page was successfully updated'
    click_on 'Back'
  end

  test 'destroying a Page' do
    visit admin_pages_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'Page was successfully deleted'
  end
end
