require 'application_system_test_case'

class EventsTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @event = build(:event)
  end

  test 'visiting the index' do
    visit admin_events_url
    assert_selector 'h2', text: 'Listing admin events'
  end

  test 'creating an event' do
    visit admin_events_url
    click_on 'Add a new admin event'

    fill_in 'Title', with: @event.title
    fill_in 'Start', with: @event.start
    fill_in 'Ends', with: @event.ends
    fill_in 'Location', with: @event.location
    
    click_on "Create #{Event.model_name.human}"

    assert_text 'Event was successfully created.'
  end

  test 'updating an event' do
    create(:event)

    visit admin_events_url
    click_on 'Edit', match: :first

    fill_in 'Title', with: @event.title
    fill_in 'Location', with: @event.location
    fill_in 'Link', with: @event.link
    click_on "Update #{Event.model_name.human}"

    assert_text 'The event was successfully updated'
    click_on 'Back'
  end

  test 'deleting an event' do
    create(:event)
    visit admin_events_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'The event was successfully deleted.'
  end
end
