class Event < ApplicationRecord
  validates :start, presence: true
  validates :ends, presence: true
  validates :title, presence: true
  validates :location, presence: true
  validate :end_time_should_be_in_future, on: :create
  validate :start_time_should_be_in_future, on: :create
  validate :end_time_should_be_later_than_starts

  scope :ordered_by_start_date, -> { order(start: :asc) }

  def time
    if (ends - start)/3600 > 22  # if time difference > 22 hrs
      start.strftime('%b %d') + ' - ' + ends.strftime('%b %d')
    else
      start.strftime('%-l:%M') + ' - ' + ends.strftime('%-l:%M%P')
    end
  end

  def start_time_should_be_in_future
    errors.add(:start, 'start must be in future') if start && start < Time.current
  end

  def end_time_should_be_in_future
    errors.add(:ends, 'end must be in future') if ends && ends < Time.current
  end

  def end_time_should_be_later_than_starts
    errors.add(:ends, 'must be after start time') if ends && start && ends < start
  end
end
