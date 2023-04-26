# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PageTeamMember, type: :model do
  let(:page_team_member) { build :page_team_member }

  it 'has a valid factory' do
    expect(page_team_member).to be_valid
  end
end
