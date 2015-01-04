require 'spec_helper'

describe DepartmentsController do

  render_views

  before(:each) do
    FactoryGirl.create(:department)
    FactoryGirl.create(:department, name: 'IT')
    FactoryGirl.create(:department, name: 'Accounting')
  end

  describe 'routing' do
    it 'routes to #index' do
      expect({ get: 'departments' }).to route_to( { controller: 'departments', action: 'index'} )
    end
  end

  describe 'get #index' do

    before(:each) do
      request.env['HTTP_ACCEPT'] = 'application/json'
    end

    it 'is successful' do
      get :index, :format => 'json'

      body = response.body
      body =~ /^\[(.*)\]$/
      json = ActiveSupport::JSON.decode(body)
      expect(json).to be_a(Array)

      expect(json.length).to eq( Department.all.count )
    end
  end

end