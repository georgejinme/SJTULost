var FindingAction = require('../flux/action/initializationAction').FindingAction;
var FoundAction = require('../flux/action/initializationAction').FoundAction;
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
                <a href = {'/' + this.props.url + '/' + this.props.json['id']} target="_blank">
                    <span className={this.badgeColor()}>{this.badgeText()}</span>
                    <img src={this.props.json['img']} className="img-rounded homepageItemImage" />
                    <div className="homepageItemDetail">
                        <p className="homepageItemDetailTitle">{this.props.json['description']}</p>
                        <p className="homepageItemDetailInfo">遗失时间: {this.props.json['time']}</p>
                        <p className="homepageItemDetailInfo">遗失地点: {this.props.json['place']}</p>
                    </div>
                </a>
            </div>
        )
    }
});

var HomepageRow = React.createClass({
    render: function() {
        var url = this.props.url;
        return (
            <div className="row">
                {
                this.props.data.map(function(val, index){
                    return (
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <HomepageItems
                                json = {val}
                                url = {url}
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
            <div>
                <h1>{ this.props.title} </h1>
                <hr/>
                <HomepageRow
                    data = {this.props.data}
                    url = {this.props.url}
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
        FindingAction.fetchData();
        FoundAction.fetchData();
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
                    url = 'findingview'
                />
                <br/>
                <br/>
                <br/>
                <HomepageSection
                    title = "最新拾遗"
                    data = {this.state.founds}
                    url = 'foundview'
                />
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
})



module.exports = HomePage;
