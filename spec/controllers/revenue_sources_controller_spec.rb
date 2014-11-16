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

  describe "'PUT' update" do

    let(:source) { FactoryGirl.create(:revenue_source) }

    it 'succeeds if well formed input and returns to list' do
      Rails.logger.info 'succeeds if well formed input and returns to list'
      _params = { name: 'different' }
      put :update, id: source.id, revenue_source: _params
      expect(response).to redirect_to revenue_sources_path
    end

    it 'fails with error if no input supplied' do
      Rails.logger.info 'fails with error if no input supplied'
      expect {
        put :update, id: source.id, revenue_source: nil
      }.to raise_error ActionController::ParameterMissing
    end

    it 'returns to list if missing name parameter' do
      Rails.logger.info 'returns to list if missing name parameter'
      _params = {b: 'something'}
      put :update, id: source.id, revenue_source: _params
      expect(response).to redirect_to revenue_sources_path
    end

  end

end
