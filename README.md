# paginate

> a simple pagination component in native JavaScript

# Usage

```JavaScript
// Get an instance
var paginate = new Paginate({
    pageIndex: 1,
    pageSize: 4,
    pagerLength: 5,
    container: 'areaContent',
    goToContainer: 'goToContent',
    queryEvent: 'query'
});

// Add an event listener
document.getElementById('areaContent').addEventListener('query', function(e) {
    query(e.detail.index, e.detail.size);
});

// Get the data fo first page
query(1, 4);

// The query function
function query(index, size) {
    // Get your data
    var data = ...
    // Update total
    paginate.setTotal(data.total);
}
```
