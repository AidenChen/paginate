# paginate

> a simple pagination component in native JavaScript

# Usage

```JavaScript
    var instance = new Paginate({
        pageIndex: 1,
        pageSize: 4,
        pagerLength: 5,
        container: 'areaContent',
        goToContainer: 'goToContent',
        callback: query
    });

    function query(index, size) {
        // Get your data
        ...
        // Update total
        instance.setTotal(data.num);
    }
```
