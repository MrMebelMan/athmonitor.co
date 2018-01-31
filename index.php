<!DOCTYPE html>

<html>
  <head>
    <title>ATH Monitor</title>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="Cryptocurrencies' All Time Highs' table.">
    <meta name="keywords" content="ath, all time high, crypto, cryptocurrency, btc, eth, bitcoin, ethereum">
    <meta name="author" content="MutexLock">

    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="styles.css" type="text/css">

    <link href="http://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" type="text/css">
  </head>

  <body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js" async></script>
    <script src="sort.js" type="text/javascript"></script>
    <script src="search.js" type="text/javascript"></script>

      <h1 id="lato">
        All Time High Monitor
      </h1>

      <input type="text" id="search" autocomplete="off" onkeyup="searchCoins()" placeholder="Search for coins...">

      <table id="ATH_table">
        <thead>
          <tr>
	          <th style="width:17%;"><input type="image" 
		             src="/images/buttons/sort-white.png"
		             onclick="sortByName()"
		             alt='sort_name'
                 class="button_sort"/>&nbsp;Currency</th>

	          <th style="width:13%;"><input type="image"
		             src="/images/buttons/sort-white.png"
		             onclick="sortByPrice()"
		             alt='sort_price'
                 class="button_sort"/>&nbsp;Price</th>

	          <th style="width:18%;"><input type="image"
		             src="/images/buttons/sort-white.png"
		             onclick="sortByCap()"
		             alt='sort_cap'
                 class="button_sort"/>&nbsp;Market Cap</th>

	          <th style="width:15%;"><input type="image"
		             src="/images/buttons/sort-white.png"
		             onclick="sortByATH()"
		             alt='sort_ath'
                 class="button_sort"/>&nbsp;ATH</th>

	          <th style="width:22%;"><input type="image"
		             src="/images/buttons/sort-white.png"
		             onclick="sortByLastATH()"
		             alt='sort_last_ath'
                 class="button_sort"/>&nbsp;Last ATH</th>

    	      <th style="width:14.5%;"><input type="image"
    		         src="/images/buttons/sort-white.png"
    		         onclick="sortByPercent()"
    		         alt='sort_percent_ath'
                 class="button_sort"/>&nbsp;% from ATH</th>
            </tr>
          </tr>
        </thead>

<?php
        # Calculate colors for smooth fading (green -> red)
        function calculate_hsl ( $percent_ath ) {
          $hue = (1 - $percent_ath) * 120;
          $saturation = 70;
          $lightness = 50;
          $color = 'hsl(' . $hue . ', ' 
                          . $saturation . '%, ' 
                          . $lightness . '% )';
          return $color;
        }

        $db = new SQLite3( 'databases/ath.sqlite' );
        
        $results = $db->query('SELECT * FROM coin ORDER BY last_ath DESC');

        while ( $row = $results->fetchArray ( SQLITE3_ASSOC ) ) {
          $name = '';
          $price = 0;
          $ath = 0;
          $market_cap = 0;
          $last_ath = '';
          $market_cap = '';
          $icon_path = '';

          foreach ($row as $key => $value) {
            if ( $key == 'name' )
              $name = $value;
            else if ( $key == 'price' )
              $price = $value;
            else if ( $key == 'market_cap' )
              $market_cap = $value;
            else if ( $key == 'ath' )
              $ath = $value;
            else if ( $key == 'last_ath' )
              $last_ath = $value;
            else if ( $key == 'icon_path' )
              $icon_path = $value;
          }

          $percent_ath = abs ( ($price - $ath) / $ath );
          $color = calculate_hsl ( $percent_ath );

          echo "        <tr>\r\n";
          echo '           <td><img src=' . $icon_path . ' class="coin-logo" alt=' . $name . '>' . $name . "</td>\r\n";
          echo '            <td>' . number_format ( $price, 2, '.', ',' )      . " $</td>\r\n";
          echo '            <td>' . number_format ( $market_cap, 0, '.', ',' ) . " $</td>\r\n";
          echo '            <td>' . number_format ( $ath, 2, '.', ',' )        . " $</td>\r\n";
          echo '            <td>' . $last_ath . "</td>\r\n";
          echo '            <td>' . '<span style="color: ' . $color . '";>' 
                                  . number_format ( $percent_ath * 100, 2, '.', ',') . ' %</span>' . "</td>\r\n";
          echo "        </tr>\r\n";
        }
?>
      </table>	

      <br />
      <hr>
      <p id="lato">
      Wow! No ads, cookies or XMR miners?! I want to <a href="/donate">donate</a>!
      </p>

  </body>
</html>


