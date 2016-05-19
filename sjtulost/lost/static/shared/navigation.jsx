/**
 * Created by gougoumemeda on 16/4/22.
 */
var constant = {
    'dev-prefix': 'http://127.0.0.1:8888'
};

var React = require('react');

var UserActions = require('../flux/action/userAction');
var UserInfoStore = require('../flux/store/userInfoStore');

var Homepage = require('../home/home');
var Finding = require('../finding/finding');
var Found = require('../found/found');
var Rank = require('../rank/rank');
var FindingView = require('../finding/findingview');
var FoundView = require('../found/foundview');
var Me = require('../me/me');
var PublishFinding = require('../publish/publishfinding');
var PublishFound = require('../publish/publishfound');
var SearchFinding = require('../search/searchfinding');
var SearchFound = require('../search/searchfound');

var Navigation = React.createClass({
    getInitialState: function() {
        return {
            userInfo: UserInfoStore.getUserInfo(),
            searchInfo: ''
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

    searchChange:function(ev) {
        this.setState({
            searchInfo: ev.target.value
        });
    },

    getUrl: function() {
        if (this.state.userInfo['student_number'] == '') return '/loginwithjaccount/';
        else return '/me/';
    },

    getPublishUrl: function() {
        if (this.state.userInfo['student_number'] == '') return 'navPublishHidden dropdown';
        else return 'dropdown';
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
                                <a href = "/found/">拾物</a>
                            </li>
                            <li>
                                <a href = "/rank/">排行</a>
                            </li>
                        </ul>
                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                                <input type="text"
                                       className="form-control"
                                       placeholder="搜索"
                                       value={this.state.searchInfo}
                                       onChange={this.searchChange}/>
                            </div>
                            <a href={'/searchfinding/' + this.state.searchInfo} className="btn btn-default searchButton">遗失物</a>
                            <a href={'/searchfound/' + this.state.searchInfo} className="btn btn-default searchButton">拾到物</a>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li className={this.getPublishUrl()}>
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">发布<span className="caret" /></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a href="/publishfinding/">我丢失了</a></li>
                                    <li><a href="/publishfound/">我拾到了</a></li>
                                </ul>
                            </li>
                            <li><a href={this.getUrl()}>{ this.state.userInfo['name'] }</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

var Footer = React.createClass({
    render:function() {
        return (
            <div className="footer">
                <p>Made by
                    <a href="http://georgejin.me" target="_blank"> George Jin.</a>
                </p>
                <p>Code released on
                    <a href="https://github.com/gougoumemeda/SJTULost" target="_blank"> Github</a>
                </p>
                <p>Bug? Suggestion? Please contact me at
                    <a href="mailto:gougoumemeda@sjtu.edu.cn"> gougoumemeda@sjtu.edu.cn</a>
                </p>
                <br/>
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
                    <div className="sjtulostContent">
                        <Homepage />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'finding'){
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <Finding />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'found') {
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <Found />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'rank') {
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <Rank />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'findingview') {
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <FindingView
                            id = {this.id}
                        />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'foundview') {
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <FoundView
                            id = {this.id}
                        />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'me') {
            return (
                <div className="meContainer">
                    <Navigation />
                    <div className="sjtulostContent">
                        <Me />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'publishfinding') {
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <PublishFinding
                            id = {this.id}
                        />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'publishfound') {
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <PublishFound
                            id = {this.id}
                        />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'searchfinding') {
            return (
                <div className="container">
                    <Navigation />
                    <div className="sjtulostContent">
                        <SearchFinding
                            keyword = {this.id}
                        />
                    </div>
                    <hr/>
                    <Footer />
                </div>
            )
        } else if (this.url == 'searchfound') {
            return (
                <div className="container">
                    <Navigation/>
                    <div className="sjtulostContent">
                        <SearchFound
                            keyword = {this.id}
                        />
                    </div>
                    <hr />
                    <Footer />
                </div>
            )
        }
    }
});

React.render(
    <App />,
    document.getElementById('content')
);
