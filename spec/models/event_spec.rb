# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Event, type: :model do
  let(:event) { build :event }

  it 'has a valid factory' do
    expect(event).to be_valid
  end
end