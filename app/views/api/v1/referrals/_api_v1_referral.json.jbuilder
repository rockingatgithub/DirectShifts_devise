json.extract! api_v1_referral, :id, :toEmail, :fromEmail, :referralLink, :created_at, :updated_at
json.url api_v1_referral_url(api_v1_referral, format: :json)
