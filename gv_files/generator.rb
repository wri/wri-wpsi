class CausalModelRegionGenerator
  def perform(path: 'app/javascript/images/regions/causal_graphs')
    regions.each do |region|
      puts "region #{region[:id]} "
      gv = generate_gv(region)
      gv_path = root = Rails.root.join(path, "#{region[:id]}.gv")
      File.open(gv_path, 'w') { |file| file.write(gv) }
      svg_path = root = Rails.root.join(path, "#{region[:id]}.svg")
      convert_to_svg(gv_path, svg_path)
    end
  end

  protected

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
      node[ shape  =  "Mrecord" , fontsize  =  "10" , fontname  =  "Arial" , margin  =  "0.07,0.05" , penwidth  =  "1.0"];
      edge[arrowsize = 1.2, penwidth = 2 ];

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
    label_str = ApplicationController.helpers.word_wrap(label, line_width: 25, break_sequence: "<br/>")
    title = <<~GV
      <table align='center' border="0" cellspacing="0.5" cellpadding="0.25">
      <tr><td ><b>#{label_str}</b></td></tr>
      </table>
    GV

    details = []
    %i[effect error significance].each do |key|
      value = node[key]
      details.push("<tr><td>#{key}: #{value}</td></tr>") if value
    end

    label = nil
    if details.any?
      details_table = %(<table border="0" cellspacing="1" cellpadding="0.25">#{details.join("\n")}</table>)
      label = "<{#{title}|#{details_table}}>"
    else
      label = "<#{title}>"
    end


    "#{id} [label = #{label}]"
  end

  def regions
    [
      east_asia,
    ]
  end

  def east_asia
    {
      id: 'east_asia_and_pacific',
      nodes: [{:id=>"spam_P_i_sum_s",
        :label=>"Metric tons of irrigated crops produced",
        :effect=>"-0.342",
        :error=>"2.209",
        :rank=>"b"},
       {:id=>"rurpop_s",
        :label=>"Population in rural areas",
        :effect=>"3.303",
        :error=>"2.726",
        :rank=>"b"},
       {:id=>"Cropland2000_mean_percent_s",
        :label=>"Percentage of land that is cropland",
        :effect=>"-0.065",
        :error=>"0.066",
        :rank=>"b"},
       {:id=>"loccount_y",
        :label=>"Total population count",
        :effect=>"1.387",
        :error=>"0.879",
        :rank=>"b"},
       {:id=>"locdensity_y",
        :label=>"Population density",
        :effect=>"0.772",
        :error=>"0.775",
        :rank=>"b"},
       {:id=>"yield_gap_rice_s",
        :label=>"Gap between observed and potential rice yield",
        :effect=>"0.389",
        :error=>"0.162",
        :rank=>"b"},
       {:id=>"et_actl_m_MIN_m",
        :label=>"Actual evapotranspiration",
        :effect=>"-0.464",
        :error=>"0.116",
        :rank=>"b"},
       {:id=>"acl_sum_evnt_m",
        :label=>"Outcome",
        :effect=>nil,
        :error=>nil,
        :rank=>"b"},
       {:id=>"acl_sum_fatl_m",
        :label=>"Reported fatalities from conflict events",
        :effect=>nil,
        :error=>nil,
        :rank=>"c"}],
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
end

CausalModelRegionGenerator.new.perform
