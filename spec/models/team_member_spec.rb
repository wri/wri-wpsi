# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TeamMember, type: :model do
  let(:team_member) { build :team_member, :with_new_tags }
  
  it 'has a valid factory' do
    expect(team_member).to be_valid
    expect(team_member.tags.length).to eq(3)
  end
end
