/** @jsx React.DOM */

var RevenueSourceListItem = React.createClass({
  render: function() {
    var _key = this.props.key;
    var _id = this.props.id;
    var _table = 'revenue_sources';
    var _value = this.props.value;
    var _update = this.props.updateItem;
    return (
      <tr>
        <td>
          <EditableField key={_key} id={_id} fieldTable={_table} fieldName='name' value={_value.name} updateItem={_update}/>
        </td>
      </tr>
    );
  }
});

var RevenueSourcesSection = React.createClass({
  getInitialState: function() {
    return { items: undefined };
  },

  componentDidMount: function() {
    this._fetch({})
  },

  _updateItem: function(id, value) {
    if (this.state.items && id && value) {
      _items = this.state.items;
      _items[id] = value;
      this.setState({items: _items});
    }
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
      // build objects of objects, keyed on id
      var hash = data.reduce(function(map, obj) {
        id = obj.id
        delete obj.id
        map[id] = obj;
        return map;
      }, {});
      this.setState({items: hash});
    }
  },

  _fetchError: function(xhr, status, err) {
    console.error(this.props.url, status, err.toString());
  },

  _renderItems: function(_keys) {
    return _keys.map(function(key) {
      return <RevenueSourceListItem key={key} id={key} value={this.state.items[parseInt(key)]} updateItem={this._updateItem}/>;
    }.bind(this))
  },

  render: function() {
    if ( this.state.items ) {
      return (
        <table className='table table-hover'>
          <tbody>
            {this._renderItems(Object.keys(this.state.items))}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }
});
