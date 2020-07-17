class AddCrystalIds < ActiveRecord::Migration[6.0]
  include CrystalHelper

  def up
    Campaign.all.each do |campaign|
      crystal = crystal_from_time campaign.created_at, campaign.id
      campaign.update(crystal: crystal)
    end
    Character.all.each do |character|
      crystal = crystal_from_time character.created_at, character.id
      character.update(crystal: crystal)
    end
    Map.all.each do |map|
      crystal = crystal_from_time map.created_at, map.id
      map.update(crystal: crystal)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
