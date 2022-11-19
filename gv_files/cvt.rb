lines = <<~LINES
et_anom_m_STD_m [color=white, label="Variation in evapotranspiration patterns"];
chicken_number_s [color=white, label="Count of livestock chickens: -0.201, (0.081)"];
yield_gap_barley_s [color=white, label="Gap between observed and potential barley yield: -0.224, (0.062)"];
rurpop_s [color=white, label="Population in rural areas"];
Cropland2000_mean_percent_s [color=white, label="Percentage of land that is cropland: 0.174, (0.072)"];
loccount_y [color=white, label="Total population count: 2.366, (0.936)"];
locdensity_y [color=white, label="Population density: 0.38, (0.259)"];
DeliveredkcalFraction_s [color=white, label="Portion of calories produced going toward food"];
acl_sum_evnt_m [color=white, label="Total number of conflict events"];
LINES

# Cropland2000_mean_percent_s [color=white, label="Percentage of land that is cropland: -0.065, (0.066)"];
lines = lines.split("\n")
items = lines.map do |line|
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
