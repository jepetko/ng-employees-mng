FactoryGirl.define do
  factory :employee do
    name 'Hansi'
    surname 'Huber'
    ranking 50
  end

  factory :random_employee, parent: :employee do
    name Faker::Name.first_name
    surname Faker::Name.last_name
    ranking Random.new.rand(0..100)
  end

  factory :random_employee_with_department, parent: :employee do
    after :create do |e|
      FactoryGirl.create :department, employees: [e]
    end
  end

end
