Rails.application.routes.draw do
  get '/api-data', to: 'home#fetchAPI'
  resources :portfolios
  resources :coins
  devise_for :users
  get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
  root 'home#index'
  
end
