/** @jsx React.DOM */

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
    var items = [];
    var data  = this.state.data;
    for (var i = 0; i < data.length; i++) {
      items.push(<li>{data[i].name}</li>);
    }
    return <ul>{items}</ul>;
  }
});





