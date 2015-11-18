class StepsController < ApplicationController

  def create
    goal = Goal.find(params[:goal_id])

    @step = goal.steps.new(step_params)

    if @step.save
    else
      render json: {
        error: {
          message: @step.errors.full_messages.to_sentence
        }
      }
    end
  end

  def show
    goal = Goal.find(params[:goal_id])
    @goal = goal.steps.find(step_params)
  end

  def index
    goal = Goal.find(params[:goal_id])
    @steps = goal.steps
  end

  def edit
    goal = Goal.find(params[:goal_id])
    @step = goal.steps.find(step_params)
  end

  def update
    goal = Goal.find(params[:goal_id])
    @step = goal.steps.find(step_params)
    @step.save(step_params)
  end

  def destroy
    goal = Goal.find(params[:goal_id])
    @step = goal.steps.find(step_params)
    @step.destroy
  end

  private

  def step_params
    params.require(:step).permit(:step)
  end
end
