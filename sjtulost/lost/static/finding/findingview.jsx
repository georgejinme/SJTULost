
var FindingViewBody = React.createClass({
    render: function() {
        return (
            <div className="findingViewBody">
                <p>title</p>
                <img src="/static/image/qwt.jpg" />
                <hr/>
                <p>ajsdfkjas ewjfwljeflkjdflskdjflsdkfjlekjwfjlksdnvklsnvlsknfajhldfkajhsdfkajsdhf</p>
            </div>
        )
    }
});

var FindingViewHeader = React.createClass({
    render: function() {
        return (
            <div className="findingViewHeader">
                <span className="label-danger label">Uncompleted</span>
                <p>物品类别: 手表</p>
                <p>遗失时间: 2015/02/03</p>
                <p>遗失地点: 二餐</p>
                <p>详细位置: 二餐新疆餐厅!dssssdsdfsdfsdfsdf东方闪电是第三点收到</p>
                <p>联系电话: 19102391029</p>
                <p>酬金: 80 元</p>
                <a href="#" className="btn btn-success">我捡到了!</a>
            </div>
        )
    }
});

var FindingView = React.createClass({
    render: function() {
        return (
            <div className="findingViewContent">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <FindingViewBody />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <FindingViewHeader />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = FindingView;