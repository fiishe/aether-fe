Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "users#index"

  get 'login', to: 'users#login'
  get 'login/callback', to: 'users#callback'
  resources :users, only: [:index]

  namespace 'api' do
    namespace 'v1' do
      get 'users/me', to: 'users#me'
      get '*path', to: 'errors#not_found'
    end
  end

  get '*path', to: 'users#index'
end
