class Api::V1::CategoriesController < Api::BaseController
  def index
    render json: {
      categories: Category.serialized_for_react_app,
    }.to_json
  end
end
