class Api::V1::WidgetDatapointsController < ApplicationController
  def index
    gid_2 = params.require(:gid_2)
    field_name = params.require(:field_name)
    widget_datapoints = WidgetDatapoint.where(gid_2: gid_2).
      where(%("#{field_name}" IS NOT NULL)).
      serialized_for_react_app(field_name).
      first(10)

    render json: {
      widget_datapoints: widget_datapoints, # Limit for now since we are listing them in a table
    }.to_json
  end
end
