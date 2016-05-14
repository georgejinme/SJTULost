var React = require('react');
var Datetime = require('react-datetime');

var FindingStore = require('../flux/store/findingStore');
var FindingAction = require('../flux/action/initializationAction').FindingAction;

var PublishFindingBasicInfo = React.createClass({
    render: function() {
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
                                    <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                        <label>
                                            <input type="checkbox" /> 手表
                                        </label>
                                    </div>
                                    <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                        <label>
                                            <input type="checkbox" /> 手机
                                        </label>
                                    </div>
                                    <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                        <label>
                                            <input type="checkbox" /> 耳机
                                        </label>
                                    </div>
                                    <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                        <label>
                                            <input type="checkbox" /> 钱包
                                        </label>
                                    </div>
                                    <div className="checkbox col-lg-2 col-md-2 col-sm-2">
                                        <label>
                                            <input type="checkbox" /> 钥匙
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="publishFindingPlace" className="col-lg-2 col-md-2 col-sm-2 control-label">丢失地点</label>
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <select className="form-control" id="publishFindingPlace">
                                    <option>二餐</option>
                                    <option>一餐</option>
                                    <option>D16</option>
                                    <option>男体</option>
                                    <option>东转</option>
                                </select>
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

                        <div className="form-group">
                            <div className="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2">
                                <button type="submit" className="btn btn-success">发布</button>
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
            finding: FindingStore.getFirstFinding()
        }
    },

    componentDidMount: function() {
        FindingStore.addChangeListener(this._onChange);
        if (this.props.id != '') FindingAction.fetchDataWithId(this.props.id);
    },

    componentWillUnmount: function() {
        FindingStore.removeChangeListener(this._onChange)
    },

    _onChange: function() {
        this.setState({
            finding: FindingStore.getFirstFinding()
        })
    },

    render: function() {
        return (
            <div className="publishFinding">
                <PublishFindingBasicInfo
                    json = {this.state.finding}
                />
            </div>
        )
    }
});


module.exports = PublishFinding;