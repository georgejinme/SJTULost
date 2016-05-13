var React = require('react');

var FoundAction = require('../flux/action/initializationAction').FoundAction;
var FoundStore = require('../flux/store/foundStore');

var FoundViewBody = React.createClass({
    render: function() {
        return (
            <div className="foundViewBody">
                <p className="foundViewBodyTitle">{this.props.json['description']}</p>
                <div className="foundViewBodyImage">
                    <img src={this.props.json['img']} />
                </div>
                <hr/>
                <p>{this.props.json['detail']}</p>
            </div>
        )
    }
});

var FoundViewHeader = React.createClass({
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
            <div className="foundViewHeader">
                <span className={this.badgeColor()}>{this.badgeText()}</span>
                <p>物品类别: {this.props.json['item_type']}</p>
                <p>拾物时间: {this.props.json['time']}</p>
                <p>拾物地点: {this.props.json['place']}</p>
                <p>详细位置: {this.props.json['place_detail']}</p>
                <p>联系电话: {this.props.json['user_phone']}</p>
            </div>

        )
    }
});

var FoundView = React.createClass({
    getInitialState: function() {
        return {
            found: FoundStore.getFirstFound()
        }
    },

    componentDidMount: function() {
        FoundStore.addChangeListener(this._onFoundChange);
        FoundAction.fetchDataWithId(this.props.id)
    },

    componentWillUnmount: function() {
        FoundStore.removeChangeListener(this._onFoundChange);
    },

    _onFoundChange: function() {
        this.setState({
            found: FoundStore.getFirstFound()
        })
    },

    render: function() {
        return (
            <div className="foundViewContent">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <FoundViewBody
                            json = {this.state.found}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <FoundViewHeader
                            json = {this.state.found}
                        />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = FoundView;