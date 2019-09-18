class Api::V1::WidgetDatapointsController < ApplicationController
  def index
    gid_2 = params.require(:gid_2)
    field_name = params.require(:field_name)
    widget_datapoints = WidgetDatapoint.where(gid_2: gid_2).
      where(%(? IS NOT NULL), field_name).
      serialized_for_react_app(field_name)

    render json: {
      widget_datapoints: widget_datapoints,
    }.to_json
  end
end
