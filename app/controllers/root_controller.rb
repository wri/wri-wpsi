class RootController < ApplicationController # rubocop:disable Metrics/ClassLength
  include HomePageContent
  layout :resolve_layout
  before_action :set_partner_cards!

  if ENV['HTTP_AUTH_NAME'].present? && ENV['HTTP_AUTH_PASSWORD'].present?
    http_basic_authenticate_with(
      name: ENV['HTTP_AUTH_NAME'],
      password: ENV['HTTP_AUTH_PASSWORD'],
    )
  end

  def index
    setup_cards!
    @news_items = NewsItem.current.limit(4)
    @events = Event.ordered_by_start_date
    set_pages
  end

  def map
    set_pages
    # Let react single page app take over
    @layers = Layer.serialized_for_react_app
    @categories = Category.serialized_for_react_app
  end

  def news
    set_pages
    @news_items = NewsItem.current.limit(12)
  end

  def events
    set_pages
    @events = Event.ordered_by_start_date
  end

  def archive
    set_pages
    @news_items = NewsItem.archived
    @news_items_category_labels = NewsItem.category_labels.reject do |category, _l|
      @news_items.with_category(category).empty?
    end
  end

  # scrollytelling data story
  def causal
    set_pages
    render 'causal_data_story/show'
  end

  # For showing pages with user-defined content
  def show
    set_pages
    @page = Page.find_by(slug: params[:page_slug])
    if helpers.page_redirect_target(@page)
      return redirect_to(helpers.page_redirect_target(@page))
    end
    return redirect_to :map if @page.nil? || @page.contentless?
  end

  def health_check
    render plain: 'OK'
  end

  def notifier_check
    raise 'test error notification'
  end

  def timeout_check
    logger.error 'entering timeout_check and burning CPU till we get killed'
    loop do
      # Spin endlessly
    end
    raise 'should never get here'
  end

  private

  def set_pages
    @pages = Page.top_level
  end

  def resolve_layout
    case action_name
    when 'map'
      'map'
    # when 'show'
    #   # 'cms_pages_style' # TODO: implement new styles for the CMS pages
    #   'website'
    else
      'website'
    end
  end
end
