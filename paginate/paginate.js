function Paginate(pageLmt, pageSize, pageTgt, funcName) {
    this.pageLmt = pageLmt;
    this.pageSize = pageSize;
    this.pageTgt = pageTgt;

    this.count = 1;
    this.outstr = '';

    this.getData(this.getPage(), pageLmt, funcName);

    document.getElementById(this.pageTgt).addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "A") {
            var pageNow = e.target.attributes.data.value;
            Paginate.prototype.getData(parseInt(pageNow), pageLmt, funcName);
        }
    });
}

Paginate.prototype = {
    constructor: Paginate,
    doPaginate: function(pageTot) {
        this.outstr = '';
        var pageCur = this.getPage();
        if (pageTot <= this.pageSize) {
            for (this.count = 1; this.count <= pageTot; this.count++) {
                if (this.count != pageCur) {
                    this.outstr = this.outstr + "<a href='./#page=" + this.count + "' class='btnGoto btn' data='" + this.count + "'>" + this.count + "</a>";
                }
                else {
                    this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
                }
            }
        }
        if (pageTot > this.pageSize) {
            if (this.getPage() != 1) {
                this.outstr = this.outstr + "<a href='./#page=1' class='btnLeft btn' data='1'>L</a>";
            }
            if (parseInt((pageCur - 1)/this.pageSize) == 0) {
                //this.outstr = this.outstr + "<a href='javascript:void(0)'><</a>";
                for (this.count = 1; this.count <= this.pageSize; this.count++) {
                    if (this.count != pageCur) {
                        this.outstr = this.outstr + "<a href='./#page=" + this.count + "' class='btnGoto btn' data='" + this.count + "'>" + this.count + "</a>";
                    }
                    else {
                        this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
                    }
                }
                this.outstr = this.outstr + "<a href='./#page=" + this.count + "' class='btnNex btn' data='" + this.count + "'>></a>";
            }
            else if (parseInt((pageCur - 1)/this.pageSize) == parseInt(pageTot/this.pageSize)) {
                this.outstr = this.outstr + "<a href='./#page=" + (parseInt((pageCur - 1)/this.pageSize)*this.pageSize) + "' class='btnPre btn' data='" + (parseInt((pageCur - 1)/this.pageSize)*this.pageSize) + "'><</a>";
                for (this.count = parseInt(pageTot/this.pageSize)*this.pageSize + 1; this.count <= pageTot; this.count++) {
                    if (this.count != pageCur) {
                        this.outstr = this.outstr + "<a href='./#page=" + this.count + "' class='btnGoto btn' data='" + this.count + "'>" + this.count + "</a>";
                    }
                    else {
                        this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
                    }
                }
                //this.outstr = this.outstr + "<a href='javascript:void(0)'>></a>";
            }
            else {
                this.outstr = this.outstr + "<a href='./#page=" + (parseInt((pageCur - 1)/this.pageSize)*this.pageSize) + "' class='btnPre btn' data='" + (parseInt((pageCur - 1)/this.pageSize)*this.pageSize) + "'><</a>";
                for (this.count = parseInt((pageCur - 1)/this.pageSize)*this.pageSize + 1; this.count <= parseInt((pageCur - 1)/this.pageSize)*this.pageSize + this.pageSize; this.count++) {
                    if (this.count != pageCur) {
                        this.outstr = this.outstr + "<a href='./#page=" + this.count + "' class='btnGoto btn' data='" + this.count + "'>" + this.count + "</a>";
                    }
                    else {
                        this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
                    }
                }
                if (this.count <= pageTot) {
                    this.outstr = this.outstr + "<a href='./#page=" + ((this.count > pageTot)? pageTot: this.count) + "' class='btnNex btn' data='" + ((this.count > pageTot)? pageTot: this.count) + "'>></a>";
                }
            }
            if (this.getPage() < pageTot) {
                this.outstr = this.outstr + "<a href='./#page=" + pageTot + "' class='btnRight btn' data='" + pageTot + "'>R</a>";
            }
        }
        return this.outstr;
    },
    getPage: function() {
        var url = location.href.split("#");
        var pageNow = url[1].split("=")[1];
        return pageNow;
    },
    getData: function(now, lmt, funcName) {
        funcName((parseInt(now) - 1)*lmt, lmt);
    }
};