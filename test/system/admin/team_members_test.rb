require 'application_system_test_case'

class TeamMembersTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @team_member = build(:team_member)
  end

  test 'visiting the index' do
    visit admin_team_members_url
    assert_selector 'h2', text: 'Listing admin team members'
  end

  test 'creating team members' do
    @file_upload = create(:file_upload)

    visit admin_team_members_url
    click_on 'Add a new team member'

    fill_in 'Name', with: @team_member.name
    fill_in 'Position', with: @team_member.position
    fill_in 'Email', with: @team_member.email
    select @file_upload.description, from: 'Image'
    
    click_on "Create #{TeamMember.model_name.human}"

    assert_text 'Team member was successfully created.'
  end

  test 'updating a team member' do
    @file_upload = create(:file_upload)
    create(:team_member)
    @new_team_member = build(:team_member)

    visit admin_team_members_url
    click_on 'Edit', match: :first

    fill_in 'Name', with: @new_team_member.name
    fill_in 'Position', with: @new_team_member.position
    fill_in 'Email', with: @new_team_member.email
    select @file_upload.description, from: 'Image'

    click_on "Update #{TeamMember.model_name.human}"

    assert_text 'Team member was successfully updated.'
  end  

  test 'deleting a news item' do
    create(:team_member)

    visit admin_team_members_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'The event was successfully deleted.'
  end
end
