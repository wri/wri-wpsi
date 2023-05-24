class Admin::TagsController < Admin::BaseController
  before_action :set_tag, only: %i[destroy]

  def index
    @tags = Tag.all
  end

  def new
    @tag = Tag.new
  end

  def create
    @tag = Tag.new(team_member_params)

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

  private

  def set_tag
    @tag = Tag.find(params[:id])
  end

  def team_member_params
    params.require(:tag).permit(
      :name
    ).to_h
  end
end
