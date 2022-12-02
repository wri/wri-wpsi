class AddNewWidgetCols < ActiveRecord::Migration[5.2]
  def change
    %w[
      IC-FRM-OUTG-ZS spam_V_agg_t_sum Cropland2000_mean_percent buffalo_number cattle_number chicken_number duck_number goat_number horse_number pig_number sheep_number lstm_2m_forecast
    ].each do |field|
      add_column :widget_datapoints, field, :string
    end
  end
end
