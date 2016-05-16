var React = require('react');
var Datetime = require('react-datetime');

var idOperation = require('../shared/util');

var FoundStore = require('../flux/store/foundStore');
var FoundAction = require('../flux/action/initializationAction').FoundAction;

var ItemTypeAction = require('../flux/action/initializationAction').ItemTypeAction;
var ItemStore = require('../flux/store/itemStore');
var PlaceAction = require('../flux/action/initializationAction').PlaceAction;
var PlaceStore = require('../flux/store/placeStore');

var PublishFoundBasicInfo = React.createClass({
    getItemChecked: function(val) {
        if (this.props.json['item_type_ids'].indexOf(val['id']) == -1) return '';
        else return 'checked'
    },

    getPlaceChecked: function(val) {
        if (this.props.json['place_id'] != val['id']) return '';
        else return 'checked'
    },

    render: function() {
        var itemChecked = this.getItemChecked;
        var placeChecked = this.getPlaceChecked;
        var itemTypeHandler = this.props.itemTypeHandler;
        var placeHandler = this.props.placeHandler;
        return (
            <div className="publishFoundBasicInfo">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>基本信息 (所有信息必填)</legend>
                        <div className="form-group">
                            <label htmlFor="publishFoundTitle" className="col-lg-2 col-md-2 col-sm-2 control-label">标题</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="publishFoundTitle"
                                       placeholder="Title"
                                       value={this.props.json['description']}
                                       onChange = {this.props.descriptionHandler}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFoundItem" className="col-lg-2 col-md-2 col-sm-2 control-label">物品类别 (多选)</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <div className = 'row'>
                                    {
                                        this.props.items.map(function(val, index) {
                                            if (index == 0) return;
                                            return (
                                                <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                                    <label>
                                                        <input type="checkbox"
                                                               checked={itemChecked(val)}
                                                               id = {idOperation.encodeId('publishFoundItem', index)}
                                                               onChange = {itemTypeHandler}/> {val['description']}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="publishFoundPlace" className="col-lg-2 col-md-2 col-sm-2 control-label">丢失地点 (单选)</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <div className = 'row'>
                                    {
                                        this.props.places.map(function(val, index) {
                                            if (index == 0) return;
                                            return (
                                                <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                                    <label>
                                                        <input type="checkbox"
                                                               checked={placeChecked(val)}
                                                               id = {idOperation.encodeId('publishFoundPlace', index)}
                                                               onChange={placeHandler}/> {val['description']}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFoundPlaceDetail" className="col-lg-2 col-md-2 col-sm-2 control-label">详细位置</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="publishFoundPlaceDetail"
                                       placeholder="Place detail"
                                       value={this.props.json['place_detail']}
                                       onChange = {this.props.placeDetailHandler}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFoundTime" className="col-lg-2 col-md-2 col-sm-2 control-label">丢失时间 <br/>(年-月-日 时:分:秒)</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <Datetime
                                    dateFormat = "YYYY-MM-DD"
                                    timeFormat = "hh:mm:ss"
                                    value = {this.props.json['time']}
                                    onChange = {this.props.timeHandler}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFoundDetail" className="col-lg-2 col-md-2 col-sm-2 control-label">详细描述</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <textarea className="form-control"
                                          rows="3"
                                          id="publishFoundDetail"
                                          value={this.props.json['detail']}
                                          onChange={this.props.detailHandler}/>
                                <span className="help-block">请尽量提供详细信息</span>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
});

var PublishFoundImage = React.createClass({
    getButtonText: function() {
        if (this.props.status == -1) return '选择文件';
        else if (this.props.status == 0) return '上传成功';
        else if (this.props.status == 1) return '上传失败';
        else if (this.props.status == 2) return '正在上传...';
        else return ''
    },
    render: function() {
        return (
            <div className="publishFoundImage">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>图片信息 (必填)</legend>
                        <div className="form-group">
                            <a href = "javascript:void(0);" className="col-lg-2 col-md-2 col-sm-2 btn btn-success publishFoundImageBtn">
                                <input id="foundFileupload" type="file" name="files[]" multiple />{this.getButtonText()}
                            </a>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <img src={this.props.json['img']} />

                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
});




var PublishFound = React.createClass({
    getInitialState: function() {
        return {
            found: FoundStore.getFirstFound(),
            itemTypes: ItemStore.getItems(),
            places: PlaceStore.getPlaces(),
            uploadImageStatus: FoundStore.getUploadImageStatus(),
            updateResult: FoundStore.getUpdateResult(),
            updating: false
        }
    },

    componentDidMount: function() {
        FoundStore.addChangeListener(this._onFoundChange);
        FoundStore.addUploadImageListener(this._onUploadImageChange);
        FoundStore.addUpdateListener(this._onUpdate);
        ItemStore.addChangeListener(this._onItemChange);
        ItemStore.addSelectListener(this._onItemSelectChange);
        PlaceStore.addChangeListener(this._onPlaceChange);
        PlaceStore.addSelectListener(this._onPlaceSelectChange);
        if (this.props.id != '') FoundAction.fetchDataWithId(this.props.id);
        FoundAction.uploadImageInit();
        ItemTypeAction.fetchData();
        PlaceAction.fetchData();
    },

    componentWillUnmount: function() {
        FoundStore.removeChangeListener(this._onFoundChange);
        FoundStore.removeUploadImageListener(this._onUploadImageChange);
        FoundStore.removeUpdateListener(this._onUpdate);
        ItemStore.removeChangeListener(this._onItemChange);
        ItemStore.removeSelectListener(this._onItemSelectChange);
        PlaceStore.removeChangeListener(this._onPlaceChange);
        PlaceStore.removeSelectListener(this._onPlaceSelectChange);
    },

    _onFoundChange: function() {
        this.setState({
            found: FoundStore.getFirstFound()
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

    _onItemSelectChange: function(){
        FoundStore.setItemTypeWithId(ItemStore.getSelectedItemsIdWithoutAll());
        FoundStore.emitChange()
    },

    _onPlaceSelectChange: function() {
        FoundStore.setPlacesWithId(PlaceStore.getSingleSelectedPlaceId());
        FoundStore.emitChange()
    },

    _onUploadImageChange: function() {
        this.setState({
            uploadImageStatus: FoundStore.getUploadImageStatus()
        })
    },

    _onUpdate: function() {
        this.setState({
            updateResult: FoundStore.getUpdateResult(),
            updating: true
        });
        if (this.state.updateResult == 0) window.location.href = '/';
        var that = this;
        setTimeout(function(){
            that.setState({
                updating: false
            })}, 2100
        )
    },

    descriptionChange: function(ev) {
        FoundStore.setDescription(ev.target.value);
        FoundStore.emitChange();
    },

    itemTypeChange: function(ev) {
        ItemTypeAction.select(idOperation.decodeId(ev.target.id));
    },

    placeChange: function(ev) {
        PlaceAction.select(idOperation.decodeId(ev.target.id), 'single');
    },

    timeChange: function(ev) {
        FoundStore.setTime(ev.format('YYYY-MM-DD hh:mm:ss'));
        FoundStore.emitChange();
    },

    placeDetailChange: function(ev) {
        FoundStore.setPlaceDetail(ev.target.value);
        FoundStore.emitChange();
    },

    detailChange: function(ev) {
        FoundStore.setDetail(ev.target.value);
        FoundStore.emitChange();
    },


    publish: function() {
        if (this.props.id == '') {
            FoundAction.createFound(this.state.found)
        } else {
            FoundAction.updateFound(this.state.found)
        }
        console.log(this.state.found)
    },

    getAlertText: function() {
        if (this.state.updateResult == 0) return '更新成功';
        else if (this.state.updateResult == 1) return '您有无效输入, 请检查';
        else return '更新失败, 请重新登录'
    },

    getAlertClass: function() {
        var c = 'alert alert-dismissible publishFoundAlert';
        if (this.state.updating) c += ' updating';
        if (this.state.updateResult == 0) c += ' alert-success';
        else c += ' alert-warning';
        return c
    },


    render: function() {
        return (
            <div className="publishFound">
                <div className={this.getAlertClass()}>
                    <p>{this.getAlertText()}</p>
                </div>
                <PublishFoundBasicInfo
                    json = {this.state.found}
                    items = {this.state.itemTypes}
                    places = {this.state.places}
                    descriptionHandler = {this.descriptionChange}
                    itemTypeHandler = {this.itemTypeChange}
                    placeHandler = {this.placeChange}
                    timeHandler = {this.timeChange}
                    placeDetailHandler = {this.placeDetailChange}
                    detailHandler = {this.detailChange}
                />
                <PublishFoundImage
                    json = {this.state.found}
                    status = {this.state.uploadImageStatus}
                />
                <hr/>
                <a href="#" className="btn btn-success publishBtn" onClick = {this.publish}>发布</a>
                <br/>
                <br/>
            </div>
        )
    }
});


module.exports = PublishFound;