class Admin::LayersController < Admin::BaseController
  before_action :set_layer, only: %i[show edit update destroy]

  def index
    @layers = Layer.order(:name, :id)
  end

  def show; end

  def new
    @layer = Layer.new
  end

  def edit; end

  def create
    @layer = Layer.new(layer_params)

    if @layer.save
      redirect_to [:admin, @layer], notice: 'Layer was successfully created.'
    else
      render :new
    end
  end

  def update
    if @layer.update(layer_params)
      redirect_to [:admin, @layer], notice: 'Layer was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @layer.destroy
    redirect_to admin_layers_url, notice: 'Layer was successfully deleted.'
  end

  private

  def set_layer
    @layer = Layer.find(params[:id])
  end

  def layer_params # rubocop:disable Metrics/MethodLength
    params.require(:layer).permit(
      :name,
      :short_description,
      :long_description,
      :layer_id,
      :dataset_id,
      :source_name,
      :source_url,
      :source_description,
      :widget_spec,
      :published,
      :primary,
      category_ids: [],
    )
  end
end
