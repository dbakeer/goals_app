class Step < ActiveRecord::Base
  validates :step, presence: true
  validates :goal, presence: true

  belongs_to :goal
  delegate :current_user, to: :goal
end
