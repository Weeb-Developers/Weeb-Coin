# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = [
    {
        email: 'testing@test.com',
        password: 'testing123',
        password_confirmation: 'testing123',
        username: "tester123"
    }
]

users.each do |attribute|
    User.create attribute
end



coins = [
{ 
    name:"bitcoin",
symbol:"BTC",
price:50000.5,
volume_24h: 100000000.25,
market_cap: 875619097423.4,
last_updated: "2013-04-28T00:00:00.000Z",
total_supply: 21000000,
logo: "data:image/jpeg;base64,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"

},

{ 
    name:"Ethereum",
symbol:"ETH",
price:3600.5,
volume_24h: 200000.25,
market_cap: 400619097429.4,
last_updated: "2018-09-28T00:00:00.000Z",
total_supply: 21000000,
logo: "data:image/jpeg;base64,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"

},
{ 
    name:"Doge",
symbol:"DOG",
price:0.30,
volume_24h: 400000.25,
market_cap: 40619097429.4,
last_updated: "2021-09-01T00:00:00.000Z",
total_supply: 31000000,
logo: "data:image/jpeg;base64,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"

}

]

coins.each do |attribute|
    Coin.create attribute
end


Portfolio.create user_id: User.first.id, coin_id: Coin.first.id, initial_quantity: 0, current_quantitiy: 0
Portfolio.create user_id: User.first.id, coin_id: Coin.second.id, initial_quantity: 0, current_quantitiy: 0

