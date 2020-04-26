class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.integer :category_id
      t.integer :list_id
      t.integer :product_name_id

      t.timestamps
    end
  end
end
