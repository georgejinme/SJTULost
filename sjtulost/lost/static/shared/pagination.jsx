var React = require('react');
var idOperation = require('../shared/util');

var Pagination = React.createClass({
    getLeftArrowClass: function() {
        if (this.props.position == 1) return 'disabled';
        else return ''
    },

    getRightArrowClass: function() {
        var lastPos = 0;
        if (this.props.totalAmount % this.props.eachPage == 0) lastPos = this.props.totalAmount / this.props.eachPage;
        else lastPos = this.props.totalAmount / this.props.eachPage + 1;
        lastPos = parseInt(lastPos);
        if (this.props.position == lastPos) return 'disabled';
        else return ''
    },

    getRangeClass: function(p) {
        if (p == this.props.position) return 'active';
        else return ''
    },

    getRange: function() {
        var lastPos = 0;
        if (this.props.totalAmount % this.props.eachPage == 0) lastPos = this.props.totalAmount / this.props.eachPage;
        else lastPos = this.props.totalAmount / this.props.eachPage + 1;
        lastPos = parseInt(lastPos);
        var resArray = [];
        if (lastPos < 5) {
            for (var i = 1; i <= lastPos; ++i) resArray.push(i);
        }
        else if (this.props.position < 3) resArray = [1, 2, 3, 4, 5];
        else if (this.props.position > lastPos - 2) {
            resArray = [
                lastPos - 4,
                lastPos - 3,
                lastPos - 2,
                lastPos - 1,
                lastPos
            ]
        } else {
            resArray = [
                this.props.position - 2,
                this.props.position - 1,
                this.props.position,
                this.props.position + 1,
                this.props.position + 2
            ]
        }
        return resArray
    },

    render: function(){
        var range = this.getRange();
        var rangeClass = this.getRangeClass;
        var clickRange = this.props.clickRange;
        return (
            <ul className="pagination">
                <li className={this.getLeftArrowClass()} onClick={this.props.clickPrevious}><a href="#">&laquo;</a></li>
                {
                    range.map(function(val, index){
                        return (
                            <li className={rangeClass(val)}
                                onClick={clickRange}>
                                <a href="#" id={idOperation.encodeId('page', val)}>{val}</a>
                            </li>
                        )
                    })
                }
                <li className={this.getRightArrowClass()} onClick={this.props.clickNext}><a href="#">&raquo;</a></li>
            </ul>
        )
    }
});

module.exports = Pagination;