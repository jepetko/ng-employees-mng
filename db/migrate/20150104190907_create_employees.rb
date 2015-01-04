class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :name
      t.string :surname
      t.integer :ranking
      t.integer :department_id

      t.timestamps null: false
    end
  end
end
