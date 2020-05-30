Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :lists do
        member do
          get :products
        end
      end
      resources :products do
        collection do
          get :in_products
          get :out_products
          get :products_not_in_list
          put :refresh_list
        end
      end
      resources :categories
      resources :product_names
    end
  end

  match '*path', to: 'pages#home', via: :all
end
