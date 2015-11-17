json.goal do
  json.id @goal.id
  json.type @goal.type
  json.description @goal.description
  json.created_at @goal.created_at
  json.steps @goal.steps
end
