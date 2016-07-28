# paginate
A simple paginator in native JavaScript.

# How to use
It's a JavaScript class, you can instantiate it directly like this:
```JavaScript
var con = new Paginate(4, 3, 'areaContent', getQuery);
```
The 1st param means how many items listed in each page, which would be assigned as the property named "pageLmt";  
The 2nd param means how many page numbers listed in each page;  
The 3rd param is the id of paginator area, which would be assigned as the property named "pageTgt";  
The last param is the name of function you get data from server.

In the function named "getQuery", for example:
```JavaScript
var pageTot = Math.ceil(data.num/con.pageLmt);
document.getElementById(con.pageTgt).innerHTML = con.doPaginate(pageTot);
```
The variable "data.num" is total of items from server.  
The variable "pageTot" is total of page numbers.  
The method named "doPaginate" would return the whole paginator view.
