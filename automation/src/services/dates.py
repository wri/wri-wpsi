

def prev_month(month, delta):
    """
    Calculate the previous month based on the given month and delta.
    Args:
      month (int): The current month as an integer (1-12).
      delta (int): The number of months to go back. Can be negative or positive.
    Returns:
      int: The resulting month after applying the delta. The result is always in the range 1-12.
    """
    
    if month+delta <= 0:
        return month+delta+12
    else:
        return (month+delta)%12