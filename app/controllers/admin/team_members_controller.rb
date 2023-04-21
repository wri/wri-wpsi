class Admin::TeamMembersController < Admin::BaseController
  before_action :set_team_member, only: %i[show edit update destroy]
  before_action :set_image_url_options, only: %i[edit update new create]

  def index
    @team_members = TeamMember.all
  end

  def new
    @team_member = TeamMember.new
  end

  def show; end

  def edit; end

  def update
    @team_member.tags = Tag.where(id: params[:tags][:tag_id].map(&:to_i))
    if @team_member.update(team_member_params)
      redirect_to [:admin, @team_member], notice: 'News item was successfully updated.'
    else
      render :edit
    end
  end

  def create
    @team_member = TeamMember.new(team_member_params)
    @team_member.tags = Tag.where(id: params[:tags][:tag_id].map(&:to_i))

    if @team_member.save
      redirect_to admin_team_members_url, notice: 'Team member was successfully created.'
    else
      render :new, notice: 'Team member could not be created'
    end
  end

  def destroy
    if @team_member.destroy
      redirect_to admin_team_members_url, notice: 'The event was successfully deleted.'
    else
      redirect_to admin_team_members_url, notice: 'The event could not be deleted.'
    end
  end

  private

  def set_team_member
    @team_member = TeamMember.find(params[:id])
  end

  def team_member_params
    params.require(:team_member).permit(
      :name,
      :description,
      :email,
      :profile_image
    ).to_h
  end

  def set_image_url_options
    @image_url_options = FileUpload.all.map do |file_upload|
      [file_upload.description, url_for(file_upload.file)]
    end
  end
end
