var InitItemTypeAction = require('../flux/action/initializationAction').InitItemTypeAction;
var InitPlaceAction = require('../flux/action/initializationAction').InitPlaceAction;

var ItemStore = require('../flux/store/itemStore');
var PlaceStore = require('../flux/store/placeStore');

var FindingTypeRow = React.createClass({
    render: function() {
        return (
            <div className="row">
                <p className="col-lg-2 col-md-2 col-sm-2 findingTypeLabel">{ this.props.typeName }</p>
                <ul className="nav nav-pills col-lg-10 col-md-10 col-sm-10 findingTypeNav">
                    {
                        this.props.data.map(function(val, index){
                            return (
                                <li><a>{val}</a></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
});

var FindingType = React.createClass({
    render: function() {
        return (
            <div className="findingType">
                <FindingTypeRow
                    typeName = "物品类别"
                    data = {this.props.itemTypes}
                />
                <FindingTypeRow
                    typeName = "地点"
                    data = {this.props.places}
                />
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
                <div className="col-lg-9 col-md-9 col-sm-9 findingItemDetail">
                    <p className="findingItemTitle">啊啊啊啊啊啊啊水电费实际带来看收到发送的咖啡机按拉斯克奖弗拉未开机我耳机了科技算法啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
                    <span className='label-danger label'>Uncompleted</span>
                    <p className="findingItemInfo">物品类别: 手机</p>
                    <p className="findingItemInfo">遗失时间: 2015/06/14 19:00:00</p>
                    <p className="findingItemInfo">遗失地点: 二餐. 大概是在XXXXX位置</p>
                    <p className="findingItemInfo">联系电话: 1801812712</p>
                    <p className="findingItemInfo findingItemPay">酬金: 50元</p>
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
    getInitialState: function() {
        return {
            itemTypes: ItemStore.getDescriptions(),
            places: PlaceStore.getDescriptions()
        }
    },

    componentDidMount: function() {
        ItemStore.addChangeListener(this._onItemChange);
        PlaceStore.addChangeListener(this._onPlaceChange);
        InitItemTypeAction.fetchData();
        InitPlaceAction.fetchData();
    },

    componentWillUnmount: function() {
        ItemStore.removeChangeListener(this._onItemChange);
        PlaceStore.removeChangeListener(this._onPlaceChange);
    },

    _onItemChange: function () {
        this.setState({
            itemTypes: ItemStore.getDescriptions()
        });
    },

    _onPlaceChange: function() {
        this.setState({
            places: PlaceStore.getDescriptions()
        });
    },

    render: function() {
        return (
            <div className="findingContent">
                <FindingType
                    itemTypes = {this.state.itemTypes}
                    places = {this.state.places}
                />
                <hr/>
                <FindingSection />
            </div>
        )
    }
});

module.exports = Finding;