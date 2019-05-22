Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "users#landing"
  get 'home', to: 'users#home'

  get 'login', to: 'users#login'
  get 'login/callback', to: 'users#callback'
  # get 'login/refresh', to: 'users#refresh_callback'
  resources :users, only: [:index]

  namespace 'api' do
    namespace 'v1' do
      resources 'campaigns', only: [:index, :show, :create]
      resources 'users', only: [:show] do
        resources 'campaigns', only: [:index]
      end

      get '*path', to: 'errors#not_found'
    end
  end

  if Rails.env.development? || Rails.env.test?
    get 'dev/pry', to: 'dev#pry'
    get 'dev/login/:id', to: 'dev#login'
    get 'dev/logout', to: 'dev#logout'
  end

  get '*path', to: 'users#not_found'
end
