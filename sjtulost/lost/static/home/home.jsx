
var HomepageItems = React.createClass({
    render: function() {
        return (
            <div>
                <img src="static/image/qwt.jpg" className="img-rounded homepageItemImage" />
                <div className="homepageItemDetail">
                    <p className="homepageItemDetailTitle">求助!丢失了一个钱包,钱包对我很关键,我知道没福利没人看,先po裸照</p>
                    <p>遗失时间: 2015/02/04</p>
                    <p>遗失地点: 东转篮球场</p>
                </div>
            </div>
        )
    }
});

var HomepageRow = React.createClass({
    render: function() {
        var times = [0, 1, 2, 3];
        return (
            <div className="row">
                {
                times.map(function(index, val){
                    return (
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <HomepageItems />
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
                <HomepageRow />
            </div>
        )
    }
})



var HomePage = React.createClass({
    render: function() {
        return (
            <div className="homepageContent">
                <HomepageSection
                    title = "最新丢失"
                />
                <br/>
                <br/>
                <br/>
                <HomepageSection
                    title = "最新拾遗"
                />
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
})



module.exports = HomePage;
