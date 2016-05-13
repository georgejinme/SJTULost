var React = require('react');
var Datetime = require('react-datetime');

var PublishFindingBasicInfo = React.createClass({
    render: function() {
        return (
            <div>
                <form className="form-horizontal">
                    <fieldset>
                        <legend>基本信息</legend>
                        <div className="form-group">
                            <label htmlFor="publishFindingTitle" className="col-lg-2 control-label">标题</label>
                            <div className="col-lg-10">
                                <input type="text" className="form-control" id="publishFindingTitle" placeholder="Title" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingItem" className="col-lg-2 control-label">物品类别</label>
                            <div className="col-lg-10">
                                <select className="form-control" id="publishFindingItem">
                                    <option>手表</option>
                                    <option>手机</option>
                                    <option>钥匙</option>
                                    <option>钱包</option>
                                    <option>耳机</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="publishFindingPlace" className="col-lg-2 control-label">丢失地点</label>
                            <div className="col-lg-10">
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
                            <label htmlFor="publishFindingTime" className="col-lg-2 control-label">丢失时间</label>
                            <div className="col-lg-10">
                                <Datetime
                                    dateFormat = "YYYY/MM/DD"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingDetail" className="col-lg-2 control-label">详细描述</label>
                            <div className="col-lg-10">
                                <textarea className="form-control" rows="3" id="publishFindingDetail" />
                                <span className="help-block">请尽量提供详细信息</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="publishFindingPay" className="col-lg-2 control-label">酬金</label>
                            <div className="col-lg-10">
                                <input type="text" className="form-control" id="publishFindingPay" placeholder="Pay" />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-lg-10 col-lg-offset-2">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
});




var PublishFinding = React.createClass({
    render: function() {
        return (
            <div className="publishFinding">
                <PublishFindingBasicInfo />
            </div>
        )
    }
});


module.exports = PublishFinding;