class Admin::TagsController < Admin::BaseController
  before_action :set_tag, only: %i[show edit update destroy]

  def index
    @tags = Tag.ordered_by_name
  end

  def new
    @tag = Tag.new
  end

  def show; end

  def edit; end

  def update
    if @tag.update(tag_params)
      redirect_to [:admin, @tag], notice: 'The Tag was successfully updated.'
    else
      render :edit
    end
  end

  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      redirect_to admin_tags_url, notice: 'The tag was successfully created.'
    else
      render :new, notice: 'The tag could not be created'
    end
  end

  def destroy
    if @tag.destroy
      redirect_to admin_tags_url, notice: 'The event was successfully deleted.'
    else
      redirect_to admin_tags_url, notice: 'The event could not be deleted.'
    end
  end

  def reset_colors
    Tag.ordered_by_name.each_with_index{ | t, index |
      t.tag_color = color_by_index(index)
      t.save
    }
    redirect_to admin_tags_url, notice: 'Tag colors have been redefined'
  end

  private

  def color_by_index(index)
    tag_colors = ['#2e3348', '#437387', '#5f9f7c', '#84b65b', '#673320']
    tag_colors[index%tag_colors.length]
  end

  def set_tag
    @tag = Tag.find(params[:id])
  end

  def tag_params
    params.require(:tag).permit(
      :name,
      :tag_color
    ).to_h
  end
end
