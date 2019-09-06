require 'test_helper'

class LayerTest < ActiveSupport::TestCase
  setup do
    @layer_one = layers(:risk_of_conflict)
    @layer_two = layers(:local_population_density)
    @layers = Layer.where(id: [@layer_one.id, @layer_two.id]).order(:name)
  end

  test 'self.serialized_for_react_app' do
    expected = [
      {
        id: @layer_two.layer_id,
        category_slugs: @layer_two.categories.map(&:slug),
        name: @layer_two.name,
        short_description: @layer_two.short_description,
        long_description: @layer_two.long_description,
        initially_on: false,
        source_name: @layer_two.source_name,
        source_url: @layer_two.source_url,
        source_description: @layer_two.source_description,
      },
      {
        id: @layer_one.layer_id,
        category_slugs: @layer_one.categories.map(&:slug),
        name: @layer_one.name,
        short_description: @layer_one.short_description,
        long_description: @layer_one.long_description,
        initially_on: true,
        source_name: @layer_one.source_name,
        source_url: @layer_one.source_url,
        source_description: @layer_one.source_description,
      },
    ]

    assert_equal expected, @layers.serialized_for_react_app
  end
end
