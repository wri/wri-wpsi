require 'test_helper'

class LayerTest < ActiveSupport::TestCase
  setup do
    @layer_one = layers(:conflict_one)
    @layer_two = layers(:community_one)
  end

  test 'self.serialized_for_react_app' do
    expected = [
      {
        id: @layer_one.layer_id,
        dataset: @layer_one.dataset_id,
        category: @layer_one.category,
        name: @layer_one.name,
        description: @layer_one.description,
        initially_on: true,
      },
      {
        id: @layer_two.layer_id,
        dataset: @layer_two.dataset_id,
        category: @layer_two.category,
        name: @layer_two.name,
        description: @layer_two.description,
        initially_on: false,
      },
    ]

    assert_equal expected, Layer.serialized_for_react_app.first(2)
  end
end
