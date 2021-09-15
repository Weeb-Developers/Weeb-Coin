class CoinsController < ApplicationController
    def fetchAPI
        apiKey = ENV["API_KEY"]
        apiData = HTTParty.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apiKey)
        apiLogo = HTTParty.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=' + apiKey)
        render json: apiLogo
        coins = Coin.all
        # coins.create(name: apiData.data.name, symbol: apiData.data.symbol, price: apiData.data.quote.USD.price, volume_24h: apiData.data.quote.USD.volume_24h, market_cap: apiData.data.quote.USD.market_cap, last_updated: apiData.data.quote.USD.last_updated, total_supply: apiData.data.total_supply, logo: )
    end

   
    def index
        coins = Coin.all
        render json: coins
    end



end
