Rails.application.routes.draw do
  root to: 'visitors#index'

  resources :departments, only: [:index]
end
