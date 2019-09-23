require 'test_helper'

class LayerTest < ActiveSupport::TestCase
  setup do
    @layer_one = layers(:risk_of_conflict)
    @layer_two = layers(:local_population_density)
    @layers = Layer.where(id: [@layer_one.id, @layer_two.id]).order(:name)
  end

  test 'self.serialized_for_react_app' do # rubocop:disable Metrics/BlockLength
    expected = [
      {
        id: @layer_two.layer_id,
        category_slugs: @layer_two.categories.map(&:slug),
        categories: @layer_two.categories.serialized_for_react_app,
        name: @layer_two.name,
        short_description: @layer_two.short_description,
        long_description: @layer_two.long_description,
        initially_on: false,
        source_name: @layer_two.source_name,
        source_url: @layer_two.source_url,
        source_description: @layer_two.source_description,
        widget_spec: @layer_two.widget_spec,
      },
      {
        id: @layer_one.layer_id,
        category_slugs: @layer_one.categories.map(&:slug),
        categories: @layer_one.categories.serialized_for_react_app,
        name: @layer_one.name,
        short_description: @layer_one.short_description,
        long_description: @layer_one.long_description,
        initially_on: true,
        source_name: @layer_one.source_name,
        source_url: @layer_one.source_url,
        source_description: @layer_one.source_description,
        widget_spec: @layer_one.widget_spec,
      },
    ]

    assert_equal expected, @layers.serialized_for_react_app
  end

  test 'valid layer' do
    layer = Layer.new
    assert layer.valid?, layer.errors.full_messages
  end

  test 'valid published layer' do
    layer = Layer.new(
      name: '12345',
      layer_id: '12345',
      dataset_id: '12345',
      widget_spec: '{}',
      published: true,
    )
    assert layer.valid?, layer.errors.full_messages
  end

  test 'invalid when widget_spec is unparsable' do
    layer = Layer.new(widget_spec: 'this is not valid JSON')
    assert_not layer.valid?, 'layer is valid with unparsable widget spec'
    assert_not_nil layer.errors[:widget_spec], 'no validation error on widget_spec'
  end
end
