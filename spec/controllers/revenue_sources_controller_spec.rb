require 'rails_helper'

RSpec.describe RevenueSourcesController, type: :controller do

  describe "'GET' index" do
    it 'succeeds on HTML' do
      get :index
      expect(response).to be_success
    end

    it 'succeeds as JSON' do
      xhr :get, :index, format: :json
      expect(response).to be_success
    end
  end

  describe "'GET' new" do
    it 'succeeds' do
      get :new
      expect(response).to be_success
    end
  end

  describe "'POST' create" do
    it 'succeeds if well formed input and returns to list' do
      post :create, revenue_source: FactoryGirl.attributes_for(:revenue_source)
      expect(response).to redirect_to revenue_sources_path
    end

    it 'adds a record if well formed input' do
      expect {
        post :create, revenue_source: FactoryGirl.attributes_for(:revenue_source)
      }.to change{RevenueSource.count}.by(1)
    end

    it 'fails with error if no input supplied' do
      expect {
        post :create, revenue_source: nil
      }.to raise_error ActionController::ParameterMissing
    end

    it 'will not add a record if missing name parameter' do
      _params = {b: 'something'}
      expect {
        post :create, revenue_source: _params
      }.to change{RevenueSource.count}.by(0)
    end

    it 'returns to list if missing name parameter' do
      _params = {b: 'something'}
      post :create, revenue_source: _params
      expect(response).to redirect_to revenue_sources_path
    end

  end


end
