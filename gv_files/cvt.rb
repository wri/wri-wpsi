lines = <<~LINES
spam_P_i_sum_s [color=white, label="Metric tons of irrigated crops produced: -0.342, (2.209)"];
rurpop_s [color=white, label="Population in rural areas: 3.303, (2.726)"];
Cropland2000_mean_percent_s [color=white, label="Percentage of land that is cropland: -0.065, (0.066)"];
loccount_y [color=white, label="Total population count: 1.387, (0.879)"];
locdensity_y [color=white, label="Population density: 0.772, (0.775)"];
yield_gap_rice_s [color=white, label="Gap between observed and potential rice yield: 0.389, (0.162)"];
et_actl_m_MIN_m [color=white, label="Actual evapotranspiration: -0.464, (0.116)"];
acl_sum_evnt_m [color=white, label="Outcome: Total number of conflict events"];
acl_sum_fatl_m [color=white, label="Reported fatalities from conflict events"];
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
