json.goal do
  json.id @goal.id
  json.goal_type @goal.goal_type
  json.description @goal.description
  json.created_at @goal.created_at
  json.steps []
end
