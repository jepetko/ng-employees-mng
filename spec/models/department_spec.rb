require 'rails_helper'

RSpec.describe Department, :type => :model do
  before(:each) do
    @dep = FactoryGirl.create(:department)
    @dep_with_employees = FactoryGirl.create(:department_with_employees)
    @invalid_dep = Department.new
  end

  it 'should have a name' do
    expect(@dep).to respond_to(:name)
  end

  it 'should have employees' do
    expect(@dep).to respond_to(:employees)
  end

  it 'is invalid when name is empty' do
    expect(@invalid_dep).to be_invalid
    expect(@invalid_dep.errors[:name]).to include('can\'t be blank')
  end

  it 'should reference employees' do
    expect(@dep_with_employees.employees).not_to be_empty
    expect(@dep_with_employees.employees.count).to be(5)
  end
end
