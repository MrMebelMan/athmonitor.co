#!/usr/bin/env python3

import urllib3
import json
import decimal
import sqlite3
import re
import time
import datetime
from datetime import date, datetime
import dateutil.parser

from coin import Coin

DEBUG = True
LIMIT = '160'
API_URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=' + LIMIT
FLOAT_PRECISION = 1e-05
DB_PATH = '/var/www/athmonitor.co/public_html/databases/ath.sqlite'

SYMBOLS = ['BTC', 'LTC', 'ETH', 'XRP', 'ADA',
           'XEM', 'XLM', 'IOTA', 'DASH', 'NEO',
           'EOS', 'XMR', 'ETC', 'QTUM', 'LSK',
           'XRB', 'BCH', 'OMG', 'SC', 'XVG',
           'VEN', 'PPT', 'ZEC', 'STRAT', 'OST',
           'BTS', 'BCN', 'STEEM', 'BNB', 'SNT' ]

# float comparison with predefined precision
def float_equals ( a, b, rel_tol=FLOAT_PRECISION, abs_tol=0.0 ):
    a = float(a)
    b = float(b)
    if ( abs(a-b) <= max( rel_tol * max( abs(a), abs(b) ), abs_tol ) ):
        return True
    return False

def main ():
    urllib3.disable_warnings ( urllib3.exceptions.InsecureRequestWarning )
    http = urllib3.PoolManager()

    try:
        res = http.request('GET', API_URL, retries=False)
    except urllib3.exceptions.NewConnectionError:
        print('Connection failed.')

    data = res.data
    conn = sqlite3.connect ( DB_PATH )
    c = conn.cursor()

    json_data = json.loads ( data.decode ( 'utf-8' ) )

    for symbol in SYMBOLS:
        coin = get_coin_info ( symbol, json_data )
        if ( coin is None ):
            print ( "ERROR: " + symbol + ' is None' ) 
            print ( "Maybe the symbol in question is already not in first " + LIMIT + " API entries?" ) 
            continue

        time_now = datetime.now().isoformat()
        old_price = 0.
        old_cap = 0.
        old_ath = 0.
        old_last_ath = 0.

        query = "SELECT price, market_cap, ath, last_ath FROM coin WHERE ticker = '" + symbol + "';"
        c.execute ( query )

        # extract values from row fields
        for row in c:
            old_price    = str( row[0] )
            old_cap      = str( row[1] )
            old_ath      = str( row[2] )
            old_last_ath = str( row[3] )

        datetime_last_ath = dateutil.parser.parse ( old_last_ath )

        if DEBUG:
          print ( coin.get_name() + ' (' + coin.get_symbol() + '): ' 
            + repr ( coin.get_price() ) + ' $, cap: ' 
            + str ( coin.get_cap() ) + ' $' + ', ATH: ' 
            + old_ath + ', last ATH: ' + old_last_ath )

        coin_name = coin.get_name()
        if ( coin_name == 'Bitcoin Cash' ):
          coin_name = 'Bcash'

        # Current price differs from the previous
        if not float_equals( decimal.Decimal(coin.get_price()), decimal.Decimal(old_price)):
            query = "UPDATE coin SET price = " + repr(coin.get_price()) + " WHERE name = '" + coin_name + "';"
            if DEBUG:
              print ( 'QUERY: ' + query )
            c.execute ( query )


        # Current price above ATH
        if decimal.Decimal(coin.get_price()) > float(old_ath):
            query = "UPDATE coin SET ath = " + repr(coin.get_price()) + " WHERE name = '" + coin_name + "';"

            if DEBUG:
              print ( repr(decimal.Decimal(coin.get_price())) + ' > ' + old_ath )
              print ( 'New ATH (and last ATH)!' )
              print ( 'QUERY 1: ' + query )

            time_iso = re.sub ('\..*$', '', str(time_now) )
            time_iso = re.sub ('T', ' ', str(time_iso) )
            c.execute ( query )
            query = "UPDATE coin SET last_ath = '" + str(time_iso) + "' WHERE name = '" + coin_name + "';"

            if DEBUG:
              print ( 'QUERY 2: ' + query )

            c.execute ( query )

        # Current cap differs from the previous
        if not float_equals( decimal.Decimal ( coin.get_cap()), decimal.Decimal(old_cap) ):
            query = "UPDATE coin SET market_cap = " + str(coin.get_cap()) + " WHERE name = '" + coin_name + "';"
            if DEBUG:
              print ( 'QUERY: ' + query )
            c.execute ( query )

    conn.commit()
    conn.close()
    pass

def get_coin_info ( symbol, json_data ):
    ath = 0.
    last_ath = ''
    found = False

    if ( symbol == 'IOTA' ):
        symbol = 'M' + symbol # dirty IOTA fix ( ticker is MIOTA :( )

    changed = False
    for data in json_data:
        for key, val in data.items():
            if ( key == 'name' ):
                name = str(val)
            elif ( key == 'symbol' ):
                coin_symbol = str(val)
            elif ( key == 'price_usd' ):
                price = val;
            elif ( key == 'available_supply' ):
                supply_now = val
        if ( coin_symbol.lower() == symbol.lower() ):
           found = True;
           break;

    if not found:
      print ( symbol + ' not found!' )
      return None

    return Coin ( name, symbol, price, supply_now, ath, last_ath )

if __name__ == '__main__':
    main()
    pass
