(function() {

    var con = new Paginate(4, 5, 'areaContent', getQuery);
    document.getElementById('goToContent').innerHTML = con.createGoTo();
    var curr = 1;

    con.getData(parseInt(curr), con.pageSize, con.callback);
    document.getElementById(con.container).addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "A") {
            curr = e.target.attributes.data.value;
            con.getData(parseInt(curr), con.pageSize, con.callback);
        }
    });

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

                document.getElementById(con.container).innerHTML = con.getList(curr, data.num);
            }
        };
        xhr.send(formData);
    }

})();