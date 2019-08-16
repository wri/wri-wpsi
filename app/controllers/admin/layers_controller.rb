class Admin::LayersController < Admin::BaseController
  before_action :set_layer, only: %i[show edit update destroy]

  def index
    @layers = Layer.all
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
    redirect_to admin_layers_url, notice: 'Layer was successfully destroyed.'
  end

  private

  def set_layer
    @layer = Layer.find(params[:id])
  end

  def layer_params
    params.require(:layer).permit(
      :name,
      :description,
      :layer_id,
      :dataset_id,
      :published,
      :category,
    )
  end
end
