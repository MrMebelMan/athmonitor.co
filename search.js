'use strict';

// incremental search

function searchCoins()
{
  var input, filter, table, tr, td, i;
  input = document.getElementById ( "search" );
  filter = input.value.toUpperCase();
  table = document.getElementById ( "ATH_table" );
  tr = table.getElementsByTagName ( "tr" );

  for ( i = 0; i < tr.length; i++ )
  {
    td = tr[i].getElementsByTagName("td")[IDX_NAME];
    if (td)
    {
      if ( td.innerHTML.toUpperCase().indexOf( filter ) > -1 )
        tr[i].style.display = "";
      else
        tr[i].style.display = "none";
    } 
  }
}

