Rails.application.routes.draw do
  devise_for :users,
              controllers: {
                sessions: 'users/sessions',
                registrations: 'users/registrations'
              }
  namespace :api do
    namespace :v1 do
      resources :referrals
    end
  end
  get 'home/index'
  get 'referral/:id', to: "home#index"
  get 'home', to: "home#index"
  get 'signup', to: "home#index"


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"
end
