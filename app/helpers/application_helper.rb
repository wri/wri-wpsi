module ApplicationHelper
  def direct_page_path(page)
    page.redirect_target || page_path(page)
  end
end
