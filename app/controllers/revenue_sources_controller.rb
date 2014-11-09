class RevenueSourcesController < ApplicationController
  respond_to :html, :json, only: [:index]

  def index
    respond_with do |format|
      format.html { render }
      format.json { render json: RevenueSource.all }
    end
  end

  def new
    @source = RevenueSource.new
  end

  def create
    _params = revenue_source_params
    begin
      RevenueSource.create(_params)
      flash[:success] = "Added #{_params[:name]}."
    rescue StandardError => e
      Rails.logger.error "[RevenueSourcesController#create] failed, error = #{e.inspect}"
      flash[:error] = "Unable to add #{_params[:name]}."
    end
    redirect_to revenue_sources_path
  end

  private
    def revenue_source_params
      params.require(:revenue_source).permit(:name)
    end

end
