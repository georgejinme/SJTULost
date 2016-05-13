var React = require('react');

var FindingAction = require('../flux/action/initializationAction').FindingAction;
var FindingStore = require('../flux/store/findingStore');

var FindingViewBody = React.createClass({
    render: function() {
        return (
            <div className="findingViewBody">
                <p className="findingViewBodyTitle">{this.props.json['description']}</p>
                <div className="findingViewBodyImage">
                    <img src={this.props.json['img']} />
                </div>
                <hr/>
                <p>{this.props.json['detail']}</p>
            </div>
        )
    }
});

var FindingViewHeader = React.createClass({
    badgeColor: function() {
        if (this.props.json['state'] == 0) return 'label-danger label';
        else return 'label-success label';
    },

    badgeText: function() {
        if (this.props.json['state'] == 0) return 'Uncompleted';
        else return 'Completed'
    },

    render: function() {
        return(
            <div className="findingViewHeader">
                <span className={this.badgeColor()}>{this.badgeText()}</span>
                <p>物品类别: {this.props.json['item_type']}</p>
                <p>遗失时间: {this.props.json['time']}</p>
                <p>遗失地点: {this.props.json['place']}</p>
                <p>详细位置: {this.props.json['place_detail']}</p>
                <p>联系电话: {this.props.json['user_phone']}</p>
                <p>酬金: {this.props.json['pay']} 元</p>
            </div>

        )
    }
});

var FindingView = React.createClass({
    getInitialState: function() {
        return {
            finding: FindingStore.getFirstFinding()
        }
    },

    componentDidMount: function() {
        FindingStore.addChangeListener(this._onFindingChange);
        FindingAction.fetchDataWithId(this.props.id)
    },

    componentWillUnmount: function() {
        FindingStore.removeChangeListener(this._onFindingChange);
    },

    _onFindingChange: function() {
        this.setState({
            finding: FindingStore.getFirstFinding()
        })
    },

    render: function() {
        return (
            <div className="findingViewContent">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <FindingViewBody
                            json = {this.state.finding}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <FindingViewHeader
                            json = {this.state.finding}
                        />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = FindingView;