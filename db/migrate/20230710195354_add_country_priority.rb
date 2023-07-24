class AddCountryPriority < ActiveRecord::Migration[5.2]
  def change
    add_column :team_members, :country_priority, :integer, :default => 0
  end
end
