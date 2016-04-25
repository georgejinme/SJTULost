var InitializationAction = require('../flux/action/initializationAction');
var FindingStore = require('../flux/store/findingStore');
var FoundStore = require('../flux/store/foundStore');


var HomepageItems = React.createClass({
    badgeColor: function() {
        if (this.props.json['state'] == 0) return 'label-danger label homepageItemState';
        else return 'label-success label homepageItemState';
    },

    badgeText: function() {
        if (this.props.json['state'] == 0) return 'Uncompleted';
        else return 'Completed'
    },

    render: function() {
        return (
            <div className="homepageItem">
                <span className={this.badgeColor()}>{this.badgeText()}</span>
                <img src={this.props.json['img']} className="img-rounded homepageItemImage" />
                <div className="homepageItemDetail">
                    <p className="homepageItemDetailTitle">{this.props.json['description']}</p>
                    <p className="homepageItemDetailInfo">遗失时间: {this.props.json['lost_time']}</p>
                    <p className="homepageItemDetailInfo">遗失地点: {this.props.json['lost_place']}</p>
                    <p className="homepageItemDetailInfo">联系电话: {this.props.json['user_phone']}</p>
                </div>
            </div>
        )
    }
});

var HomepageRow = React.createClass({
    render: function() {
        return (
            <div className="row">
                {
                this.props.data.map(function(val, index){
                    return (
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <HomepageItems
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

var HomepageSection = React.createClass({
    render: function() {
        return (
            <div className="container">
                <h1>{ this.props.title} </h1>
                <hr/>
                <HomepageRow
                    data = {this.props.data}
                />
            </div>
        )
    }
});



var HomePage = React.createClass({
    getInitialState: function() {
        return {
            findings: FindingStore.getFindingsWithAmount(4),
            founds: FoundStore.getFoundsWithAmount(4)
        }
    },


    componentDidMount: function() {
        FindingStore.addChangeListener(this._onFindingChange);
        FoundStore.addChangeListener(this._onFoundChange);
        InitializationAction.fetchData()
    },

    componentWillUnmount: function() {
        FindingStore.removeChangeListener(this._onFindingChange);
        FoundStore.removeChangeListener(this._onFoundChange);
    },

    _onFindingChange: function () {
        this.setState({
            findings: FindingStore.getFindingsWithAmount(4)
        });
    },

    _onFoundChange: function() {
        this.setState({
            founds: FoundStore.getFoundsWithAmount(4)
        });
    },

    render: function() {
        return (
            <div className="homepageContent">
                <HomepageSection
                    title = "最新丢失"
                    data = {this.state.findings}
                />
                <br/>
                <br/>
                <br/>
                <HomepageSection
                    title = "最新拾遗"
                    data = {this.state.founds}
                />
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
})



module.exports = HomePage;
