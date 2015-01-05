FactoryGirl.define do
  factory :department do
    name 'Marketing'
  end

  factory :department_with_employees, parent: :department do
    name 'Marketing'
    after :create do |d|
      FactoryGirl.create_list :random_employee, 5, :department => d
    end
  end

end
