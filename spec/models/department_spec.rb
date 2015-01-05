require 'rails_helper'

RSpec.describe Department, :type => :model do
  before(:each) do
    @dep = FactoryGirl.create(:department)
    @invalid_dep = Department.new
  end

  it 'should have a name' do
    expect(@dep).to respond_to(:name)
  end

  it 'is invalid when name is empty' do
    expect(@invalid_dep).to be_invalid
    expect(@invalid_dep.errors[:name]).to include('can\'t be blank')
  end
end
