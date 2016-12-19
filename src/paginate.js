function Paginate(pageSize, pagerLength, container, callback) {
    this.pageIndex = 1;
    this.pageTotal = 0;
    this.pageSize = pageSize;
    this.itemTotal = 0;
    this.pagerLength = pagerLength;
    this.container = container;
    this.list = [];
    this.callback = callback;
}

Paginate.prototype = {
    constructor: Paginate,
    getList: function(index, total) {
        this.pageIndex = parseInt(index);
        this.itemTotal = parseInt(total);
        this.pageTotal = Math.ceil(this.itemTotal / this.pageSize);
        this.list = [];
        if (this.pageTotal <= this.pagerLength) {
            for (var i = 1; i <= this.pageTotal; i++) {
                this.list.push(i);
            }
        }
        else {
            if (this.pageIndex > 1) {
                this.list.push('<');
            }
            if (parseInt((this.pageIndex - 1) / this.pagerLength) == 0) {
                for (var i = 1; i <= this.pagerLength; i++) {
                    this.list.push(i);
                }
                if (i <= this.pageTotal) {
                    this.list.push('...');
                    this.list.push(this.pageTotal);
                }
            }
            else if (parseInt((this.pageIndex - 1) / this.pagerLength) == parseInt(this.pageTotal / this.pagerLength)) {
                if (this.pageIndex > this.pagerLength) {
                    this.list.push(1);
                    this.list.push('...');
                }
                for (var i = parseInt(this.pageTotal / this.pagerLength) * this.pagerLength + 1; i <= this.pageTotal; i++) {
                    this.list.push(i);
                }
            }
            else {
                if (this.pageIndex > this.pagerLength) {
                    this.list.push(1);
                    this.list.push('...');
                }
                for (var i = parseInt((this.pageIndex - 1) / this.pagerLength) * this.pagerLength + 1; i <= parseInt((this.pageIndex - 1) / this.pagerLength) * this.pagerLength + this.pagerLength; i++) {
                    this.list.push(i);
                }
                if (i <= this.pageTotal) {
                    this.list.push('...');
                    this.list.push(this.pageTotal);
                }
            }
            if (this.pageIndex < this.pageTotal) {
                this.list.push('>');
            }
        }
        return this.createPager(this.list);
    },
    createPager: function(list) {
        var ret = '';
        for (var i = 0; i < list.length; i++) {
            if (list[i] == '<') {
                ret += '<a href="#" class="btnPre btn" data="' + (this.pageIndex - 1) + '"><</a>';
            }
            else if (list[i] == '>') {
                ret += '<a href="#" class="btnNex btn" data="' + (this.pageIndex + 1) + '">></a>';
            }
            else if (list[i] == '...') {
                ret += '<a href="#" class="btnNex btn">...</a>';
            }
            else if (list[i] == this.pageIndex) {
                ret += '<span class="current">' + this.pageIndex + '</span>';
            }
            else {
                ret += '<a href="#" class="btnGoto btn" data="' + list[i] + '">' + list[i] + '</a>';
            }
        }
        return ret;
    },
    getData: function(now, lmt, callback) {
        callback((parseInt(now) - 1) * lmt, lmt);
    },
    createGoTo: function() {
        var res = "";
        res += "<input class='inputGoTo' type='text'>";
        res += "<div class='btnGoTo'>Go</div>";
        return res;
    }
};