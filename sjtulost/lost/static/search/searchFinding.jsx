var React = require('react');

var FindingStore = require('../flux/store/findingStore');
var FindingAction = require('../flux/action/initializationAction').FindingAction;

var SearchFindingHeader = React.createClass({
    render: function() {
        return (
            <div>
                <p>为您显示带有关键字 <strong>{this.props.keyword}</strong> 的结果, 共3条</p>
            </div>
        )
    }
});

var SearchFindingItem = React.createClass({
    render: function() {
        return (
            <div className="row searchFindingItem">
                <div className="col-lg-6 col-md-6 col-sm-6 searchFindingImage">
                    <span className='label-danger label'>Uncompleted</span>
                    <img src='/static/image/qwt.jpg' />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 searchFindingItemContent">
                    <a href = '#' target = '_blank'>
                        <p className="searchFindingItemTitle">haahha</p>
                    </a>
                    <p className="searchFindingItemDetail">物品类别: 钥匙</p>
                    <p className="searchFindingItemDetail">遗失时间: 2016-01-20 13:02:32</p>
                    <p className="searchFindingItemDetail">遗失地点: 电群</p>
                    <p className="searchFindingItemDetail">详细位置: 电群三号楼</p>
                    <p className="searchFindingItemDetail">酬金: 40 元</p>
                </div>
            </div>
        )
    }
});

var SearchFindingContent = React.createClass({
    render: function() {
        return (
            <div className="row searchFindingContent ">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <SearchFindingItem />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <SearchFindingItem />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <SearchFindingItem />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <SearchFindingItem />
                </div>
            </div>
        )
    }
});


var SearchFinding = React.createClass({

    getInitialState: function() {
        return {
            findings: FindingStore.getFindingsWithAmount()
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

    render: function() {
        return(
            <div className="searchFinding">
                <SearchFindingHeader
                    keyword = {decodeURI(this.props.keyword)}
                />
                <hr/>
                <SearchFindingContent />
            </div>
        )
    }
});

module.exports = SearchFinding;