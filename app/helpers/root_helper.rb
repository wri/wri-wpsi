module RootHelper
  def page_path page
    "/info/#{page.slug}"
  end
end
