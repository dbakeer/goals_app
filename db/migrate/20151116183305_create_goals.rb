class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.references :user, index: true, foreign_key: true
      t.string :description, null: false
      t.string :goal_type, null: false
      t.boolean :completed

      t.timestamps null: false
    end

    add_index :goals, :goal_type
  end
end
