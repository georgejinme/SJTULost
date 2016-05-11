var idOperation = require('../shared/util');

var UserActions = require('../flux/action/userAction');
var UserInfoStore = require('../flux/store/userInfoStore');

var FindingStore = require('../flux/store/findingStore');
var FoundStore = require('../flux/store/foundStore');


var MeInformation = React.createClass({

    getInitialState: function() {
        return {
            userInfo: UserInfoStore.getUserInfo(),
            updateResult: UserInfoStore.getUpdateResult(),
            updating: false
        }
    },

    componentDidMount: function() {
        UserInfoStore.addChangeListener(this._onChange);
        UserInfoStore.addUpdateListener(this._onUpdate);
        UserActions.fetchData();
    },

    componentWillUnmount: function() {
        UserInfoStore.removeChangeListener(this._onChange);
        UserInfoStore.removeUpdateListener(this._onUpdate);
    },

    _onChange: function () {
        this.setState({
            userInfo: UserInfoStore.getUserInfo()
        });
    },

    _onUpdate: function() {
        this.setState({
            updateResult: UserInfoStore.getUpdateResult(),
            updating: true
        });
        var that = this;
        setTimeout(function(){
            that.setState({
                updating: false
            })}, 2100
        )
    },

    phoneChange: function(ev) {
        UserInfoStore.setUserPhone(ev.target.value);
        UserInfoStore.emitChange()
    },

    studentNumberChange: function(ev) {
        UserInfoStore.setUserStudentNumber(ev.target.value);
        UserInfoStore.emitChange()
    },

    updateUserInfo: function() {
        UserActions.updateData(this.state.userInfo)
    },

    getAlertText: function() {
        if (this.state.updateResult == 1) return '更新成功';
        else return '更新失败, 请重新登录'
    },

    getAlertClass: function() {
        var c = 'alert alert-dismissible meInfoAlert';
        if (this.state.updating) c += ' updating';
        if (this.state.updateResult == 1) c += ' alert-success';
        else c += ' alert-danger';
        return c
    },

    render: function() {
        return (
            <div className="meInfo">
                <div className={this.getAlertClass()}>
                    <p>{this.getAlertText()}</p>
                </div>
                <h1>{this.state.userInfo['name']}</h1>
                <hr/>
                <div className="form-group">
                    <label className="control-label" htmlFor="focusedInput">联系方式</label>
                    <input className="form-control" id="focusedInput1" type="text" onChange={this.phoneChange} value={this.state.userInfo['phone']}/>
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="focusedInput">学号</label>
                    <input className="form-control" id="focusedInput2" type="text" onChange={this.studentNumberChange} value={this.state.userInfo['student_number']}/>
                </div>
                <a href="#" className="btn btn-success" onClick = {this.updateUserInfo}>修改完成</a>
            </div>
        )
    }
});

var MeFindingItem = React.createClass({
    render: function() {
        return (
            <div className="row meFindingItem">
                <div className="col-lg-6 col-md-6 col-sm-6 meFindingItemImage">
                    <span className='label-danger label'>Uncomplete</span>
                    <img src="/static/image/qwt.jpg" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 meFindingItemDetail">
                    <p className="meFindingItemDetailTitle">{this.props.json['description']}</p>
                    <p className="meFindingItemDetailInfo">物品类别: {this.props.json['item_type']}</p>
                    <p className="meFindingItemDetailInfo">遗失时间: {this.props.json['time']}</p>
                    <p className="meFindingItemDetailInfo">遗失地点: {this.props.json['place']}</p>
                    <p className="meFindingItemDetailInfo">详细位置: {this.props.json['place_detail']}</p>
                    <p className="meFindingItemDetailInfo">酬金: {this.props.json['pay']} 元</p>
                    <a href="#" className='btn btn-success meFindingBtn'>已经找到</a>
                </div>
            </div>
        )
    }
});

var MeFinding = React.createClass({
    getInitialState: function() {
        return {
            findings: FindingStore.getFindingsWithAmount()
        }
    },


    componentDidMount: function() {
        FindingStore.addChangeListener(this._onFindingChange);
        UserActions.fetchUserFindings();
    },

    componentWillUnmount: function() {
        FindingStore.removeChangeListener(this._onFindingChange);
    },

    _onFindingChange: function () {
        this.setState({
            findings: FindingStore.getFindingsWithAmount()
        });
    },

    render: function() {
        return (
            <div className="row meFinding">
                {
                    this.state.findings.map(function(val, index){
                        return (
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <MeFindingItem
                                    json = {val}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});

var MeFound = React.createClass({
    render: function() {
        return (
            <div>
                333
            </div>
        )
    }
});



var MeNavigation = React.createClass({
    getNavClass: function(selected) {
        if (selected == this.props.selected) return "active";
        else return ""
    },

    render: function() {
        return (
            <ul className="nav nav-pills nav-stacked meNav">
                <li className={this.getNavClass(0)}>
                    <a href = '#' id={idOperation.encodeId('meNav', 0)} onClick={this.props.navClick}>我的信息</a>
                </li>
                <li className={this.getNavClass(1)}>
                    <a href = '#' id={idOperation.encodeId('meNav', 1)} onClick={this.props.navClick}>我丢失过</a>
                </li>
                <li className={this.getNavClass(2)}>
                    <a href = '#' id={idOperation.encodeId('meNav', 2)} onClick={this.props.navClick}>我拾到过</a>
                </li>
                <li className={this.getNavClass(3)}>
                    <a href = '#' id={idOperation.encodeId('meNav', 3)} onClick={this.props.navClick}>退出登录</a>
                </li>
            </ul>
        )
    }
});



var MeDisplay = React.createClass({
    render: function() {
        if (this.props.selected == 0) {
            return (
                <div>
                    <MeInformation
                    />
                </div>
            )
        } else if (this.props.selected == 1) {
            return (
                <div>
                    <MeFinding />
                </div>
            )
        } else if (this.props.selected == 2) {
            return (
                <div>
                    <MeFound />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
});

var Me = React.createClass({
    getInitialState: function() {
        return {
            selectedNavItem: 0,
            userInfo: UserInfoStore.getUserInfo()
        }
    },

    meNavClick: function(ev){
        var id = idOperation.decodeId(ev.target.id);
        this.setState({
            selectedNavItem: id
        })
    },

    render: function() {
        return (
            <div className="meContent row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <MeNavigation
                        selected = {this.state.selectedNavItem}
                        navClick = {this.meNavClick}
                    />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9">
                    <MeDisplay
                        selected = {this.state.selectedNavItem}
                    />
                </div>
            </div>
        )
    }
});

module.exports = Me;