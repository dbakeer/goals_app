class GoalsController < ApplicationController

  before_action :require_current_user
  skip_before_action :verify_authenticity_token, only: :destroy

  def index
    @goals = current_user.goals
  end

  def create
    @goal = current_user.goals.new(goal_params)

    if @goal.save
    end
  end


  def edit
    @goal = Goal.find(params[:id])
  end

  def update
    @goal = Goal.find(params[:id])
    @goal.update(goal_params)
  end

  def show
    @goal = Goal.find(params[:id])
  end

  def destroy
    @goal = Goal.find(params[:id])
    @goal.destroy!
  end

  private

  def goal_params
    params.require(:goal).permit(:description, :type, :id)
  end
end
