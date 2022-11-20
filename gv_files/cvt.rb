lines = <<~LINES
DeliveredkcalFraction_s [color=white, label="Portion of calories produced going toward food: 0.056, (0.143)"];
chicken_number_s [color=white, label="Count of livestock chickens"];
spam_P_i_avg_s [color=white, label="Metric tons of irrigated crops produced"];
rurpop_s [color=white, label="Population in rural areas"];
yield_gap_barley_s [color=white, label="Gap between observed and potential barley yield"];
rurratio_s [color=white, label="Percentage of population that live in rural areas: -0.489, (0.255)"];
locdensity_y [color=white, label="Local population density: -1.263, (0.68)"];
ndvi_act_min_m [color=white, label="Density of greenness"];
acl_sum_evnt_m [color=white, label="Outcome: Total number of conflict events"];
acl_sum_fatl_m [color=white, label="Reported fatalities from conflict events"];
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
