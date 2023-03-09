class CreateApiV1Referrals < ActiveRecord::Migration[7.0]
  def change
    create_table :api_v1_referrals do |t|
      t.string :toEmail
      t.string :fromEmail
      t.string :referralLink

      t.timestamps
    end
  end
end
