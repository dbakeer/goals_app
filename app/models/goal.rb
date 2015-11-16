class Goal < ActiveRecord::Base
  validates :description, presence: true
  validates :type, presence: true
  validates :completed

  belongs_to :user
  has_many :steps, dependent: :destroy
end
