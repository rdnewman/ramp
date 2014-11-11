/** @jsx React.DOM */

/*var RevenueSourceListItem = React.createClass({
  getInitialState: function() {
    return { color: 'black' };
  },

  _onClick: function() {
    this.setState({color: 'green' });


    //this.style.color = green;
    //this.setState({ color: 'green' });
  },

  render: function() {
    return <li id={this.state.id} onClick={this._onClick} style={ {color: this.state.color} }>{this.props.item.name}</li>;
  }
});
*/

var RevenueSourceDetail = React.createClass({
  render: function() {
    if (this.props.showDetail) {
      return (
        <div>
          hello
        </div>
      )
    } else {
      return ( null )
    }
  }
});

var RevenueSourceListItem = React.createClass({
  getInitialState: function() {
    return { showDetail: false };
  },

  _onClick: function() {
    this.setState({showDetail: this.state.showDetail ? false : true });
  },

  render: function() {
    var _display = this.state.showDetail ? null : { display: 'none' };
    return (
      <li onClick={this._onClick}>
        {this.props.item.name}
        <RevenueSourceDetail showDetail={this.state.showDetail}/>
      </li>
    )
  }
});

var RevenueSourcesSection = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    this._fetch({})
  },

  _fetch: function() {
    $.ajax({
      url:      this.props.url,
      dataType: 'json',
      success:  this._fetchSuccess,
      error:    this._fetchError
    });
  },

  _fetchSuccess: function(data) {
    if (this.isMounted()) {
      this.setState({data: data});
    }
  },

  _fetchError: function(xhr, status, err) {
    console.error(this.props.url, status, err.toString());
  },

  render: function() {
    return (
      <ul>
      {this.state.data.map(function(item) {
        return <RevenueSourceListItem key={item.id} item={item}/>;
      })}
      </ul>
    );
  }
});
