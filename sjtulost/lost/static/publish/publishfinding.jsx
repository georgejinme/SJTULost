var React = require('react');
var Datetime = require('react-datetime');

var FindingStore = require('../flux/store/findingStore');
var FindingAction = require('../flux/action/initializationAction').FindingAction;

var ItemTypeAction = require('../flux/action/initializationAction').ItemTypeAction;
var ItemStore = require('../flux/store/itemStore');
var PlaceAction = require('../flux/action/initializationAction').PlaceAction;
var PlaceStore = require('../flux/store/placeStore');

var PublishFindingBasicInfo = React.createClass({
    getItemChecked: function(val) {
        if (this.props.json['item_type'].indexOf(val) == -1) return '';
        else return 'checked'
    },

    getPlaceChecked: function(val) {
        if (this.props.json['place'].indexOf(val) == -1) return '';
        else return 'checked'
    },

    render: function() {
        var itemChecked = this.getItemChecked;
        var placeChecked = this.getPlaceChecked;
        return (
            <div className="publishFindingBasicInfo">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>基本信息</legend>
                        <div className="form-group">
                            <label htmlFor="publishFindingTitle" className="col-lg-2 col-md-2 col-sm-2 control-label">标题</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="publishFindingTitle"
                                       placeholder="Title"
                                       value={this.props.json['description']}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingItem" className="col-lg-2 col-md-2 col-sm-2 control-label">物品类别</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <div className = 'row'>
                                    {
                                        this.props.items.map(function(val, index) {
                                            if (index == 0) return;
                                            return (
                                                <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                                    <label>
                                                        <input type="checkbox" checked={itemChecked(val)}/> {val['description']}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="publishFindingPlace" className="col-lg-2 col-md-2 col-sm-2 control-label">丢失地点</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <div className = 'row'>
                                    {
                                        this.props.places.map(function(val, index) {
                                            if (index == 0) return;
                                            return (
                                                <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                                    <label>
                                                        <input type="checkbox" checked={placeChecked(val)}/> {val['description']}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingPlaceDetail" className="col-lg-2 col-md-2 col-sm-2 control-label">详细位置</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="publishFindingPlaceDetail"
                                       placeholder="Place detail"
                                       value={this.props.json['place_detail']}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingTime" className="col-lg-2 col-md-2 col-sm-2 control-label">丢失时间</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <Datetime
                                    dateFormat = "YYYY/MM/DD"
                                    timeFormat = "hh:mm:ss"
                                    defaultValue = {this.props.json['time']}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingDetail" className="col-lg-2 col-md-2 col-sm-2 control-label">详细描述</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <textarea className="form-control"
                                          rows="3"
                                          id="publishFindingDetail"
                                          value={this.props.json['detail']}/>
                                <span className="help-block">请尽量提供详细信息</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingPay" className="col-lg-2 col-md-2 col-sm-2 control-label">酬金</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="publishFindingPay"
                                       placeholder="Pay"
                                       value={this.props.json['pay']}/>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
});

var PublishFindingImage = React.createClass({
    render: function() {
        return (
            <div className="PublishFindingImage">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>图片信息</legend>
                        <div className="form-group">
                            <div className="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2">
                                <img src="" />
                                <a href = "javascript:void(0);" className="btn btn-success publishFindingImageBtn">
                                    <input id="fileupload" type="file" name="files[]" ref="fileupload" multiple />选择文件
                                </a>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
});




var PublishFinding = React.createClass({
    getInitialState: function() {
        return {
            finding: FindingStore.getFirstFinding(),
            itemTypes: ItemStore.getItems(),
            places: PlaceStore.getPlaces()
        }
    },

    componentDidMount: function() {
        FindingStore.addChangeListener(this._onFindingChange);
        ItemStore.addChangeListener(this._onItemChange);
        PlaceStore.addChangeListener(this._onPlaceChange);
        if (this.props.id != '') FindingAction.fetchDataWithId(this.props.id);
        FindingAction.uploadImageInit();
        ItemTypeAction.fetchData();
        PlaceAction.fetchData();
    },

    componentWillUnmount: function() {
        FindingStore.removeChangeListener(this._onFindingChange);
        ItemStore.removeChangeListener(this._onItemChange);
        PlaceStore.removeChangeListener(this._onPlaceChange);
    },

    _onFindingChange: function() {
        this.setState({
            finding: FindingStore.getFirstFinding()
        })
    },

    _onItemChange: function () {
        this.setState({
            itemTypes: ItemStore.getItems()
        })
    },

    _onPlaceChange: function() {
        this.setState({
            places: PlaceStore.getPlaces()
        })
    },

    render: function() {
        return (
            <div className="publishFinding">
                <PublishFindingBasicInfo
                    json = {this.state.finding}
                    items = {this.state.itemTypes}
                    places = {this.state.places}
                />
                <PublishFindingImage />
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2">
                            <button type="submit" className="btn btn-success">发布</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});


module.exports = PublishFinding;