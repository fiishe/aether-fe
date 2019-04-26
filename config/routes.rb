Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "users#index"

  get 'login', to: 'users#login'
  get 'login/callback', to: 'users#callback'
  resources :users, only: [:index]

  namespace 'api' do
    namespace 'v1' do
      resources 'campaigns', only: [:index, :show]

      get 'users/me', to: 'users#me'
      resources 'users', only: [:show]

      get '*path', to: 'errors#not_found'
    end
  end

  if Rails.env.development?
    get 'dev/pry', to: 'dev#pry'
    get 'dev/login/:id', to: 'dev#login'
  end

  get '*path', to: 'users#index'
end
