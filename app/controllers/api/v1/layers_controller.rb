class Api::V1::LayersController < ApplicationController
  def index
    render json: {
      layers: Layer.serialized_for_react_app,
    }.to_json
  end
end
