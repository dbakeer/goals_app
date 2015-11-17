json.user current_user.email

json.goals(@goals) do |goal|
  json.id goal.id
  json.goal_type goal.goal_type
  json.description goal.description
  json.created_at goal.created_at

  json.steps(goal.steps) do |step|
    json.id step.id
    json.step goal.step
  end
end
