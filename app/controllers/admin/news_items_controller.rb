class Admin::NewsItemsController < Admin::BaseController
  before_action :set_news_item, only: %i[show edit update]

  def index
    @news_items = NewsItem.all
  end

  def show; end

  def edit
    @options = {
      order: %i[month year],
      prompt: { month: 'Select month', year: 'Select year' },
      start_year: Time.zone.today.year,
      end_year: Time.zone.today.year - 100,
    }
  end

  def update
    if @news_item.update(news_item_params)
      redirect_to [:admin, @news_item], notice: 'News item was successfully updated.'
    else
      render :edit
    end
  end

  private

  def set_news_item
    @news_item = NewsItem.find(params[:id])
  end

  def news_item_params
    params.require(:news_item).permit(
      :title,
      :description,
      :article_url,
      :image_url,
      :image_alt_text,
      :date,
    )
  end
end
