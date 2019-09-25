class AddMaskOptionToLayers < ActiveRecord::Migration[5.2]
  def change
    add_column :layers, :mask, :boolean, default: false, null: false

    reversible do |change|
      change.up do
        if Layer.where(layer_id: 'c7e76588-6da5-4645-8842-2d2ac0001110').empty?
          puts '-- create mask layer'
          layer = Layer.create(
            layer_id: 'c7e76588-6da5-4645-8842-2d2ac0001110',
            dataset_id: '0ce24533-7877-4926-b962-a6c726332d82',
            name: 'Highlight areas of water stress',
            published: true,
            mask: true,
          )
          puts layer.inspect
        end
      end
    end
  end
end
