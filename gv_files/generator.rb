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
    doc.root['preserveAspectRatio']="xMinYMin"
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
                rank: 'b' },
              { id: 'chicken_number_s',
                label: 'Count of livestock chickens',
                effect: '-0.201',
                error: '0.081',
                rank: 'b' },
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
end

CausalModelRegionGenerator.new.perform
