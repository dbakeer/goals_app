json.steps(@steps) do |step|
  json.id step.id
  json.step step.step
  json.created_at step.created_at
end
