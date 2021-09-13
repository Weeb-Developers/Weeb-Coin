class PortfoliosController < ApplicationController
    before_action :authenticate_user!
    def index
        portfolios = current_user.portfolios
        render json: portfolios.as_json(include: [:coin, :user])
    end

    def create
        portfolio = current_user.portfolios.create(portfolio_params)
        if portfolio.valid?
            render json: portfolio
        else
            render json: portfolio.errors, status: 422
        end
    end

    private
    def portfolio_params
        params.require(:portfolio).permit(:current_quantitiy, :initial_quantity, :coin_id)
      end
end
