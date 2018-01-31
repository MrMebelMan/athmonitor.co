# coin.py

import decimal

class Coin:

    def __init__(self, name, symbol, price, supply, ath, last_ath):
        self.name = name
        self.symbol = symbol 
        self.price = price
        self.supply = supply
        self.ath = ath
        self.last_ath = last_ath
        self.cap = decimal.Decimal(self.supply) * decimal.Decimal(self.price)
        pass

    # Setters
    def set_name (self, name):
        self.name = name
    pass

    def set_symbol (self, symbol):
        self.symbol = symbol
    pass

    def set_price (self, price):
        self.price = price
    pass

    def set_cap (self, cap):
        self.cap = cap
    pass

    def set_ath (self, ath):
        self.ath = ath
    pass


    # Getters
    def get_name (self):
        return self.name
    pass

    def get_symbol (self):
        return self.symbol
    pass

    def get_price (self):
        return self.price
    pass

    def get_cap (self):
        return self.cap
    pass

    def get_ath (self):
        return self.ath
    pass

    def get_last_ath (self):
        return self.last_ath
    pass

pass

