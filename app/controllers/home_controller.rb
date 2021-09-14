class HomeController < ApplicationController
    def fetchAPI
        data = HTTParty.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=c16d4400-270c-4fe3-87c1-9292a3f03cfe')
        render json: data
    end

end
