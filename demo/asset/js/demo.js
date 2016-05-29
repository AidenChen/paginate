(function() {

    var con = new Paginate(4, 3, 'areaContent', getQuery);

    function getQuery(start, limit) {
        var formData = new FormData();

        formData.append('start', start);
        formData.append('limit', limit);
        formData.append('cmd', 'query');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../server/module.php');

        xhr.onload = function() {
            if (this.status == 200 || this.status == 304) {
                var data = eval('('+this.responseText+')');
                var tds = "";
                var tdLength = limit;
                if (data.num < limit) {
                    tdLength = data.num;
                }
                document.getElementById("infoContent").innerHTML = '共有 ' + data.num + ' 条，每页显示 ' + con.pageLmt + ' 条';
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

                var pageTot = Math.ceil(data.num/con.pageLmt);
                document.getElementById(con.pageTgt).innerHTML = con.doPaginate(pageTot);
            }
        };
        xhr.send(formData);
    }

})();