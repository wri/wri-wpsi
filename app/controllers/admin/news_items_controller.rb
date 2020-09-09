class Admin::NewsItemsController < Admin::BaseController
  before_action :set_news_item, only: %i[show edit update]

  # GET /news_items
  def index
    @news_items = NewsItem.all
  end

  # GET /news_items/1
  def show; end

  # GET /news_items/new
  # def new
  #   @news_item = NewsItem.new
  # end

  # GET /news_items/1/edit
  def edit; end

  # POST /news_items
  # def create
  #   @news_item = NewsItem.new(news_item_params)

  #   if @news_item.save
  #     redirect_to @news_item, notice: 'News item was successfully created.'
  #   else
  #     render :new
  #   end
  # end

  # PATCH/PUT /news_items/1
  def update
    if @news_item.update(news_item_params)
      redirect_to [:admin, @news_item], notice: 'News item was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /news_items/1
  # def destroy
  #   @news_item.destroy
  #   redirect_to news_items_url, notice: 'News item was successfully destroyed.'
  # end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_news_item
    @news_item = NewsItem.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def news_item_params
    params.require(:news_item).permit(
      :title,
      :description,
      :article_url,
      :image_url,
      :image_alt_text,
    )
  end
end
