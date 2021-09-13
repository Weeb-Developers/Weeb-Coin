class Portfolio < ApplicationRecord
    belongs_to :user
    belongs_to :coin
    validates :coin_id, uniqueness: {scope: :user_id}
end
