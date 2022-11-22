class AddCausalModelPages < ActiveRecord::Migration[5.2]
  ROOT = {
    "name": 'Causal Model',
    "slug": 'cm_root',
    "location": '/causal',
    "menu": 'global-tool',
  }.freeze
  PAGES = [
    {
      "name": 'Model: East Asia and Pacific',
      "slug": 'cm_east_asia_and_pacific',
      "location": '/causal/regions/east_asia_and_pacific',
    },
    {
      "name": 'Model: Europe and Central Asia',
      "slug": 'cm_europe_and_central_asia',
      "location": '/causal/regions/europe_and_central_asia',
    },
    {
      "name": 'Model: Latin America and Caribbean',
      "slug": 'cm_latin_america_and_caribbean',
      "location": '/causal/regions/latin_america_and_caribbean',
    },
    {
      "name": 'Model: Middle East and North Africa',
      "slug": 'cm_middle_east_and_north_africa',
      "location": '/causal/regions/middle_east_and_north_africa',
    },
    {
      "name": 'Model: North America',
      "slug": 'cm_north_america',
      "location": '/causal/regions/north_america',
    },
    {
      "name": 'Model: South Asia',
      "slug": 'cm_south_asia',
      "location": '/causal/regions/south_asia',
    },
    {
      "name": 'Model: Sub-Saharan Africa',
      "slug": 'cm_sub-saharan_africa',
      "location": '/causal/regions/sub-saharan_africa',
    },
  ].freeze

  def up
    root = Page.create!(ROOT)
    PAGES.each do |page_attr|
      page = Page.new(page_attr)
      #page.menu = root.slug
      page.menu= 'global-tool'
      page.save!
    end
  end

  def down
    slugs = ([ROOT] + PAGES).map { |r| r.fetch(:slug) }
    slugs.each do |slug|
      Page.where(slug: slug).first.destroy!
    end
  end
end
