(function() {

    var con = new Paginate({
        pageIndex: 1,
        pageSize: 4,
        pagerLength: 5,
        container: 'areaContent',
        goToContainer: 'goToContent',
        callback: query
    });

    function query(index, size) {
        var formData = new FormData();

        formData.append('start', index);
        formData.append('limit', size);
        formData.append('cmd', 'query');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../server/module.php');

        xhr.onload = function() {
            if (this.status == 200 || this.status == 304) {
                var data = eval('('+this.responseText+')');
                var tds = "";
                var tdLength = size;
                if (data.num < size) {
                    tdLength = data.num;
                }
                for (var i = 0; i <= tdLength - 1; i++) {
                    if (data.items[i]) {
                        tds += "<tr>"
                            + "<td><input type='checkbox' value='" + data.items[i].id + "'/></td>"
                            + "<td>" + data.items[i].id + "</td>"
                            + "<td>" + data.items[i].name + "</td>"
                            + "<td>" + data.items[i].nick + "</td>"
                            + "<td>" + data.items[i].sign + "</td>"
                            + "<td>" + data.items[i].type + "</td>"
                            + "<td>" + data.items[i].role + "</td>"
                            + "<td>" + data.items[i].belong + "</td>"
                            + "<td>" + (data.items[i].status == 1? '已激活': '未激活') + "</td>"
                            + "<td>" + data.items[i].date + "</td>"
                            + "</tr>";
                    }
                }
                document.getElementById("tds").innerHTML = tds;
                con.setTotal(data.num);
            }
        };
        xhr.send(formData);
    }

})();
