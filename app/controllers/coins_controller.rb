class CoinsController < ApplicationController
    def fetchAPI
        api_key = ENV["API_KEY"]
        api_coin_data = HTTParty.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + api_key)['data']

        api_coin_data.each do |coin_data|
          create_or_update_coin(coin_data)
        end
        render json: api_coin_data
    end

    def index
        coins = Coin.all
        render json: coins
    end

    private
    def create_or_update_coin(coin_data)
      #find coin
      #if coin exists- update
      #if coin does not exist- create
      coin = Coin.find_by(symbol: coin_data['symbol'])
      if coin
        coin.update(
          price: coin['quote']['USD']['price'],
          volume_24h: coin['quote']['USD']['volume_24h'],
          market_cap: coin['quote']['USD']['market_cap'],
          total_supply: coin['total_supply'],
          last_updated: coin['last_updated']
        )
      else
        Coin.create(
          name:
        )
      # byebug if coin_data['symbol'] == 'ADA'
    end
    # coins.create(name: apiData.data.name, symbol: apiData.data.symbol, price: apiData.data.quote.USD.price, volume_24h: apiData.data.quote.USD.volume_24h, market_cap: apiData.data.quote.USD.market_cap, last_updated: apiData.data.quote.USD.last_updated, total_supply: apiData.data.total_supply, logo: )

end
