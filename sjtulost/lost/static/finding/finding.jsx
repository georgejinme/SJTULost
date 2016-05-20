var React = require('react');

var ItemTypeAction = require('../flux/action/initializationAction').ItemTypeAction;
var PlaceAction = require('../flux/action/initializationAction').PlaceAction;
var FindingAction = require('../flux/action/initializationAction').FindingAction;

var ItemStore = require('../flux/store/itemStore');
var PlaceStore = require('../flux/store/placeStore');
var FindingStore = require('../flux/store/findingStore');

var idOperation = require('../shared/util');

var findingsEachPage = 10;

var FindingTypeRow = React.createClass({
    getSelectedClass: function(index) {
        if (this.props.selectedData[index] == true) return 'active';
        else return '';
    },

    render: function() {
        var handler = this.props.handler;
        var classes = this.getSelectedClass;
        return (
            <div className="row">
                <p className="col-lg-1 col-md-1 col-sm-1 findingTypeLabel">{ this.props.typeName }</p>
                <ul className="nav nav-pills col-lg-11 col-md-11 col-sm-11 findingTypeNav">
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
                    <a href = {'/findingview/' + this.props.json['id']} target = '_blank'>
                        <p className="findingItemTitle">{this.props.json['description']}</p>
                    </a>
                    <span className={this.badgeColor()}>{this.badgeText()}</span>
                    <p className="findingItemInfo">物品类别: {this.props.json['item_type']}</p>
                    <p className="findingItemInfo">遗失时间: {this.props.json['time']}</p>
                    <p className="findingItemInfo">遗失地点: {this.props.json['place']}. {this.props.json['place_detail']}</p>
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

var FindingPagination = React.createClass({
    getLeftArrowClass: function() {
        if (this.props.position == 1) return 'disabled';
        else return ''
    },

    getRightArrowClass: function() {
        var lastPos = 0;
        if (this.props.totalAmount % findingsEachPage == 0) lastPos = this.props.totalAmount / findingsEachPage;
        else lastPos = this.props.totalAmount / findingsEachPage + 1;
        lastPos = parseInt(lastPos);
        if (this.props.position == lastPos) return 'disabled';
        else return ''
    },

    getRangeClass: function(p) {
        if (p == this.props.position) return 'active';
        else return ''
    },

    getRange: function() {
        var lastPos = 0;
        if (this.props.totalAmount % findingsEachPage == 0) lastPos = this.props.totalAmount / findingsEachPage;
        else lastPos = this.props.totalAmount / findingsEachPage + 1;
        lastPos = parseInt(lastPos);
        var resArray = [];
        if (lastPos < 5) {
            for (var i = 1; i <= lastPos; ++i) resArray.push(i);
        }
        else if (this.props.position < 3) resArray = [1, 2, 3, 4, 5];
        else if (this.props.position > lastPos - 2) {
            resArray = [
                lastPos - 4,
                lastPos - 3,
                lastPos - 2,
                lastPos - 1,
                lastPos
            ]
        } else {
            resArray = [
                this.props.position - 2,
                this.props.position - 1,
                this.props.position,
                this.props.position + 1,
                this.props.position + 2
            ]
        }
        return resArray
    },

    render: function(){
        var range = this.getRange();
        var rangeClass = this.getRangeClass;
        var clickRange = this.props.clickRange;
        return (
            <ul className="pagination findingPagination">
                <li className={this.getLeftArrowClass()} onClick={this.props.clickPrevious}><a href="#">&laquo;</a></li>
                {
                    range.map(function(val, index){
                        return (
                            <li className={rangeClass(val)}
                                onClick={clickRange}>
                                <a href="#" id={idOperation.encodeId('findingPage', val)}>{val}</a>
                            </li>
                        )
                    })
                }
                <li className={this.getRightArrowClass()} onClick={this.props.clickNext}><a href="#">&raquo;</a></li>
            </ul>
        )
    }
});

var Finding = React.createClass({
    getInitialState: function() {
        return {
            itemTypes: ItemStore.getItems(),
            places: PlaceStore.getPlaces(),
            findings: FindingStore.getFindings(),
            selectedItemTypes: ItemStore.getSelectedItems(),
            selectedPlaces: PlaceStore.getSelectedPlaces(),
            totalAmount: FindingStore.getTotalAmount(),
            position: 1
        }
    },

    componentDidMount: function() {
        ItemStore.addChangeListener(this._onItemChange);
        PlaceStore.addChangeListener(this._onPlaceChange);
        FindingStore.addChangeListener(this._onFindingChange);
        ItemStore.addSelectListener(this._onItemSelectChange);
        PlaceStore.addSelectListener(this._onPlaceSelectChange);
        ItemTypeAction.fetchData();
        PlaceAction.fetchData();
        FindingAction.fetchData(1);
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
            selectedItemTypes: ItemStore.getSelectedItems(),
            position: 1
        });
        FindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId(), 1)
    },

    _onPlaceSelectChange: function() {
        this.setState({
            selectedPlaces: PlaceStore.getSelectedPlaces(),
            position: 1
        });
        FindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId(), 1)
    },

    _onFindingChange: function() {
        this.setState({
            findings: FindingStore.getFindings(),
            totalAmount: FindingStore.getTotalAmount()
        })
    },

    selectItemTypeHandler: function(event) {
        ItemTypeAction.select(idOperation.decodeId(event.target.id));
    },

    selectPlaceHandler: function(event) {
        PlaceAction.select(idOperation.decodeId(event.target.id));
    },

    clickPrevious: function() {
        FindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId(), this.state.position - 1);
        this.setState({
            position: this.state.position - 1
        });
    },

    clickNext: function() {
        FindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId(), this.state.position + 1);
        this.setState({
            position: this.state.position + 1
        });
    },

    clickRange: function(ev) {
        var id = idOperation.decodeId(ev.target.id);
        FindingAction.fetchDataWithFilter(ItemStore.getSelectedItemsId(), PlaceStore.getSelectedPlacesId(), id);
        this.setState({
            position: parseInt(id)
        });
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
                <FindingPagination
                    position = {this.state.position}
                    totalAmount = {this.state.totalAmount}
                    clickPrevious = {this.clickPrevious}
                    clickNext = {this.clickNext}
                    clickRange = {this.clickRange}
                />
            </div>
        )
    }
});

module.exports = Finding;