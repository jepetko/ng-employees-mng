FactoryGirl.define do
  factory :employee do
    name 'Hansi'
    surname 'Huber'
    ranking 50
    before :create do |e|
      FactoryGirl.create :department, :employees => [e]
    end
  end
end
