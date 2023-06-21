# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts '================================================ Creating Users ================================================='

def create_user(email, password = '123456')
  user = User.where(email: email).first_or_initialize
  user.password = password
  user.save!

  user
end

create_user('carloshdelreal@gmail.com')