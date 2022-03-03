class UpdateWidgetDatapointColumnsMar2022 < ActiveRecord::Migration[5.2]
  def change
    rename_column :widget_datapoints, "age_65+", "age_65"
    rename_column :widget_datapoints, "EG.ELC.ACCS.ZS", "EG-ELC-ACCS-ZS"
    rename_column :widget_datapoints, "EG.ELC.LOSS.ZS", "EG-ELC-LOSS-ZS"
    rename_column :widget_datapoints, "EG.IMP.CONS.ZS", "EG-IMP-CONS-ZS"
    rename_column :widget_datapoints, "EP.PMP.DESL.CD", "EP-PMP-DESL-CD"
    rename_column :widget_datapoints, "FP.CPI.TOTL.ZG", "FP-CPI-TOTL-ZG"
    rename_column :widget_datapoints, "IC.FRM.OUTG.ZS", "IC-FRM-OUTG-ZS"
    rename_column :widget_datapoints, "NV.AGR.TOTL.ZS", "NV-AGR-TOTL-ZS"
    rename_column :widget_datapoints, "NY.GDP.PCAP.PP.KD", "NY-GDP-PCAP-PP-KD"
    rename_column :widget_datapoints, "sex_65+", "sex_65"
    rename_column :widget_datapoints, "SH.STA.STNT.ZS", "SH-STA-STNT-ZS"
    rename_column :widget_datapoints, "SI.POV.LMIC", "SI-POV-LMIC"
    rename_column :widget_datapoints, "SL.AGR.EMPL.ZS", "SL-AGR-EMPL-ZS"
    rename_column :widget_datapoints, "SL.UEM.TOTL.ZS", "SL-UEM-TOTL-ZS"
    rename_column :widget_datapoints, "SP.DYN.IMRT.IN", "SP-DYN-IMRT-IN"
  end
end
