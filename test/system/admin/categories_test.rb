require 'application_system_test_case'

class CategoriesTest < ApplicationSystemTestCase
  setup do
    @category = categories(:community)
  end

  test 'visiting the index' do
    visit admin_categories_url
    assert_selector 'h1', text: 'Listing categories'
  end

  test 'creating a Category' do
    visit admin_categories_url
    click_on 'New Category'

    fill_in 'Description', with: @category.description
    fill_in 'Slug', with: 'some_unique_slug'
    fill_in 'Title', with: @category.title
    click_on 'Create Category'

    assert_text 'Category was successfully created'
    click_on 'Back'
  end

  test 'updating a Category' do
    visit admin_categories_url
    click_on 'Edit', match: :first

    fill_in 'Description', with: @category.description
    fill_in 'Slug', with: 'some_unique_slug'
    fill_in 'Title', with: @category.title
    click_on 'Update Category'

    assert_text 'Category was successfully updated'
    click_on 'Back'
  end

  test 'destroying a Category' do
    visit admin_categories_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'Category was successfully deleted'
  end
end
