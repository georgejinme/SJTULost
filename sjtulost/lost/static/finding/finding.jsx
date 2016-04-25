var FindingTypeRow = React.createClass({
    render: function() {
        return (
            <div className="row">
                <p className="col-lg-1 col-md-1 col-sm-1 findingTypeLabel">物品类别</p>
                <ul className="nav nav-pills col-lg-11 col-md-11 col-sm-11 findingTypeNav">
                    <li className="active"><a>全部</a></li>
                    <li><a>钥匙</a></li>
                    <li><a>钱包</a></li>
                    <li><a>手机</a></li>
                </ul>
            </div>
        )
    }
});

var FindingType = React.createClass({
    render: function() {
        return (
            <div>
                <FindingTypeRow />
                <FindingTypeRow />
                <FindingTypeRow />
            </div>
        )
    }
});

var FindingItem = React.createClass({
    render: function() {
        return (
            <div className="row findingItem">
                <div className="col-lg-3 col-md-3 col-sm-3 findingItemImage">
                    <img src = '/static/image/qwt.jpg' className="img-rounded" />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9">
                    <p>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
                    <p>物品类别: 手机</p>
                    <p>遗失时间: 2015/06/14 19:00:00</p>
                    <p>遗失地点: 二餐. 大概是在XXXXX位置</p>
                    <p>酬金: 50元</p>
                </div>
            </div>
        )
    }
});

var FindingSection = React.createClass({
    render: function() {
        return (
            <div className="findingSection">
                <FindingItem />
                <hr/>
                <FindingItem />
                <hr/>
            </div>
        )
    }
});

var Finding = React.createClass({
    render: function() {
        return (
            <div className="findingContent">
                <FindingType />
                <hr/>
                <FindingSection />
            </div>
        )
    }
});

module.exports = Finding;