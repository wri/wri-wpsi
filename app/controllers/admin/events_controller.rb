class Admin::EventsController < Admin::BaseController
  before_action :set_event, only: %i[show edit update destroy]

  def index
    @events = Event.ordered_by_start_date
  end

  def new
    @event = Event.new
  end

  def show; end

  def edit; end

  def update
    if @event.update(event_params)
      redirect_to [:admin, @event], notice: 'The event was successfully updated.'
    else
      render :edit
    end
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      redirect_to admin_events_url, notice: 'Event was successfully created.'
    else
      render :new, notice: 'Event could not be created'
    end
  end

  def destroy
    if @event.destroy
      redirect_to admin_events_url, notice: 'The event was successfully deleted.'
    else
      redirect_to admin_events_url, notice: 'The event could not be deleted.'
    end
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
    ).to_h
  end

  def event_params
    params.require(:event).permit(
      :title,
      :start,
      :ends,
      :location,
      :link
    ).to_h
  end
end
