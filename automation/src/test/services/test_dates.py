import unittest
from automation.src.services.dates import prev_month

class TestDates(unittest.TestCase):
  def test_prev_month(self):
    self.assertEqual(prev_month(12, -1), 11)
    self.assertEqual(prev_month(1, -2), 11)
    self.assertEqual(prev_month(11, 2), 1)
    self.assertEqual(prev_month(12, 1), 1)
    self.assertEqual(prev_month(1, 3), 4)

if __name__ == '__main__':
  unittest.main()