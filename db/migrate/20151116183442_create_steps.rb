class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.references :goal, index:true, foreign_key:true
      t.string :step
      t.boolean :completed

      t.timestamps null: false
    end
  end
end
