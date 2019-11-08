class AddTermsPage < ActiveRecord::Migration[5.2]
  def up
    Page.create!(
      name: 'Terms of service',
      slug: 'terms_of_service',
      content: '<h1>Terms of Service</h1>',
    )
  end

  def down
    Page.where(slug: 'terms_of_service').destroy_all
  end
end
