lines = <<~LINES
et_actl_m_MAX_m [color=white, label="Actual evapotranspiration: 0.514, (0.543)"];
cattle_number_s [color=white, label="Count of livestock cattle"];
spi_3_m [color=white, label="Variation in precipitation patterns over 3-month period: 0.393, (0.568)"];
spam_V_agg_t_sum_s [color=white, label="Value (USD) of agriculture"];
yield_gap_maize_s [color=white, label="Gap between observed and potential corn yield: -0.286, (0.338)"];
rurpop_s [color=white, label="Population in rural areas: 3.216, (2.491)"];
ndvi_act_min_m [color=white, label="Density of greenness: -0.613, (0.443)"];
acl_sum_evnt_m [color=white, label="Total conflict events"];
acl_sum_fatl_m [color=white, label="Outcome: Reported fatalities from conflicts"];
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
