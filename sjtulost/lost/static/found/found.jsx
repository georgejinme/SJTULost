var React = require('react');

var ItemTypeAction = require('../flux/action/initializationAction').ItemTypeAction;
var PlaceAction = require('../flux/action/initializationAction').PlaceAction;
var FoundAction = require('../flux/action/initializationAction').FoundAction;

var ItemStore = require('../flux/store/itemStore');
var PlaceStore = require('../flux/store/placeStore');
var FoundStore = require('../flux/store/foundStore');

var idOperation = require('../shared/util');

var FoundTypeRow = React.createClass({
    getSelectedClass: function(index) {
        if (this.props.selectedData[index] == true) return 'active';
        else return '';
    },

    render: function() {
        var handler = this.props.handler;
        var classes = this.getSelectedClass;
        return (
            <div className="row">
                <p className="col-lg-2 col-md-2 col-sm-2 foundTypeLabel">{ this.props.typeName }</p>
                <ul className="nav nav-pills col-lg-10 col-md-10 col-sm-10 foundTypeNav">
                    {
                        this.props.data.map(function(val, index){
                            return (
                                <li className={classes(index)}>
                                    <a id = {idOperation.encodeId('type', index)}
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

var FoundType = React.createClass({
    render: function() {
        return (
            <div className="foundType">
                <FoundTypeRow
                    typeName = "物品类别"
                    data = {this.props.itemTypes}
                    selectedData = {this.props.selectedItemTypes}
                    handler = {this.props.selectItemTypeHandler}
                />
                <FoundTypeRow
                    typeName = "地点"
                    data = {this.props.places}
                    selectedData = {this.props.selectedPlaces}
                    handler = {this.props.selectPlaceHandler}
                />
            </div>
        )
    }
});

var FoundItem = React.createClass({
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
            <div className="row foundItem">
                <div className="col-lg-3 col-md-3 col-sm-3 foundItemImage">
                    <img src = {this.props.json['img']} className="img-rounded" />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 foundItemDetail">
                    <a href = {'/foundview/' + this.props.json['id']} target = '_blank'>
                        <p className="foundItemTitle">{this.props.json['description']}</p>
                    </a>
                    <span className={this.badgeColor()}>{this.badgeText()}</span>
                    <p className="foundItemInfo">物品类别: {this.props.json['item_type']}</p>
                    <p className="foundItemInfo">拾物时间: {this.props.json['time']}</p>
                    <p className="foundItemInfo">拾物地点: {this.props.json['place']}. {this.props.json['place_detail']}</p>
                    <p className="foundItemInfo">联系电话: {this.props.json['user_phone']}</p>
                </div>
            </div>
        )
    }
});

var FoundSection = React.createClass({
    render: function() {
        return (
            <div className="foundSection">
                {
                    this.props.data.map(function(val, index) {
                        return (
                            <div>
                                <FoundItem
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




var Found = React.createClass({
    getInitialState: function() {
        return {
            itemTypes: ItemStore.getItems(),
            places: PlaceStore.getPlaces(),
            founds: FoundStore.getFoundsWithAmount(),
            selectedItemTypes: ItemStore.getSelectedItems(),
            selectedPlaces: PlaceStore.getSelectedPlaces()
        }
    },

    componentDidMount: function() {
        ItemStore.addChangeListener(this._onItemChange);
        PlaceStore.addChangeListener(this._onPlaceChange);
        FoundStore.addChangeListener(this._onFoundChange);
        ItemStore.addSelectListener(this._onItemSelectChange);
        PlaceStore.addSelectListener(this._onPlaceSelectChange);
        ItemTypeAction.fetchData();
        PlaceAction.fetchData();
        FoundAction.fetchData();
    },

    componentWillUnmount: function() {
        ItemStore.removeChangeListener(this._onItemChange);
        PlaceStore.removeChangeListener(this._onPlaceChange);
        FoundStore.removeChangeListener(this._onFoundChange);
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
        FoundAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
    },

    _onPlaceSelectChange: function() {
        this.setState({
            selectedPlaces: PlaceStore.getSelectedPlaces()
        });
        FoundAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId())
    },

    _onFoundChange: function() {
        this.setState({
            founds: FoundStore.getFoundsWithAmount()
        })
    },

    selectItemTypeHandler: function(event) {
        ItemTypeAction.select(idOperation.decodeId(event.target.id));
    },

    selectPlaceHandler: function(event) {
        PlaceAction.select(idOperation.decodeId(event.target.id));
    },

    render: function() {
        return (
            <div className="foundContent">
                <FoundType
                    itemTypes = {this.state.itemTypes}
                    places = {this.state.places}
                    selectedItemTypes = {this.state.selectedItemTypes}
                    selectedPlaces = {this.state.selectedPlaces}
                    selectItemTypeHandler = {this.selectItemTypeHandler}
                    selectPlaceHandler = {this.selectPlaceHandler}
                />
                <hr/>
                <FoundSection
                    data = {this.state.founds}
                />
            </div>
        )
    }
});

module.exports = Found;