class Admin::NewsItemsController < Admin::BaseController
  before_action :set_news_item, only: %i[show edit update destroy]
  before_action :set_date_options, only: %i[edit update new create]
  before_action :set_image_url_options, only: %i[show edit update new create]

  def index
    @news_items = NewsItem.all
  end

  def show; end

  def edit; end

  def new
    @news_item = NewsItem.new
  end

  def create
    @news_item = NewsItem.new(news_item_params)

    if @news_item.save
      redirect_to [:admin, @news_item], notice: 'News item was successfully created.'
    else
      render :new
    end
  end

  def update
    if @news_item.update(news_item_params)
      redirect_to [:admin, @news_item], notice: 'News item was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @news_item.destroy
    redirect_to admin_news_items_url, notice: 'News item was successfully deleted.'
  end

  private

  def set_news_item
    @news_item = NewsItem.find(params[:id])
  end

  def set_date_options
    @date_options = {
      order: %i[month year],
      prompt: { month: 'Select month', year: 'Select year' },
      start_year: Time.zone.today.year,
      end_year: Time.zone.today.year - 10,
    }
  end

  def set_image_url_options
    @image_url_options = FileUpload.all.map do |file_upload|
      [file_upload.description, url_for(file_upload.file)]
    end
  end

  def news_item_params
    params.require(:news_item).permit(
      :title,
      :description,
      :article_url,
      :image_url,
      :image_alt_text,
      :date,
      :published,
      categories: [],
    )
  end
end
