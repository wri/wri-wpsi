class MigrateLayersToLevel1 < ActiveRecord::Migration[5.2]
  # data migration to change the params hard coded in the layers
  # widget spec
  def up
    Layer.find_each do |layer|
      spec = layer.widget_spec.to_s
      new_spec = spec.gsub(/region\.gid_2/, 'region.gid_1')
      if new_spec != spec
        layer.update!(widget_spec: new_spec)
      end
    end
  end

  def down
    Layer.find_each do |layer|
      spec = layer.widget_spec.to_s
      new_spec = spec.gsub(/region\.gid_1/, 'region.gid_2')
      if new_spec != spec
        layer.update!(widget_spec: new_spec)
      end
    end
  end
end
