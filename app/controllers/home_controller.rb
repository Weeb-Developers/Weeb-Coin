class HomeController < ApplicationController
    def fetchAPI
        apiKey = ENV["API_KEY"]
        data = HTTParty.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY='+apiKey)
        render json: data
    end
end
