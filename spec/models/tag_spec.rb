# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag, type: :model do
  let(:tag) { build :tag }

  it 'has a valid factory' do
    expect(tag).to be_valid
  end
end
