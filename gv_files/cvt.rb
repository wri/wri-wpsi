lines = <<~LINES
rurratio_s [color=white, label="Percentage of population that live in rural areas: -2.086, (0.244)"];
et_anom_m_STD_m [color=white, label="Variation in evapotranspiration patterns"];
ndvi_act_min_m [color=white, label="Density of greenness: -0.176, (0.125)"];
spi_3_m [color=white, label="Variation of precipitation over 3-month period: 0.703, (0.232)"];
rainfed_s [color=white, label="Percentage of crops grown that are rainfed: -0.168, (0.099)"];
spam_P_i_sum_s [color=white, label="Metric tons of irrigated crops produced"];
yield_gap_maize_s [color=white, label="Gap between observed and potential corn yield"];
acl_pprt_evnt_m [color=white, label="Outcome: Total number of protest events"];
LINES

# Cropland2000_mean_percent_s [color=white, label="Percentage of land that is cropland: -0.065, (0.066)"];
lines = lines.split("\n")
items = lines.map do |line|
  line = line.gsub(/outcome: */i,'')
  id, label = line.match(/(^[a-z0-9_]+)\s+.*label="(.+)"/i).captures
  label, other = label.split(/: */, 2)
  rr = /([-0-9.]+)\W+\(([-0-9.]+)\)/
  if (other =~ rr)
    effect, error = other.match(rr).captures
  end
  rank = label =~ /(conflict events|fatalities)/i ? 'c' : 'b'
  {
    id: id,
    label: label,
    effect: effect,
    error: error,
    rank: rank
  }
end

pp items.to_a
