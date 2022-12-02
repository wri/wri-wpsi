module ApplicationHelper

  def page_redirect_target(page)
    return nil unless page

    page.redirect_target ? url_for(page.redirect_target) : page.location.presence
  end

  def direct_page_path(page)
    page_redirect_target(page) || page_path(page)
  end

end
