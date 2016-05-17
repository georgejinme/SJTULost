var React = require('react');
var Datetime = require('react-datetime');

var idOperation = require('../shared/util');

var FindingStore = require('../flux/store/findingStore');
var FindingAction = require('../flux/action/initializationAction').FindingAction;

var ItemTypeAction = require('../flux/action/initializationAction').ItemTypeAction;
var ItemStore = require('../flux/store/itemStore');
var PlaceAction = require('../flux/action/initializationAction').PlaceAction;
var PlaceStore = require('../flux/store/placeStore');

var PublishFindingBasicInfo = React.createClass({
    getItemChecked: function(val) {
        if (this.props.json['item_type_ids'].indexOf(val['id']) == -1) return '';
        else return 'checked'
    },

    getPlaceChecked: function(val) {
        if (this.props.json['place_ids'].indexOf(val['id']) == -1) return '';
        else return 'checked'
    },

    render: function() {
        var itemChecked = this.getItemChecked;
        var placeChecked = this.getPlaceChecked;
        var itemTypeHandler = this.props.itemTypeHandler;
        var placeHandler = this.props.placeHandler;
        return (
            <div className="publishFindingBasicInfo">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>基本信息 (所有信息必填)</legend>
                        <div className="form-group">
                            <label htmlFor="publishFindingTitle" className="col-lg-2 col-md-2 col-sm-2 control-label">标题</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="publishFindingTitle"
                                       placeholder="Title"
                                       value={this.props.json['description']}
                                       onChange = {this.props.descriptionHandler}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingItem" className="col-lg-2 col-md-2 col-sm-2 control-label">物品类别 (多选)</label>
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
                                                               id = {idOperation.encodeId('publishFindingItem', index)}
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
                            <label htmlFor="publishFindingPlace" className="col-lg-2 col-md-2 col-sm-2 control-label">丢失地点 (多选)</label>
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
                                                               id = {idOperation.encodeId('publishFindingPlace', index)}
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
                            <label htmlFor="publishFindingPlaceDetail" className="col-lg-2 col-md-2 col-sm-2 control-label">详细位置</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="publishFindingPlaceDetail"
                                       placeholder="Place detail"
                                       value={this.props.json['place_detail']}
                                       onChange = {this.props.placeDetailHandler}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingTime" className="col-lg-2 col-md-2 col-sm-2 control-label">丢失时间 <br/>(年-月-日 时:分:秒)</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <Datetime
                                    dateFormat = "YYYY-MM-DD"
                                    timeFormat = "HH:mm:ss"
                                    value = {this.props.json['time']}
                                    onChange = {this.props.timeHandler}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingDetail" className="col-lg-2 col-md-2 col-sm-2 control-label">详细描述</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <textarea className="form-control"
                                          rows="3"
                                          id="publishFindingDetail"
                                          value={this.props.json['detail']}
                                          onChange={this.props.detailHandler}/>
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
                                       value={this.props.json['pay']}
                                       onChange={this.props.payHandler}/>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
});

var PublishFindingImage = React.createClass({
    getButtonText: function() {
        if (this.props.status == -1) return '选择文件';
        else if (this.props.status == 0) return '上传成功';
        else if (this.props.status == 1) return '上传失败';
        else if (this.props.status == 2) return '正在上传...';
        else return ''
    },
    render: function() {
        return (
            <div className="publishFindingImage">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>图片信息 (必填)</legend>
                        <div className="form-group">
                            <a href = "javascript:void(0);" className="col-lg-2 col-md-2 col-sm-2 btn btn-success publishFindingImageBtn">
                                <input id="findingFileupload" type="file" name="files[]" multiple />{this.getButtonText()}
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




var PublishFinding = React.createClass({
    getInitialState: function() {
        return {
            finding: FindingStore.getFirstFinding(),
            itemTypes: ItemStore.getItems(),
            places: PlaceStore.getPlaces(),
            uploadImageStatus: FindingStore.getUploadImageStatus(),
            updateResult: FindingStore.getUpdateResult(),
            updating: false
        }
    },

    componentDidMount: function() {
        FindingStore.addChangeListener(this._onFindingChange);
        FindingStore.addUploadImageListener(this._onUploadImageChange);
        FindingStore.addUpdateListener(this._onUpdate);
        ItemStore.addChangeListener(this._onItemChange);
        ItemStore.addSelectListener(this._onItemSelectChange);
        PlaceStore.addChangeListener(this._onPlaceChange);
        PlaceStore.addSelectListener(this._onPlaceSelectChange);
        if (this.props.id != '') FindingAction.fetchDataWithId(this.props.id);
        FindingAction.uploadImageInit();
        ItemTypeAction.fetchData();
        PlaceAction.fetchData();
    },

    componentWillUnmount: function() {
        FindingStore.removeChangeListener(this._onFindingChange);
        FindingStore.removeUploadImageListener(this._onUploadImageChange);
        FindingStore.removeUpdateListener(this._onUpdate);
        ItemStore.removeChangeListener(this._onItemChange);
        ItemStore.removeSelectListener(this._onItemSelectChange);
        PlaceStore.removeChangeListener(this._onPlaceChange);
        PlaceStore.removeSelectListener(this._onPlaceSelectChange);
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

    _onItemSelectChange: function(){
        FindingStore.setItemTypeWithId(ItemStore.getSelectedItemsIdWithoutAll());
        FindingStore.emitChange()
    },

    _onPlaceSelectChange: function() {
        FindingStore.setPlacesWithId(PlaceStore.getSelectedPlacesIdWithoutAll());
        FindingStore.emitChange()
    },

    _onUploadImageChange: function() {
        this.setState({
            uploadImageStatus: FindingStore.getUploadImageStatus()
        })
    },

    _onUpdate: function() {
        this.setState({
            updateResult: FindingStore.getUpdateResult(),
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
        FindingStore.setDescription(ev.target.value);
        FindingStore.emitChange();
    },

    itemTypeChange: function(ev) {
        ItemTypeAction.select(idOperation.decodeId(ev.target.id));
    },

    placeChange: function(ev) {
        PlaceAction.select(idOperation.decodeId(ev.target.id));
    },

    timeChange: function(ev) {
        console.log(ev.format('YYYY-MM-DD HH:mm:ss'))
        FindingStore.setTime(ev.format('YYYY-MM-DD HH:mm:ss'));
        FindingStore.emitChange();
    },

    placeDetailChange: function(ev) {
        FindingStore.setPlaceDetail(ev.target.value);
        FindingStore.emitChange();
    },

    detailChange: function(ev) {
        FindingStore.setDetail(ev.target.value);
        FindingStore.emitChange();
    },

    payChange: function(ev) {
        FindingStore.setPay(ev.target.value);
        FindingStore.emitChange();
    },

    publish: function() {
        if (this.props.id == '') {
            FindingAction.createFinding(this.state.finding)
        } else {
            FindingAction.updateFinding(this.state.finding)
        }
        console.log(this.state.finding)
    },

    getAlertText: function() {
        if (this.state.updateResult == 0) return '更新成功';
        else if (this.state.updateResult == 1) return '您有无效输入, 请检查';
        else if (this.state.updateResult == 2) return '更新失败, 请重新登录';
        else return '请先前往个人主页填写正确的手机号码';
    },

    getAlertClass: function() {
        var c = 'alert alert-dismissible publishFindingAlert';
        if (this.state.updating) c += ' updating';
        if (this.state.updateResult == 0) c += ' alert-success';
        else c += ' alert-warning';
        return c
    },


    render: function() {
        return (
            <div className="publishFinding">
                <div className={this.getAlertClass()}>
                    <p>{this.getAlertText()}</p>
                </div>
                <PublishFindingBasicInfo
                    json = {this.state.finding}
                    items = {this.state.itemTypes}
                    places = {this.state.places}
                    descriptionHandler = {this.descriptionChange}
                    itemTypeHandler = {this.itemTypeChange}
                    placeHandler = {this.placeChange}
                    timeHandler = {this.timeChange}
                    placeDetailHandler = {this.placeDetailChange}
                    detailHandler = {this.detailChange}
                    payHandler = {this.payChange}
                />
                <PublishFindingImage
                    json = {this.state.finding}
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


module.exports = PublishFinding;