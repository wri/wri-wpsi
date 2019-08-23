require 'test_helper'

class LayerTest < ActiveSupport::TestCase
  setup do
    @layer_one = layers(:conflict_one)
    @layer_two = layers(:community_one)
    @layers = Layer.where(id: [@layer_one.id, @layer_two.id])
  end

  test 'self.serialized_for_react_app' do
    expected = [
      {
        id: @layer_one.layer_id,
        dataset: @layer_one.dataset_id,
        category_slugs: @layer_one.categories.map(&:slug),
        name: @layer_one.name,
        description: @layer_one.description,
        initially_on: true,
      },
      {
        id: @layer_two.layer_id,
        dataset: @layer_two.dataset_id,
        category_slugs: @layer_two.categories.map(&:slug),
        name: @layer_two.name,
        description: @layer_two.description,
        initially_on: false,
      },
    ]

    assert_equal expected, @layers.serialized_for_react_app
  end
end
