class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.references :user, index: true, foreign_key: true
      t.string :description
      t.string :type
      t.boolean :completed

      t.timestamps null: false
    end
  end
end
