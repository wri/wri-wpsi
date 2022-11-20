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
      .rankC.node text {
        fill: #000;
      }
      .node polyline {
        stroke: #fff;
      }
      .rankA path {
        fill: #292a40;
      }
      .rankB path {
        fill: #4a6e81;
      }
      .rankC path {
        fill: #73b85f;
      }
      .edge path {
        stroke: #666;
      };
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

  def generate_gv(region)
    <<~GV
      # generated file for region: #{region[:id]} by #{self.class.name}
      strict digraph causalModel {
      nodesep = 0.4;
      concentrate = true;
      node[shape = Mrecord, fontname = "Helvetica, Arial, sans-serif", margin = "0.07,0.05", penwidth = 1.0];
      edge[arrowsize = 1.2, penwidth = 2];
      ranksep=1;

      # links
      #{
        region[:links].map do |link|
          "#{link};"
        end.join("\n")
      }
      # nodes
      #{
        region[:nodes].map do |node|
          "#{render_gv_node(node)};"
        end.join("\n")
      }
      }
    GV
  end

  def render_gv_node(node)
    (id, label, rank, effect, error, significance) = node.values_at(
      :id, :label, :rank, :effect, :error, :significance
    ).map(&:presence)

    raise node.inspect if id.blank? || label.blank?

    label_str = ApplicationController.helpers.word_wrap(label, line_width: 25, break_sequence: '<br/>')
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
                error: '0.066',
                rank: 'a' },
              { id: 'loccount_y',
                label: 'Total population count',
                effect: '1.387',
                error: '0.879',
                rank: 'b' },
              { id: 'locdensity_y',
                label: 'Population density',
                effect: '0.772',
                error: '0.775',
                rank: 'b' },
              { id: 'yield_gap_rice_s',
                label: 'Gap between observed and potential rice yield',
                effect: '0.389',
                error: '0.162',
                rank: 'b' },
              { id: 'et_actl_m_MIN_m',
                label: 'Actual evapotranspiration',
                effect: '-0.464',
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

  # east_asia_and_pacific.png    latin_america_and_caribbean.png   north_america.png  sub-saharan_africa.png
  # europe_and_central_asia.png  middle_east_and_north_africa.png  south_asia.png

  def europe
    {
      id: 'europe_and_central_asia',
      nodes: [{ id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration patterns',
                effect: nil,
                error: nil,
                rank: 'a' },
              { id: 'chicken_number_s',
                label: 'Count of livestock chickens',
                effect: '-0.201',
                error: '0.081',
                rank: 'a' },
              { id: 'yield_gap_barley_s',
                label: 'Gap between observed and potential barley yield',
                effect: '-0.224',
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
                error: '0.072',
                rank: 'b' },
              { id: 'loccount_y',
                label: 'Total population count',
                effect: '2.366',
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
      nodes: [{ id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration patterns',
                effect: '-0.032',
                error: '0.044',
                rank: 'b' },
              { id: 'chicken_number_s',
                label: 'Count of livestock chickens',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'spi_3_m',
                label: 'Variation of precipitation over 3-month period',
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
      nodes: [{ id: 'rurratio_s',
                label: 'Percentage of population that live in rural areas',
                effect: '-2.086',
                error: '0.244',
                rank: 'b' },
              { id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration patterns',
                effect: nil,
                error: nil,
                rank: 'b' },
              { id: 'ndvi_act_min_m',
                label: 'Density of greenness',
                effect: '-0.176',
                error: '0.125',
                rank: 'b' },
              { id: 'spi_3_m',
                label: 'Variation of precipitation over 3-month period',
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
    { id: 'south_asia',
      nodes: [{ id: 'et_anom_m_STD_m',
                label: 'Variation in evapotranspiration patterns',
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
                label: 'Precipitation anomalies over a 1-month',
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
      ] }
  end

  def sub_saharan_africa
    {
      id: 'sub-saharan_africa',
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

CausalModelRegionGenerator.new.perform
