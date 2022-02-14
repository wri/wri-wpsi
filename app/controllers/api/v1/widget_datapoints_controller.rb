class Api::V1::WidgetDatapointsController < ApplicationController
  def index
    set_field_name
    set_widget_datapoints

    respond_to do |format|
      format.json { render_json }
      format.csv { render_csv }
    end
  end

  private

  def render_json
    render json: {
      widget_datapoints: @widget_datapoints.serialized_for_react_app(@field_name),
    }.to_json
  end

  def render_csv
    send_data(
      @widget_datapoints.to_csv(@field_name),
      filename: "widget_datapoints-#{Time.zone.today}.csv",
    )
  end

  def set_field_name
    @field_name = params.require(:field_name)
    @field_name = nil if @field_name == 'all'
  end

  def set_widget_datapoints
    gid_2 = params.require(:gid_2)
    @widget_datapoints = WidgetDatapoint.where(gid_2: gid_2).order(:month_date)

    return unless @field_name

    column_name = WidgetDatapoint.connection.quote_column_name(@field_name)
    @widget_datapoints = @widget_datapoints.where("#{column_name} IS NOT NULL")
  end
end
