User.transaction do
  CategoryLayer.delete_all
  Layer.delete_all
  Category.delete_all
  [
    ['prod_20221109/categories.json', Category],
    ['prod_20221109/layers.json', Layer],
    ['prod_20221109/category_layer.json', CategoryLayer],
  ].each do |filename, model|
    path = Rails.root.join(filename)
    data = File.read(path)
    JSON.parse(data).each do |attr|
      record = model.new(attr)
      record.save!(validate: false)
    end
  end
end
