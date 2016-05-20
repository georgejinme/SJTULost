var React = require('react');

var FoundStore = require('../flux/store/foundStore');
var FoundAction = require('../flux/action/initializationAction').FoundAction;

var SearchFoundPagination = require('../shared/pagination');
var idOperation = require('../shared/util');

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
            founds: FoundStore.getFounds(),
            totalAmount: FoundStore.getTotalAmount(),
            position: 1
        }
    },

    componentDidMount: function() {
        FoundStore.addChangeListener(this._onChange);
        FoundAction.fetchDataWithKeyword(decodeURI(this.props.keyword), 1);
    },

    componentWillUnmount: function() {
        FoundStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            founds: FoundStore.getFounds(),
            totalAmount: FoundStore.getTotalAmount()
        });
    },

    clickPrevious: function() {
        FoundAction.fetchDataWithKeyword(decodeURI(this.props.keyword), this.state.position - 1);
        this.setState({
            position: this.state.position - 1
        });
    },

    clickNext: function() {
        FoundAction.fetchDataWithKeyword(decodeURI(this.props.keyword), this.state.position + 1);
        this.setState({
            position: this.state.position + 1
        });
    },

    clickRange: function(ev) {
        var id = idOperation.decodeId(ev.target.id);
        FoundAction.fetchDataWithKeyword(decodeURI(this.props.keyword), id);
        this.setState({
            position: parseInt(id)
        });
    },

    render: function() {
        return(
            <div className="searchFinding">
                <SearchFoundHeader
                    keyword = {decodeURI(this.props.keyword)}
                    amount = {this.state.totalAmount}
                />
                <hr/>
                <SearchFoundContent
                    founds = {this.state.founds}
                />
                <SearchFoundPagination
                    position = {this.state.position}
                    totalAmount = {this.state.totalAmount}
                    clickPrevious = {this.clickPrevious}
                    clickNext = {this.clickNext}
                    clickRange = {this.clickRange}
                    eachPage = {10}
                />
            </div>
        )
    }
});

module.exports = SearchFound;