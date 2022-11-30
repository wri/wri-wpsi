namespace :causal_model do
  desc 'generate region graphs for causal model article'
  task generate_region_graphs: :environment do
    CausalModelRegionGenerator.new.perform
  end

  # desc 'extract nodes from graphviz'
  # task widget_specs: :environment do
  #   lines = <<~LINES
  #     et_actl_m_MAX_m [color=white, label="Actual evapotranspiration: 0.514, (0.543)"];
  #     cattle_number_s [color=white, label="Count of livestock cattle"];
  #     spi_3_m [color=white, label="Variation in precipitation patterns over 3-month period: 0.393, (0.568)"];
  #     spam_V_agg_t_sum_s [color=white, label="Value (USD) of agriculture"];
  #     yield_gap_maize_s [color=white, label="Gap between observed and potential corn yield: -0.286, (0.338)"];
  #     rurpop_s [color=white, label="Population in rural areas: 3.216, (2.491)"];
  #     ndvi_act_min_m [color=white, label="Density of greenness: -0.613, (0.443)"];
  #     acl_sum_evnt_m [color=white, label="Total conflict events"];
  #     acl_sum_fatl_m [color=white, label="Outcome: Reported fatalities from conflicts"];
  #   LINES

  #   # Cropland2000_mean_percent_s [color=white, label="Percentage of land that is cropland: -0.065, (0.066)"];
  #   lines = lines.split("\n")
  #   items = lines.map do |line|
  #     line = line.gsub(/outcome: */i, '')
  #     id, label = line.match(/(^[a-z0-9_]+)\s+.*label="(.+)"/i).captures
  #     label, other = label.split(/: */, 2)
  #     rr = /([-0-9.]+)\W+\(([-0-9.]+)\)/
  #     effect, error = other.match(rr).captures if other =~ rr
  #     rank = label =~ /(conflict events|fatalities)/i ? 'c' : 'b'
  #     {
  #       id: id,
  #       label: label,
  #       effect: effect,
  #       error: error,
  #       rank: rank,
  #     }
  #   end
  #   pp items.to_a
  # end
end

