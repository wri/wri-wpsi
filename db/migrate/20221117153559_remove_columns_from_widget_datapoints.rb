class RemoveColumnsFromWidgetDatapoints < ActiveRecord::Migration[5.2]
  def up # rubocop:disable Metrics/MethodLength
    [
      'age_0-14',
      'age_15-24',
      'age_25-64',
      'agreements_binary_12m',
      'battles_binary_12m',
      'buffalo_number',
      'bwd',
      'cattle_number',
      'chicken_number',
      'Cropland2000_mean_percent',
      'duck_number',
      'EG-ELC-LOSS-ZS',
      'EG-IMP-CONS-ZS',
      'elect_dist_loss',
      'energy_all',
      'eng_cons_pcap',
      'eng_cons_pgdp',
      'GID_2',
      'goat_number',
      'horse_number',
      'IC-FRM-OUTG-ZS',
      'natpop',
      'peaceful_protests_riots_binary_12m',
      'pig_number',
      'reign',
      'remote_violence_binary_12m',
      'sex_0-14',
      'sex_15-24',
      'sheep_number',
      'SI.POV.DDAY',
      'SI.POV.UMIC',
      'spam_P_i_ws',
      'spam_P_r_sum',
      'spam_V_agg_t_sum',
      'swe_area',
      'v2x_corr',
      'v2x_execorr',
      'violence_against_civilians_binary_12m',
      'violent_protests_riots_binary_12m',
      'water_all',
      'wspowerprd',
    ].each do |table_name|
      change_table :widget_datapoints do |t|
        t.remove table_name
      end
    end
  end

  def down # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    change_table :widget_datapoints do |t| # rubocop:disable Metrics/BlockLength
      t.decimal 'age_0-14'
      t.decimal 'age_15-24'
      t.decimal 'age_25-64'
      t.binary 'agreements_binary_12m'
      t.binary 'battles_binary_12m'
      t.string 'buffalo_number'
      t.decimal 'bwd'
      t.string 'cattle_number'
      t.string 'chicken_number'
      t.string 'Cropland2000_mean_percent'
      t.string 'duck_number'
      t.string 'EG-ELC-LOSS-ZS'
      t.string 'EG-IMP-CONS-ZS'
      t.string 'elect_dist_loss'
      t.string 'energy_all'
      t.string 'eng_cons_pcap'
      t.string 'eng_cons_pgdp'
      t.string 'GID_2'
      t.string 'goat_number'
      t.string 'horse_number'
      t.string 'IC-FRM-OUTG-ZS'
      t.decimal 'natpop'
      t.binary 'peaceful_protests_riots_binary_12m'
      t.string 'pig_number'
      t.decimal 'reign'
      t.binary 'remote_violence_binary_12m'
      t.decimal 'sex_0-14'
      t.decimal 'sex_15-24'
      t.string 'sheep_number'
      t.decimal 'SI.POV.DDAY'
      t.decimal 'SI.POV.UMIC'
      t.string 'spam_P_i_ws'
      t.string 'spam_P_r_sum'
      t.decimal 'spam_V_agg_t_sum'
      t.string 'swe_area'
      t.decimal 'v2x_corr'
      t.decimal 'v2x_execorr'
      t.binary 'violence_against_civilians_binary_12m'
      t.binary 'violent_protests_riots_binary_12m'
      t.string 'water_all'
      t.string 'wspowerprd'
    end
  end
end
