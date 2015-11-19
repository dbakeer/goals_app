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
    @step = Step.find(params[:id])
  end

  def index
    goal = Goal.find(params[:goal_id])
    @steps = goal.steps
  end

  def edit
    @step = Step.find(params[:id])
    @step.update(step_params)
  end

  def update
    @step = Step.find(params[:id])
    @step.update(step_params)
    @step.save(step_params)
  end

  def destroy
    @step = Step.find(params[:id])
    @step.destroy!

    respond_to do |format|
      format.json {
        render json: @step
      }
    end
  end

  private

  def step_params
    params.require(:step).permit(:step)
  end
end
