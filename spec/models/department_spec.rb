require 'rails_helper'

RSpec.describe Department, :type => :model do
  before(:each) do
    @dep = FactoryGirl.create(:department)
  end

  it 'should have a name' do
    @dep.should respond_to(:name)
  end
end
