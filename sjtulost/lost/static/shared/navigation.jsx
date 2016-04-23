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
                        <a href="/" className="navbar-brand">SJTU Lost</a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href = "/finding/">丢失</a>
                            </li>
                            <li>
                                <a href = "#">拾物</a>
                            </li>
                            <li>
                                <a href = "#">排行</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#" onClick = { this.login }>{ this.state.name }</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

var App = React.createClass({
    render: function() {
        if (window.location.href == constant['dev-prefix'] + '/') {
            return (
                <div>
                    <Navigation />
                    <Homepage />
                </div>
            )
        } else if (window.location.href == constant['dev-prefix'] + '/finding/'){
            return (
                <div>
                    <Navigation />
                    <Finding />
                </div>
            )
        }
    }
})

React.render(
    <App />,
    document.getElementById('content')
);
