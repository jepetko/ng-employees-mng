Rails.application.routes.draw do
  root to: 'visitors#index'

  resources :departments, only: [:index]
  resources :employees, except: [:edit]
end
