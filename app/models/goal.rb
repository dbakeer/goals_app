class Goal < ActiveRecord::Base
  inheritance_column = :_type_disabled

  goal_types = ['General', 'Health', 'Fitness', 'Personal', 'Professional'];

  validates :description, presence: true
  validates :goal_type, presence: true

  belongs_to :user, class_name: "User", foreign_key: :user_id
  has_many :steps, dependent: :destroy
end
