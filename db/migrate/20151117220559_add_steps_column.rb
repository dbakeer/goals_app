class AddStepsColumn < ActiveRecord::Migration
  def change
    add_column :goals, :steps, :string
    add_index :goals, :steps
  end
end
