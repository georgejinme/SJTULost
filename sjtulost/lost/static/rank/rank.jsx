
var RankAction = require('../flux/action/initializationAction').RankAction;
var RankStore = require('../flux/store/rankStore');

var RankBody = React.createClass({
    render: function() {
        return (
            <tbody className="rankBody">
            {
                this.props.data.map(function(val, index) {
                    return (
                        <tr>
                            <td><span className="label label-success">{val['no']}</span></td>
                            <td>{val['name']}</td>
                            <td>{val['student_id']}</td>
                            <td>{val['times']}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        )
    }
});

var RankHeader = React.createClass({
    render: function() {
        return (
            <thead>
                <tr>
                    <td>排行</td>
                    <td>姓名</td>
                    <td>学号</td>
                    <td>拾物次数</td>
                </tr>
            </thead>
        )
    }
});

var RankTable = React.createClass({
    render: function() {
        return (
            <div className="rankTable">
                <table className="table table-striped table-hover ">
                    <RankHeader />
                    <RankBody
                        data = {this.props.ranks}
                    />
                </table>
            </div>
        )
    }
});


var Rank = React.createClass({
    getInitialState: function() {
        return {
            ranks: RankStore.getRanks()
        }
    },

    componentDidMount: function() {
        RankAction.fetchData();
        RankStore.addChangeListener(this._onRanksChange)
    },

    componentWillUnmount: function() {
        RankStore.removeChangeListener(this._onRanksChange)
    },

    _onRanksChange: function() {
        this.setState({
            ranks: RankStore.getRanks()
        })
    },

    render: function(){
        return (
            <div className="rankContent">
                <RankTable
                    ranks = {this.state.ranks}
                />
            </div>
        )
    }
});

module.exports = Rank;
