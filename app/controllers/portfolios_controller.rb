class PortfoliosController < ApplicationController
    before_action :authenticate_user!
    def index
        portfolios = current_user.portfolios
        # byebug
        render json: portfolios.as_json(include: [:coin, :user])
    end
end
