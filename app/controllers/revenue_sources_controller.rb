class RevenueSourcesController < ApplicationController

  def index
    @sources = RevenueSource.all
  end

  def new
    @source = RevenueSource.new
  end

  def create
    _params = revenue_source_params
    RevenueSource.create(_params)
    flash[:notice] = "Added #{_params[:name]}."
    redirect_to revenue_sources_path
  end

  private
    def revenue_source_params
      params.require(:revenue_source).permit(:name)
    end

end
