/**
 * Created by gougoumemeda on 16/4/22.
 */
var constant = {
    'dev-prefix': 'http://127.0.0.1:8888'
};

var JaccountLoginActions = require('../flux/action/loginAction');
var UserInfoStore = require('../flux/store/userInfoStore');

var Homepage = require('../home/home');
var Finding = require('../finding/finding');
var Found = require('../found/found');
var Rank = require('../rank/rank');
var FindingView = require('../finding/findingview');

var Navigation = React.createClass({
    getInitialState: function() {
        return {
            name: UserInfoStore.getUserName()
        }
    },

    componentDidMount: function() {
        UserInfoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserInfoStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            name: UserInfoStore.getUserName()
        });
    },

    login: function() {
        JaccountLoginActions.login()
    },

    render: function() {
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand" target = "_blank">SJTU Lost</a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href = "/finding/" target = "_blank">丢失</a>
                            </li>
                            <li>
                                <a href = "/found/" target = "_blank">拾物</a>
                            </li>
                            <li>
                                <a href = "/rank/" target = "_blank">排行</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">发布</a></li>
                            <li><a href="javascript:void(0);" onClick = { this.login }>{ this.state.name }</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

var App = React.createClass({
    url: window.location.href.split('/')[3],
    id: window.location.href.split('/')[4],

    render: function() {
        if (this.url == '') {
            return (
                <div className="container">
                    <Navigation />
                    <Homepage />
                </div>
            )
        } else if (this.url == 'finding'){
            return (
                <div className="container">
                    <Navigation />
                    <Finding />
                </div>
            )
        } else if (this.url == 'found') {
            return (
                <div className="container">
                    <Navigation />
                    <Found />
                </div>
            )
        } else if (this.url == 'rank') {
            return (
                <div className="container">
                    <Navigation />
                    <Rank />
                </div>
            )
        } else if (this.url == 'findingview') {
            return (
                <div className="container">
                    <Navigation />
                    <FindingView
                        id = {this.id}
                    />
                </div>
            )
        }
    }
});

React.render(
    <App />,
    document.getElementById('content')
);
