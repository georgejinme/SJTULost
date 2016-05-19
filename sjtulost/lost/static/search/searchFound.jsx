var React = require('react');

var FoundStore = require('../flux/store/foundStore');
var FoundAction = require('../flux/action/initializationAction').FoundAction;

var SearchFoundHeader = React.createClass({
    getKeywordText: function() {
        return this.props.keyword.replace('|', ' ')
    },
    render: function() {
        return (
            <div>
                <p>为您显示带有关键字 <strong>{this.getKeywordText()}</strong> 的结果, 共{this.props.amount}条</p>
            </div>
        )
    }
});

var SearchFoundItem = React.createClass({
    badgeColor: function() {
        if (this.props.json['state'] == 0) return 'label-danger label';
        else return 'label-success label';
    },

    badgeText: function() {
        if (this.props.json['state'] == 0) return 'Uncompleted';
        else return 'Completed'
    },

    render: function() {
        return (
            <div className="row searchFoundItem">
                <div className="col-lg-6 col-md-6 col-sm-6 searchFoundImage">
                    <span className={this.badgeColor()}>{this.badgeText()}</span>
                    <img src={this.props.json['img']} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 searchFoundItemContent">
                    <a href = {'/foundview/' + this.props.json['id']} target = '_blank'>
                        <p className="searchFoundItemTitle">{this.props.json['description']}</p>
                    </a>
                    <p className="searchFoundItemDetail">物品类别: {this.props.json['item_type']}</p>
                    <p className="searchFoundItemDetail">遗失时间: {this.props.json['time']}</p>
                    <p className="searchFoundItemDetail">遗失地点: {this.props.json['place']}</p>
                    <p className="searchFoundItemDetail">详细位置: {this.props.json['place_detail']}</p>
                </div>
            </div>
        )
    }
});

var SearchFoundContent = React.createClass({
    render: function() {
        return (
            <div className="row searchFoundContent ">
                {
                    this.props.founds.map(function(val, index) {
                        return (
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <SearchFoundItem
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


var SearchFound = React.createClass({

    getInitialState: function() {
        return {
            founds: FoundStore.getFoundsWithAmount()
        }
    },

    componentDidMount: function() {
        FoundStore.addChangeListener(this._onChange);
        FoundAction.fetchDataWithKeyword(decodeURI(this.props.keyword));
    },

    componentWillUnmount: function() {
        FoundStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            founds: FoundStore.getFoundsWithAmount()
        });
    },

    render: function() {
        return(
            <div className="searchFinding">
                <SearchFoundHeader
                    keyword = {decodeURI(this.props.keyword)}
                    amount = {this.state.founds.length}
                />
                <hr/>
                <SearchFoundContent
                    founds = {this.state.founds}
                />
            </div>
        )
    }
});

module.exports = SearchFound;