Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "users#landing"
  get 'home', to: 'users#home'

  resources :invites, only: [:show]
  get 'invite/:id', to: 'invites#show'
  get 'join/:id', to: 'invites#join'

  resources :users, only: [:index]
  get 'login', to: 'users#login'
  get 'login/callback', to: 'users#callback'
  get 'logout', to: 'users#logout'

  namespace 'api' do
    namespace 'v1' do
      resources :campaigns, only: [:show, :create] do
        resources :users, only: [:index]
        resources :characters, only: [:index, :show]
        resources :invites, only: [:index, :create]
      end
      resources :characters, only: [:index, :show]
      resources :maps, only: [:create]
      resources :users, only: [:show, :update] do
        resources :campaigns, only: [:index]
        resources :characters, only: [:index, :show]
      end

      get '*path', to: 'errors#not_found'
    end
  end

  if Rails.env.development? || Rails.env.test?
    get 'dev/pry', to: 'dev#pry'
    get 'dev/login/:id', to: 'dev#login'
    get 'dev/logout', to: 'dev#logout'
  end

  get '*path', to: 'users#home'
end
