var InitItemTypeAction = require('../flux/action/initializationAction').InitItemTypeAction;
var InitPlaceAction = require('../flux/action/initializationAction').InitPlaceAction;
var InitFindingAction = require('../flux/action/initializationAction').InitFindingAction;

var ItemStore = require('../flux/store/itemStore');
var PlaceStore = require('../flux/store/placeStore');
var FindingStore = require('../flux/store/findingStore');

var idOperation = require('../shared/util');

var FindingTypeRow = React.createClass({
    getSelectedClass: function(id) {
        if (this.props.selectedData[id] == true) return 'active';
        else return '';
    },

    render: function() {
        var handler = this.props.handler;
        var classes = this.getSelectedClass;
        return (
            <div className="row">
                <p className="col-lg-2 col-md-2 col-sm-2 findingTypeLabel">{ this.props.typeName }</p>
                <ul className="nav nav-pills col-lg-10 col-md-10 col-sm-10 findingTypeNav">
                    {
                        this.props.data.map(function(val, index){
                            return (
                                <li className={classes(index)}>
                                    <a id = {idOperation.encodeId('type', val['id'])}
                                       href = "javascript:void(0);"
                                       onClick = {handler}>{val['description']}
                                    </a>
                                </li>
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
                    selectedData = {this.props.selectedItemTypes}
                    handler = {this.props.selectItemTypeHandler}
                />
                <FindingTypeRow
                    typeName = "地点"
                    data = {this.props.places}
                    selectedData = {this.props.selectedPlaces}
                    handler = {this.props.selectPlaceHandler}
                />
            </div>
        )
    }
});

var FindingItem = React.createClass({
    badgeColor: function() {
        if (this.props.json['state'] == 0) return 'label-danger label';
        else return 'label-success label';
    },

    badgeText: function() {
        if (this.props.json['state'] == 0) return 'Uncompleted';
        else return 'Completed'
    },
    render: function() {
        return (
            <div className="row findingItem">
                <div className="col-lg-3 col-md-3 col-sm-3 findingItemImage">
                    <img src = {this.props.json['img']} className="img-rounded" />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 findingItemDetail">
                    <p className="findingItemTitle">{this.props.json['description']}</p>
                    <span className={this.badgeColor()}>{this.badgeText()}</span>
                    <p className="findingItemInfo">物品类别: {this.props.json['item_type']}</p>
                    <p className="findingItemInfo">遗失时间: {this.props.json['time']}</p>
                    <p className="findingItemInfo">遗失地点: {this.props.json['place']}. {this.props.json['lost_place_detail']}</p>
                    <p className="findingItemInfo">联系电话: {this.props.json['user_phone']}</p>
                    <p className="findingItemInfo findingItemPay">酬金: {this.props.json['pay']} 元</p>
                </div>
            </div>
        )
    }
});

var FindingSection = React.createClass({
    render: function() {
        return (
            <div className="findingSection">
                {
                    this.props.data.map(function(val, index) {
                        return (
                            <div>
                                <FindingItem
                                    json = {val}
                                />
                                <hr/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});

var Finding = React.createClass({
    getInitialState: function() {
        return {
            itemTypes: ItemStore.getItems(),
            places: PlaceStore.getPlaces(),
            findings: FindingStore.getFindingsWithAmount(),
            selectedItemTypes: ItemStore.getSelectedItems(),
            selectedPlaces: PlaceStore.getSelectedPlaces()
        }
    },

    componentDidMount: function() {
        ItemStore.addChangeListener(this._onItemChange);
        PlaceStore.addChangeListener(this._onPlaceChange);
        FindingStore.addChangeListener(this._onFindingChange);
        ItemStore.addSelectListener(this._onItemSelectChange);
        PlaceStore.addSelectListener(this._onPlaceSelectChange);
        InitItemTypeAction.fetchData();
        InitPlaceAction.fetchData();
        InitFindingAction.fetchData();
    },

    componentWillUnmount: function() {
        ItemStore.removeChangeListener(this._onItemChange);
        PlaceStore.removeChangeListener(this._onPlaceChange);
        FindingStore.removeChangeListener(this._onFindingChange);
        ItemStore.removeSelectListener(this._onItemSelectChange);
        PlaceStore.removeSelectListener(this._onItemSelectChange)
    },

    _onItemChange: function () {
        this.setState({
            itemTypes: ItemStore.getItems(),
            selectedItemTypes: ItemStore.getSelectedItems()
        });
    },

    _onPlaceChange: function() {
        this.setState({
            places: PlaceStore.getPlaces(),
            selectedPlaces: PlaceStore.getSelectedPlaces()
        });
    },

    _onItemSelectChange: function() {
        this.setState({
            selectedItemTypes: ItemStore.getSelectedItems()
        });
        InitFindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
    },

    _onPlaceSelectChange: function() {
        this.setState({
            selectedPlaces: PlaceStore.getSelectedPlaces()
        });
        InitFindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
    },

    _onFindingChange: function() {
        this.setState({
            findings: FindingStore.getFindingsWithAmount()
        })
    },

    selectItemTypeHandler: function(event) {
        InitItemTypeAction.select(idOperation.decodeId(event.target.id));
    },

    selectPlaceHandler: function(event) {
        InitPlaceAction.select(idOperation.decodeId(event.target.id));
    },

    render: function() {
        return (
            <div className="findingContent">
                <FindingType
                    itemTypes = {this.state.itemTypes}
                    places = {this.state.places}
                    selectedItemTypes = {this.state.selectedItemTypes}
                    selectedPlaces = {this.state.selectedPlaces}
                    selectItemTypeHandler = {this.selectItemTypeHandler}
                    selectPlaceHandler = {this.selectPlaceHandler}
                />
                <hr/>
                <FindingSection
                    data = {this.state.findings}
                />
            </div>
        )
    }
});

module.exports = Finding;