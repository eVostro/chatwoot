class AddDefaultValueToColor < ActiveRecord::Migration[6.0]
  def up
    Label.where(color: nil).find_each { |u| u.update(color: '#676FF4') }

    change_column :labels, :color, :string, default: '#676FF4', null: false
  end

  def down
    change_column :labels, :color, :string, default: nil, null: true
  end
end
