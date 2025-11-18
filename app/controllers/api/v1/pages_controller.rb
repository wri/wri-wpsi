class Api::V1::PagesController < Api::BaseController
  def index
    render json: group_pages_by_menu.to_json
  end

  private

  def group_pages_by_menu
    pages_by_menu = {}

    Page.all.each do |page|
      menu_key = page.menu.presence || 'none'
      pages_by_menu[menu_key] ||= []

      pages_by_menu[menu_key] << {
        name: page.name,
        slug: page.url_path,
        sort_priority: page.sort_priority
      }
    end

    # Sort pages within each menu group by sort_priority
    pages_by_menu.each do |menu, pages|
      pages_by_menu[menu] = pages.sort_by { |page| page[:sort_priority] || 0 }
    end

    pages_by_menu
  end
end
