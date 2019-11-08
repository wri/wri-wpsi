class Card
  attr_accessor :title, :desc, :image, :href, :options, :credit
  def initialize(title='', desc='', credit:'', image:'', href:'', options:{})
    self.title = title
    self.desc = desc
    self.image = image
    self.href = href
    self.credit = credit
    self.options = options
  end
end
