var idOperation = require('../shared/util');

var UserActions = require('../flux/action/userAction');
var UserInfoStore = require('../flux/store/userInfoStore');


var MeInformation = React.createClass({
    render: function() {
        return (
            <div>
                <h1>{this.props.json['name']}</h1>
                <hr/>
                <p>手机: {this.props.json['phone']}</p>
                <p>学号: {this.props.json['student_number']}</p>
                <a href="#" className="btn btn-primary">编辑</a>
            </div>
        )
    }
});

var MeFinding = React.createClass({
    render: function() {
        return (
            <div>
                222
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
                        json = {this.props.userInfo}
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

    componentDidMount: function() {
        UserInfoStore.addChangeListener(this._onChange);
        UserActions.fetchData();
    },

    componentWillUnmount: function() {
        UserInfoStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            userInfo: UserInfoStore.getUserInfo()
        });
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
                        userInfo = {this.state.userInfo}
                    />
                </div>
            </div>
        )
    }
});

module.exports = Me;