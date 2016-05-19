var React = require('react');

var FindingStore = require('../flux/store/findingStore');
var FindingAction = require('../flux/action/initializationAction').FindingAction;

var SearchFindingHeader = React.createClass({
    render: function() {
        return (
            <div>
                <p>为您显示带有关键字 <strong>{this.props.keyword}</strong> 的结果, 共{this.props.amount}条</p>
            </div>
        )
    }
});

var SearchFindingItem = React.createClass({
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
            <div className="row searchFindingItem">
                <div className="col-lg-6 col-md-6 col-sm-6 searchFindingImage">
                    <span className={this.badgeColor()}>{this.badgeText()}</span>
                    <img src={this.props.json['img']} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 searchFindingItemContent">
                    <a href = {'/findingview/' + this.props.json['id']} target = '_blank'>
                        <p className="searchFindingItemTitle">{this.props.json['description']}</p>
                    </a>
                    <p className="searchFindingItemDetail">物品类别: {this.props.json['item_type']}</p>
                    <p className="searchFindingItemDetail">遗失时间: {this.props.json['time']}</p>
                    <p className="searchFindingItemDetail">遗失地点: {this.props.json['place']}</p>
                    <p className="searchFindingItemDetail">详细位置: {this.props.json['place_detail']}</p>
                    <p className="searchFindingItemDetail">酬金: {this.props.json['pay']} 元</p>
                </div>
            </div>
        )
    }
});

var SearchFindingContent = React.createClass({
    render: function() {
        return (
            <div className="row searchFindingContent ">
                {
                    this.props.findings.map(function(val, index) {
                        return (
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <SearchFindingItem
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


var SearchFinding = React.createClass({

    getInitialState: function() {
        return {
            findings: FindingStore.getFindingsWithAmount()
        }
    },

    componentDidMount: function() {
        FindingStore.addChangeListener(this._onChange);
        FindingAction.fetchDataWithKeyword(decodeURI(this.props.keyword));
    },

    componentWillUnmount: function() {
        FindingStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            findings: FindingStore.getFindingsWithAmount()
        });
    },

    render: function() {
        return(
            <div className="searchFinding">
                <SearchFindingHeader
                    keyword = {decodeURI(this.props.keyword)}
                    amount = {this.state.findings.length}
                />
                <hr/>
                <SearchFindingContent
                    findings = {this.state.findings}
                />
            </div>
        )
    }
});

module.exports = SearchFinding;