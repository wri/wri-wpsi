lines = <<~LINES
et_anom_m_STD_m [color=white, label="Variation in evapotranspiration patterns: -0.032, (0.044)"];
chicken_number_s [color=white, label="Count of livestock chickens"];
spi_3_m [color=white, label="Variation of precipitation over 3-month period"];
rurpop_s [color=white, label="Population in rural areas"];
yield_gap_soybean_s [color=white, label="Gap between observed and potential soybean yield: 0.022, (0.031)"];
rurratio_s [color=white, label="Percentage of population that live in rural areas"];
locdensity_y [color=white, label="Population density"];
ndvi_act_min_m [color=white, label="Density of greenness: 0.044, (0.1)"];
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
