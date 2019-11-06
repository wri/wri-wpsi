class Card
  attr_accessor :title, :desc, :image, :href, :options
  def initialize(title='', desc='', image='', href='', options={})
    self.title = title
    self.desc = desc
    self.image = image
    self.href = href
    self.options = options
  end
end