class CausalModelRegionGenerator
  def perform(path: 'app/javascript/images/regions/causal_graphs')
    regions.each do |region|
      puts "region #{region[:id]} "
      gv = generate_gv(region)
      gv_path = root = Rails.root.join(path, "#{region[:id]}.gv")
      File.open(gv_path, 'w') { |file| file.write(gv) }
      svg_path = root = Rails.root.join(path, "#{region[:id]}.svg")
      convert_to_svg(gv_path, svg_path)
      inject_svg_styles(svg_path)
    end
  end

  protected

  def inject_svg_styles(path)
    css = <<~CSS
      .node path {
        stroke: #fff;
      }
      .node text {
        fill: #fff;
      }
      .node polyline {
        stroke: #fff;
      }
      .rankA path {
        fill: #1b6002;
      }
      .rankB path {
        fill: #437387;
      }
      .rankC path {
        fill: #2e3348;
      }
    CSS

    doc = File.open(path) { |f| Nokogiri::XML(f) }
    doc.root.add_child "<style>#{css}</style>"
    doc.root['preserveAspectRatio'] = 'xMinYMin'
    doc.root['height'] = nil
    doc.root['width'] = nil
    File.open(path, 'w') { |file| file.write doc.to_s }
  end

  def convert_to_svg(gv_path, svg_path)
    cmd = "dot -Tsvg #{gv_path} -o #{svg_path}"
    puts cmd
    raise unless system(cmd)
  end

  def font_name
    "Helvetica, Arial, sans-serif"
  end

  def generate_gv(region)
    <<~GV
      # generated file for region: #{region[:id]} by #{self.class.name}
      strict digraph causalModel {
      fontname="#{font_name}";
      label="\nCausal Model: #{region[:name]}";
      labelloc = b;
      nodesep = 0.4;
      concentrate = true;
      node[shape = Mrecord, fontname = "#{font_name}", margin = "0.10,0.06", penwidth = 1.0];
      edge[arrowsize = 1.2 penwidth = 2 color="#666666"];

      # nodes
      #{render_gv_nodes(region[:nodes])}

      #ranks
      #{node_ranks(region[:nodes]).join("\n")}

      # links
      #{render_gv_links(region[:links])}

      }
    GV
  end

  def node_ranks(nodes)
    %w[a c].map do |rank|
      ids = nodes.select { |n| n[:rank] == rank }.map { |n| n[:id] }
      ids.many? ? "{rank=same; #{ids.join(' ')}; }" : nil
    end.compact
  end

  def render_gv_links(links)
    parts = links.map do |link|
      link.split(/ *-> */, 2)
    end

    parts.map do |a, b|
      # could add options
      "#{a} -> #{b};"
    end.join("\n")
  end

  def render_gv_nodes(nodes)
    nodes.map do |node|
      "#{render_gv_node(node)};"
    end.join("\n")
  end

  def render_gv_node(node)
    (id, label, rank, effect, error, significance) = node.values_at(
      :id, :label, :rank, :effect, :error, :significance
    ).map(&:presence)

    raise node.inspect if id.blank? || label.blank?

    line_width = 18

    if node[:rank] == 'c'
      # rank c has edges within same rank so we can't use html record lables
      label_str = ApplicationController.helpers.word_wrap(label, line_width: line_width, break_sequence: "\n")
      klass = "rank#{rank.upcase}"
      return %(#{id} [label = "#{label_str}" class = #{klass} shape=box style=rounded fontsize="16pt" margin = "0.05,0.10"])
    end

    label_str = ApplicationController.helpers.word_wrap(label, line_width: line_width, break_sequence: '<br/>')
    title = <<~GV
      <table align="center" border="0" cellspacing="1" cellpadding="1">
      <tr><td><font point-size="16">#{label_str}</font></td></tr>
      </table>
    GV

    details = []
    %i[effect error significance].each do |key|
      value = node[key]
      details.push(%(<tr><td><font point-size="14">#{key}: #{value}</font></td></tr>)) if value
    end

    label = nil
    if details.any?
      details_table = %(<table border="0" cellspacing="1" cellpadding="0.5">#{details.join("\n")}</table>)
      label = "<{#{title}|#{details_table}}>"
    else
      label = "<#{title}>"
    end

    klass = "rank#{rank.upcase}"
    "#{id} [label = #{label}, class = #{klass}]"
  end

  def regions
    [
      east_asia,
      europe,
      latin_america_and_caribbean,
      middle_east_and_north_africa,
      north_america,
      south_asia,
      sub_saharan_africa,
    ]
  end

  def east_asia
    {
      id: 'east_asia_and_pacific',
      name: 'East Asia and Pacific',
      nodes: [{ id: 'spam_P_i_sum_s',
                label: 'Metric tons of irrigated crops produced',
                effect: '-0.342',
                error: '2.209',
                rank: 'b' },
              { id: 'rurpop_s',
                label: 'Population in rural areas',
                effect: '3.303',
                error: '2.726',
                rank: 'b' },
              { id: 'Cropland2000_mean_percent_s',
                label: 'Percentage of land that is cropland',
                effect: '-0.065',
                significance: '0.1',
                error: '0.066',
                rank: 'a' },
              { id: 'loccount_y',
                label: 'Total population count',
                effect: '1.387',
                significance: '0.1',
                error: '0.879',
                rank: 'b' },
              { id: 'locdensity_y',
                label: 'Population density',
                effect: '0.772',
                significance: '0.1',
                error: '0.775',
                rank: 'b' },
              { id: 'yield_gap_rice_s',
                label: 'Gap between observed and potential rice yield',
                effect: '0.389',
                significance: '5',
                error: '0.162',
                rank: 'b' },
              { id: 'et_actl_m_MIN_m',
                label: 'Actual evapotranspiration',
                effect: '-0.464',
                significance: '0.1',
                error: '0.116',
                rank: 'a' },
              { id: 'acl_sum_evnt_m',
                label: 'Total number of conflict events',
                effect: nil,
                error: nil,
                rank: 'c' },
              { id: 'acl_sum_fatl_m',
                label: 'Reported fatalities from conflict events',
                effect: nil,
                error: nil,
                rank: 'c' }],
      links: [
        'spam_P_i_sum_s -> loccount_y ',
        'rurpop_s -> spam_P_i_sum_s ',
        'rurpop_s -> loccount_y ',
        'rurpop_s -> yield_gap_rice_s ',
        'rurpop_s -> acl_sum_fatl_m ',
        'Cropland2000_mean_percent_s -> rurpop_s ',
        'loccount_y -> acl_sum_evnt_m ',
        'locdensity_y -> loccount_y ',
        'locdensity_y -> acl_sum_evnt_m ',
        'yield_gap_rice_s -> locdensity_y ',
        'et_actl_m_MIN_m -> rurpop_s ',
        'et_actl_m_MIN_m -> locdensity_y ',
        'et_actl_m_MIN_m -> yield_gap_rice_s ',
        'acl_sum_fatl_m -> acl_sum_evnt_m ',
      ],
    }
  end

  def europe
    {
      id: 'europe_and_central_asia',
      name: 'Europe and Central Asia',
      nodes: [{ id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration',
                effect: nil,
                error: nil,
                rank: 'a' },
              { id: 'chicken_number_s',
                label: 'Count of livestock chickens',
                effect: '-0.201',
                significance: '0.1',
                error: '0.081',
                rank: 'a' },
              { id: 'yield_gap_barley_s',
                label: 'Gap between observed and potential barley yield',
                effect: '-0.224',
                significance: '0.1',
                error: '0.062',
                rank: 'b' },
              { id: 'rurpop_s',
                label: 'Population in rural areas',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'Cropland2000_mean_percent_s',
                label: 'Percentage of land that is cropland',
                effect: '0.174',
                significance: '0.1',
                error: '0.072',
                rank: 'b' },
              { id: 'loccount_y',
                label: 'Total population count',
                effect: '2.366',
                significance: '0.1',
                error: '0.936',
                rank: 'b' },
              { id: 'locdensity_y',
                label: 'Population density',
                effect: '0.38',
                error: '0.259',
                rank: 'b' },
              { id: 'DeliveredkcalFraction_s',
                label: 'Portion of calories produced going toward food',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'acl_sum_evnt_m',
                label: 'Total number of conflict events',
                effect: nil,
                error: nil,
                rank: 'c' }],
      links: [
        'et_anom_m_STD_m -> yield_gap_barley_s ',
        'et_anom_m_STD_m -> rurpop_s ',
        'et_anom_m_STD_m -> DeliveredkcalFraction_s ',
        'chicken_number_s -> yield_gap_barley_s ',
        'chicken_number_s -> Cropland2000_mean_percent_s ',
        'chicken_number_s -> DeliveredkcalFraction_s ',
        'yield_gap_barley_s -> rurpop_s ',
        'yield_gap_barley_s -> locdensity_y ',
        'rurpop_s -> loccount_y ',
        'Cropland2000_mean_percent_s -> rurpop_s ',
        'Cropland2000_mean_percent_s -> loccount_y ',
        'loccount_y -> acl_sum_evnt_m ',
        'locdensity_y -> Cropland2000_mean_percent_s ',
        'locdensity_y -> loccount_y ',
        'DeliveredkcalFraction_s -> rurpop_s ',
        'DeliveredkcalFraction_s -> loccount_y ',
      ],
    }
  end

  def latin_america_and_caribbean
    {
      id: 'latin_america_and_caribbean',
      name: 'Latin America and Caribbean',
      nodes: [{ id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration',
                effect: '-0.032',
                error: '0.044',
                rank: 'b' },
              { id: 'chicken_number_s',
                label: 'Count of livestock chickens',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'spi_3_m',
                label: 'Variation of precipitation',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'rurpop_s',
                label: 'Population in rural areas',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'yield_gap_soybean_s',
                label: 'Gap between observed and potential soybean yield',
                effect: '0.022',
                error: '0.031',
                rank: 'b' },
              { id: 'rurratio_s',
                label: 'Percentage of population that live in rural areas',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'locdensity_y',
                label: 'Population density',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'ndvi_act_min_m',
                label: 'Density of greenness',
                effect: '0.044',
                error: '0.1',
                rank: 'b' },
              { id: 'acl_sum_evnt_m',
                label: 'Total number of conflict events',
                effect: nil,
                error: nil,
                rank: 'c' },
              { id: 'acl_sum_fatl_m',
                label: 'Reported fatalities from conflict events',
                effect: nil,
                error: nil,
                rank: 'c' }],
      links: [
        'et_anom_m_STD_m -> spi_3_m',
        'et_anom_m_STD_m -> rurratio_s',
        'et_anom_m_STD_m -> locdensity_y',
        'et_anom_m_STD_m -> ndvi_act_min_m',
        'chicken_number_s -> spi_3_m',
        'chicken_number_s -> yield_gap_soybean_s',
        'chicken_number_s -> rurratio_s',
        'chicken_number_s -> ndvi_act_min_m',
        'spi_3_m -> et_anom_m_STD_m',
        'spi_3_m -> chicken_number_s',
        'spi_3_m -> rurpop_s',
        'spi_3_m -> rurratio_s',
        'spi_3_m -> locdensity_y',
        'spi_3_m -> ndvi_act_min_m',
        'rurpop_s -> acl_sum_evnt_m',
        'rurpop_s -> acl_sum_fatl_m',
        'yield_gap_soybean_s -> rurpop_s',
        'rurratio_s -> rurpop_s',
        'rurratio_s -> locdensity_y',
        'rurratio_s -> ndvi_act_min_m',
        'rurratio_s -> acl_sum_fatl_m',
        'locdensity_y -> rurpop_s',
        'locdensity_y -> yield_gap_soybean_s',
        'locdensity_y -> acl_sum_evnt_m',
        'locdensity_y -> acl_sum_fatl_m',
        'ndvi_act_min_m -> rurpop_s',
        'ndvi_act_min_m -> yield_gap_soybean_s',
        'ndvi_act_min_m -> rurratio_s',
        'acl_sum_fatl_m -> acl_sum_evnt_m',
      ],
    }
  end

  def middle_east_and_north_africa
    {
      id: 'middle_east_and_north_africa',
      name: 'Middle East and North Africa',
      nodes: [{ id: 'DeliveredkcalFraction_s',
                label: 'Portion of calories produced going toward food',
                effect: '0.056',
                error: '0.143',
                rank: 'b' },
              { id: 'chicken_number_s',
                label: 'Count of livestock chickens',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'spam_P_i_avg_s',
                label: 'Metric tons of irrigated crops produced',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'rurpop_s',
                label: 'Population in rural areas',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'yield_gap_barley_s',
                label: 'Gap between observed and potential barley yield',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'rurratio_s',
                label: 'Percentage of population that live in rural areas',
                effect: '-0.489',
                error: '0.255',
                rank: 'a' },
              { id: 'locdensity_y',
                label: 'Local population density',
                effect: '-1.263',
                error: '0.68',
                rank: 'b' },
              { id: 'ndvi_act_min_m',
                label: 'Density of greenness',
                effect: nil,
                error: nil,
                rank: 'a' },
              { id: 'acl_sum_evnt_m',
                label: 'Total number of conflict events',
                effect: nil,
                error: nil,
                rank: 'c' },
              { id: 'acl_sum_fatl_m',
                label: 'Reported fatalities from conflict events',
                effect: nil,
                error: nil,
                rank: 'c' }],
      links: [
        'DeliveredkcalFraction_s -> chicken_number_s',
        'DeliveredkcalFraction_s -> spam_P_i_avg_s',
        'chicken_number_s -> spam_P_i_avg_s',
        'chicken_number_s -> rurpop_s',
        'chicken_number_s -> acl_sum_evnt_m',
        'spam_P_i_avg_s -> rurpop_s',
        'rurpop_s -> acl_sum_evnt_m',
        'yield_gap_barley_s -> chicken_number_s',
        'yield_gap_barley_s -> spam_P_i_avg_s',
        'rurratio_s -> chicken_number_s',
        'rurratio_s -> rurpop_s',
        'rurratio_s -> locdensity_y',
        'locdensity_y -> DeliveredkcalFraction_s',
        'locdensity_y -> yield_gap_barley_s',
        'ndvi_act_min_m -> DeliveredkcalFraction_s',
        'ndvi_act_min_m -> chicken_number_s',
        'ndvi_act_min_m -> spam_P_i_avg_s',
        'ndvi_act_min_m -> rurpop_s',
        'ndvi_act_min_m -> yield_gap_barley_s',
        'ndvi_act_min_m -> locdensity_y',
        'acl_sum_fatl_m -> acl_sum_evnt_m',
      ],
    }
  end

  def north_america
    {
      id: 'north_america',
      name: 'North America',
      nodes: [{ id: 'rurratio_s',
                label: 'Percentage of population that live in rural areas',
                effect: '-2.086',
                error: '0.244',
                rank: 'b' },
              { id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'ndvi_act_min_m',
                label: 'Density of greenness',
                effect: '-0.176',
                error: '0.125',
                rank: 'b' },
              { id: 'spi_3_m',
                label: 'Variation of precipitation',
                effect: '0.703',
                error: '0.232',
                rank: 'a' },
              { id: 'rainfed_s',
                label: 'Percentage of crops grown that are rainfed',
                effect: '-0.168',
                error: '0.099',
                rank: 'b' },
              { id: 'spam_P_i_sum_s',
                label: 'Metric tons of irrigated crops produced',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'yield_gap_maize_s',
                label: 'Gap between observed and potential corn yield',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'acl_pprt_evnt_m',
                label: 'Total number of protest events',
                effect: nil,
                error: nil,
                rank: 'c' }],
      links: [
        'rurratio_s -> acl_pprt_evnt_m',
        'et_anom_m_STD_m -> rurratio_s',
        'et_anom_m_STD_m -> ndvi_act_min_m',
        'ndvi_act_min_m -> rurratio_s',
        'ndvi_act_min_m -> yield_gap_maize_s',
        'spi_3_m -> rurratio_s',
        'spi_3_m -> et_anom_m_STD_m',
        'spi_3_m -> ndvi_act_min_m',
        'rainfed_s -> ndvi_act_min_m',
        'rainfed_s -> spam_P_i_sum_s',
        'spam_P_i_sum_s -> rurratio_s',
        'spam_P_i_sum_s -> et_anom_m_STD_m',
        'spam_P_i_sum_s -> rainfed_s',
        'spam_P_i_sum_s -> yield_gap_maize_s',

      ],
    }
  end

  def south_asia
    {
      id: 'south_asia',
      name: 'South Asia',
      nodes: [{ id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration',
                effect: '-0.053',
                error: '0.075',
                rank: 'a' },
              { id: 'DeliveredkcalFraction_s',
                label: 'Portion of calories produced going toward food',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'ndvi_act_med_m',
                label: 'Density of greenness',
                effect: '-0.342',
                error: '0.113',
                rank: 'b' },
              { id: 'cattle_number_s',
                label: 'Count of livestock cattle',
                effect: '1.846',
                error: '0.278',
                rank: 'b' },
              { id: 'spi_1_f2_m',
                label: 'Variation in precipitation',
                effect: nil,
                error: nil,
                rank: 'a' },
              { id: 'yield_gap_rice_s',
                label: 'Gap between observed and potential rice yield',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'rurpop_s',
                label: 'Population in rural areas',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'acl_sum_evnt_m',
                label: 'Total number of conflict events',
                effect: nil,
                error: nil,
                rank: 'c' }],
      links: [
        'et_anom_m_STD_m -> ndvi_act_med_m',
        'et_anom_m_STD_m -> yield_gap_rice_s',
        'et_anom_m_STD_m -> rurpop_s',
        'et_anom_m_STD_m -> acl_sum_evnt_m',
        'DeliveredkcalFraction_s -> cattle_number_s',
        'DeliveredkcalFraction_s -> rurpop_s',
        'ndvi_act_med_m -> DeliveredkcalFraction_s',
        'ndvi_act_med_m -> yield_gap_rice_s',
        'ndvi_act_med_m -> acl_sum_evnt_m',
        'cattle_number_s -> yield_gap_rice_s',
        'cattle_number_s -> rurpop_s',
        'cattle_number_s -> acl_sum_evnt_m',
        'spi_1_f2_m -> ndvi_act_med_m',
        'spi_1_f2_m -> cattle_number_s',
        'rurpop_s -> acl_sum_evnt_m',
      ],
    }
  end

  def sub_saharan_africa
    {
      id: 'sub-saharan_africa',
      name: 'Sub-Saharan Africa',
      nodes: [{ id: 'et_actl_m_MAX_m',
                label: 'Actual evapotranspiration',
                effect: '0.514',
                error: '0.543',
                rank: 'b' },
              { id: 'cattle_number_s',
                label: 'Count of livestock cattle',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'spi_3_m',
                label: 'Variation in precipitation patterns over 3-month period',
                effect: '0.393',
                error: '0.568',
                rank: 'a' },
              { id: 'spam_V_agg_t_sum_s',
                label: 'Value (USD) of agriculture',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'yield_gap_maize_s',
                label: 'Gap between observed and potential corn yield',
                effect: '-0.286',
                error: '0.338',
                rank: 'a' },
              { id: 'rurpop_s',
                label: 'Population in rural areas',
                effect: '3.216',
                error: '2.491',
                rank: 'b' },
              { id: 'ndvi_act_min_m',
                label: 'Density of greenness',
                effect: '-0.613',
                error: '0.443',
                rank: 'b' },
              { id: 'acl_sum_evnt_m',
                label: 'Total conflict events',
                effect: nil,
                error: nil,
                rank: 'c' },
              { id: 'acl_sum_fatl_m',
                label: 'Reported fatalities from conflicts',
                effect: nil,
                error: nil,
                rank: 'c' }],
      links: [
        'et_actl_m_MAX_m -> rurpop_s',
        'cattle_number_s -> et_actl_m_MAX_m',
        'cattle_number_s -> rurpop_s',
        'cattle_number_s -> ndvi_act_min_m',
        'spi_3_m -> cattle_number_s',
        'spi_3_m -> spam_V_agg_t_sum_s',
        'spi_3_m -> ndvi_act_min_m',
        'spam_V_agg_t_sum_s -> et_actl_m_MAX_m',
        'spam_V_agg_t_sum_s -> rurpop_s',
        'yield_gap_maize_s -> et_actl_m_MAX_m',
        'yield_gap_maize_s -> cattle_number_s',
        'yield_gap_maize_s -> spam_V_agg_t_sum_s',
        'yield_gap_maize_s -> ndvi_act_min_m',
        'rurpop_s -> ndvi_act_min_m',
        'rurpop_s -> acl_sum_evnt_m',
        'ndvi_act_min_m -> acl_sum_evnt_m',
        'acl_sum_evnt_m -> acl_sum_fatl_m',

      ],
    }
  end
end
