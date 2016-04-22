/**
 * Created by gougoumemeda on 16/4/22.
 */


var Navigation = React.createClass({
    render: function() {
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#" className="navbar-brand">SJTU Lost</a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href = "#">丢失</a>
                            </li>
                            <li>
                                <a href = "#">拾物</a>
                            </li>
                            <li>
                                <a href = "#">排行</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">使用Jaccount登录</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

var HomePage = React.createClass({
    render: function() {
        return (
            <Navigation />
        )
    }
})



React.render(
    <HomePage />,
    document.getElementById('content')
);

