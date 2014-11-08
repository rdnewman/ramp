class CreateRevenueSources < ActiveRecord::Migration
  def change
    create_table :revenue_sources do |t|
      t.string :name
      t.timestamps
    end
  end
end
