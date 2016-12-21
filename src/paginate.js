function Paginate(config) {
    this.pageIndex = config.pageIndex || 1;
    this.pageTotal = 0;
    this.pageSize = config.pageSize || 10;
    this.itemTotal = 0;
    this.pagerLength = config.pagerLength || 5;
    this.container = config.container;
    this.goToContainer = config.goToContainer;
    this.queryEvent = config.queryEvent || 'query';
    this.list = [];
    this.init();
}

Paginate.prototype = {
    constructor: Paginate,
    init: function() {
        if (this.goToContainer) {
            this.createGoTo(this.goToContainer);
        }
        var me = this;
        document.getElementById(me.container).addEventListener('click', function(e) {
            if (e.target && e.target.nodeName == 'A') {
                var val = e.target.attributes.data && e.target.attributes.data.value;
                me.pageIndex = parseInt(val);
                var event = new CustomEvent(me.queryEvent, {
                    detail: {
                        index: me.pageIndex,
                        size: me.pageSize
                    },
                    bubbles: true,
                    cancelable: false
                });
                document.getElementById(me.container).dispatchEvent(event);
            }
        });
    },
    getList: function(total) {
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
    setTotal: function(total) {
        document.getElementById(this.container).innerHTML = this.getList(total);
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
                ret += '<a href="#">...</a>';
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
    createGoTo: function() {
        var ret = '';
        ret += '<input class="inputGoTo" type="text">';
        ret += '<div class="btnGoTo">Go</div>';
        document.getElementById(this.goToContainer).innerHTML = ret;
    }
};
