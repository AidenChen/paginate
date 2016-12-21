(function() {
    var paginate = new Paginate({
        pageIndex: 1,
        pageSize: 4,
        pagerLength: 5,
        container: 'areaContent',
        goToContainer: 'goToContent',
        queryEvent: 'query'
    });

    document.getElementById('areaContent').addEventListener('query', function(e) {
        query(e.detail.index, e.detail.size);
    });
    query(1, 4);

    function query(index, size) {
        var formData = new FormData();

        formData.append('index', index);
        formData.append('size', size);
        formData.append('cmd', 'query');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../server/server.php');

        xhr.onload = function() {
            if (this.status == 200 || this.status == 304) {
                var data = eval('(' + this.responseText + ')');
                var tds = '';
                var tdLength = size;
                if (data.total < size) {
                    tdLength = data.total;
                }
                for (var i = 0; i <= tdLength - 1; i++) {
                    if (data.items[i]) {
                        tds += [
                            '<tr>',
                            '<td><input type="checkbox" value="' + data.items[i].id + '"/></td>',
                            '<td>' + data.items[i].id + '</td>',
                            '<td>' + data.items[i].name + '</td>',
                            '<td>' + data.items[i].nick + '</td>',
                            '<td>' + data.items[i].sign + '</td>',
                            '<td>' + data.items[i].platform + '</td>',
                            '<td>' + data.items[i].role + '</td>',
                            '<td>' + data.items[i].from + '</td>',
                            '<td>' + (data.items[i].status == 1 ? 'active' : 'disabled') + '</td>',
                            '<td>' + data.items[i].date + '</td>',
                            '</tr>'
                        ].join('');
                    }
                }
                document.getElementById('tds').innerHTML = tds;
                paginate.setTotal(data.total);
            }
        };
        xhr.send(formData);
    }
})();
