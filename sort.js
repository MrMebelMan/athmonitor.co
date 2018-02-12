'use strict';

const IDX_NAME        = 0;
const IDX_PRICE       = 1;
const IDX_MARKET_CAP  = 2;
const IDX_ATH         = 3;
const IDX_LAST_ATH    = 4;
const IDX_PERCENT_ATH = 5;

const DESCENDING = 0;
const ASCENDING  = 1;

function invertDirection ( direction )
{
  if ( direction == DESCENDING )
    return ASCENDING;
  return DESCENDING;
}

function stripBadChars ( string, type='price' )
{
  if ( type == 'price' )
    return string.replace ( /[,$]/g, '' );
  else if ( type == 'percent' )
  {
    var ret = string.replace ( /<span[^>]*>/g, '' );
    return ret.replace ( /[$,% ]/g, '' );
  }
}

function sortByName() // by name and symbol
{
  if ( typeof sortByName.direction == 'undefined' )
    sortByName.direction = DESCENDING;

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById ( "ATH_table" );
  switching = true;

  while ( switching )
  {
    switching = false;
    rows = table.getElementsByTagName( "TR" );
    for ( i = 1; i < (rows.length - 1); i++ )
    {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[IDX_NAME];
      y = rows[i + 1].getElementsByTagName("TD")[IDX_NAME];

      if ( sortByName.direction == DESCENDING )
      {
        if ( x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() )
        {
          shouldSwitch= true;
          break;
        }
      }
      else if ( sortByName.direction == ASCENDING )
      {
        if ( x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() )
        {
          shouldSwitch= true;
          break;
        }
      }
    }
    if ( shouldSwitch )
    {
      rows[i].parentNode.insertBefore ( rows[i + 1], rows[i] );
      switching = true;
    }
  }
  sortByName.direction = invertDirection ( sortByName.direction );
}

function sortByPrice()
{
  if ( typeof sortByPrice.direction == 'undefined' )
    sortByPrice.direction = ASCENDING;

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById ("ATH_table");
  switching = true;

  while ( switching )
  {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for ( i = 1; i < (rows.length - 1); i++ )
    {
      shouldSwitch = false;
      var x = rows[i].getElementsByTagName("TD")[IDX_PRICE];
      var y = rows[i + 1].getElementsByTagName("TD")[IDX_PRICE];
      var price_x = stripBadChars ( x.innerHTML );
      var price_y = stripBadChars ( y.innerHTML );

      if ( sortByPrice.direction == DESCENDING )
      {
        if ( parseFloat(price_x) > parseFloat(price_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
      else if ( sortByPrice.direction == ASCENDING )
      {
        if ( parseFloat(price_x) < parseFloat(price_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
    }
    if ( shouldSwitch )
    {
      rows[i].parentNode.insertBefore (rows[i + 1], rows[i] );
      switching = true;
    }
  }
  sortByPrice.direction = invertDirection ( sortByPrice.direction );
}

function sortByCap()
{
  if ( typeof sortByCap.direction == 'undefined' )
    sortByCap.direction = ASCENDING;

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById ( "ATH_table" );
  switching = true;

  while ( switching )
  {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++)
    {
      shouldSwitch = false;
      var x = rows[i].getElementsByTagName("TD")[IDX_MARKET_CAP];
      var y = rows[i + 1].getElementsByTagName("TD")[IDX_MARKET_CAP];
      var price_x = stripBadChars ( x.innerHTML );
      var price_y = stripBadChars ( y.innerHTML );

      if ( sortByCap.direction == DESCENDING )
      {
        if ( parseFloat(price_x) > parseFloat(price_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
      else if ( sortByCap.direction == ASCENDING )
      {
        if ( parseFloat(price_x) < parseFloat(price_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
    }
    if ( shouldSwitch )
    {
      rows[i].parentNode.insertBefore ( rows[i + 1], rows[i] );
      switching = true;
    }
  }
  sortByCap.direction = invertDirection ( sortByCap.direction );
}

function sortByATH()
{
  if ( typeof sortByATH.direction == 'undefined' )
    sortByATH.direction = ASCENDING;

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById ( "ATH_table" );
  switching = true;

  while ( switching )
  {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for ( i = 1; i < (rows.length - 1); i++ )
    {
      shouldSwitch = false;
      var x = rows[i].getElementsByTagName("TD")[IDX_ATH];
      var y = rows[i + 1].getElementsByTagName("TD")[IDX_ATH];
      var price_x = stripBadChars ( x.innerHTML );
      var price_y = stripBadChars ( y.innerHTML );

      if ( sortByATH.direction == DESCENDING )
      {
        if ( parseFloat(price_x) > parseFloat(price_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
      else if ( sortByATH.direction == ASCENDING )
      {
        if ( parseFloat(price_x) < parseFloat(price_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
    }
    if ( shouldSwitch )
    {
      rows[i].parentNode.insertBefore (rows[i + 1], rows[i] );
      switching = true;
    }
  }
  sortByATH.direction = invertDirection ( sortByATH.direction );
}

function sortByLastATH()
{
  if ( typeof sortByLastATH.direction == 'undefined' )
    sortByLastATH.direction = ASCENDING;

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById ( "ATH_table" );
  switching = true;

  while ( switching )
  {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++)
    {
      shouldSwitch = false;
      var x = rows[i].getElementsByTagName("TD")[IDX_LAST_ATH];
      var y = rows[i + 1].getElementsByTagName("TD")[IDX_LAST_ATH];
      var ath_date_x = Date.parse( x.innerHTML );
      var ath_date_y = Date.parse( y.innerHTML );

      if ( sortByLastATH.direction == DESCENDING )
      {
        if ( ath_date_x > ath_date_y )
        {
          shouldSwitch= true;
          break;
        }
      }
      else if ( sortByLastATH.direction == ASCENDING )
      {
        if ( ath_date_x < ath_date_y )
        {
          shouldSwitch= true;
          break;
        }
      }
    }
    if ( shouldSwitch )
    {
      rows[i].parentNode.insertBefore ( rows[i + 1], rows[i] );
      switching = true;
    }
  }
  sortByLastATH.direction = invertDirection ( sortByLastATH.direction );
}

function sortByPercent()
{
  if ( typeof sortByPercent.direction == 'undefined' )
    sortByPercent.direction = DESCENDING;

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById ( "ATH_table" );
  switching = true;

  while ( switching )
  {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for ( i = 1; i < (rows.length - 1); i++ )
    {
      shouldSwitch = false;
      var x = rows[i].getElementsByTagName("TD")[IDX_PERCENT_ATH];
      var y = rows[i + 1].getElementsByTagName("TD")[IDX_PERCENT_ATH];

      var percent_x = stripBadChars ( x.innerHTML, 'percent' );
      var percent_y = stripBadChars ( y.innerHTML, 'percent' );

      if ( sortByPercent.direction == DESCENDING )
      {
        if ( parseFloat(percent_x) > parseFloat(percent_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
      else if ( sortByPercent.direction == ASCENDING )
      {
        if ( parseFloat(percent_x) < parseFloat(percent_y) )
        {
          shouldSwitch= true;
          break;
        }
      }
    }
    if ( shouldSwitch )
    {
      rows[i].parentNode.insertBefore ( rows[i + 1], rows[i] );
      switching = true;
    }
  }
  sortByPercent.direction = invertDirection ( sortByPercent.direction );
}

