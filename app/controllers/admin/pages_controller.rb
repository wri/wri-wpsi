class Admin::PagesController < Admin::BaseController
  before_action :set_page, only: %i[show edit update destroy]

  def index
    @pages = Page.ordered
  end

  def show; end

  def new
    @page = Page.new
  end

  def edit; end

  def create
    @page = Page.new(page_params)
    set_page_team_members

    if @page.save
      redirect_to [:admin, @page], notice: 'Page was successfully created.'
    else
      render :new
    end
  end

  def update
    set_page_team_members
    if @page.update(page_params)
      redirect_to [:admin, @page], notice: 'Page was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @page.destroy
    redirect_to admin_pages_url, notice: 'Page was successfully deleted.'
  end

  private

  def set_page
    @page = Page.find_by(slug: params[:slug])
  end

  def page_params
    params.require(:page).permit(:name, :slug, :menu, :content, :sort_priority)
  end

  def set_page_team_members
    @page.team_members = TeamMember.where(id: params[:team_members][:team_member_id].map(&:to_i))
  end
end
