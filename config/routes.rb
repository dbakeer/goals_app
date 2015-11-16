Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/angular'

  resources :goals, defaults: { format: :json } do
    resources :steps, shallow: true
  end

  resources :users, defaults: { format: :json }


  get '/session' => 'session#current_user', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'
  
end
