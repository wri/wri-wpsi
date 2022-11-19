class CausalModelRegionGenerator
  def perform(path: 'app/javascript/images/regions/causal_graphs')
    regions.each do |region|
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
    raise unless system(cmd)
  end

  def generate_gv(region)
    <<~GV
      # generated file for region: #{region[:id]}
      strict digraph causalModel {
        nodesep = 0.4;
        concentrate = true;
        edge[arrowsize = 1.2, penwidth = 2 ];

        # links
        #{
          region[:links].map do |link|
            "#{link};\n"
          end
        }
        #{
          region[:nodes].map do |_node|
            "#{link};\n"
          end
        }
        # nodes
      }
    GV
  end

  def render_gv_node(node)
    (id, label, rank, effect, error, significance) = node.values_at(
      :id, :label, :rank, :effect, :error, :significance
    ).map(&:presence)
    details = []
    %i[effect error significance].each do |key|
      value = node[key]
      details.push("<tr><td>#{key}: #{value}</td></tr>") if value
    end

    if details.any?
      details_table = <<~GV
        |
        <table border="0" cellspacing="1" cellpadding="0">
          #{details.join("\n")}
        </table>
      GV
    end

    <<~GV
      #{id} [label = <{<table align='center' border="0" cellspacing="0.5" cellpadding="0">
        <tr><td ><b>#{label || id}</b></td></tr>
        </table>
        #{details_table}
        }>]
    GV
  end

  def regions
    [
      east_asia,
    ]
  end

  def east_asia
    {
      id: 'east_asia_and_pacific',
      nodes: [
        { id: 'Cropland2000_mean_percent_s',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'acl_sum_evnt_m',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'acl_sum_fatl_m',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'et_actl_m_MIN_m',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'loccount_y',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'locdensity_y',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'rurpop_s',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'spam_P_i_sum_s',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
        { id: 'yield_gap_rice_s',
          rank: 'b',
          label: '',
          effect: nil,
          error: nil,
          significance: nil },
      ],
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
