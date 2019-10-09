class Api::V1::PagesController < ApplicationController
  def index
    render json: {
      pages: Page.serialized_for_react_app,
    }.to_json
  end
end
