/** @jsx React.DOM */

var RevenueSourceListItem = React.createClass({
  componentDidMount: function() {
    $(this.refs.editableName.getDOMNode()).editable({
      type: 'text',
      pk: this.props.id,
      url: 'revenue_sources/' + this.props.id,
      title: 'rename:',
      params: this._editParams,
      success: this._editSuccess,
      error: this._editError
    });
  },

  _editParams: function(params) {
    return {revenue_source: {name: params.value}};
  },

  _editSuccess: function(response, value) {
    if (response.id && value) {
      this.props.updateItem(response.id, value);
    }
    $(this.refs.editableName.getDOMNode()).editable('hide');
  },

  _editError: function(response, value) {
    console.error(this.props.url, response.status, response.responseText);
  },

  render: function() {
    var _url = 'revenue_sources/' + this.props.id;
    return (
      <tr>
        <td>
          <a href="#" ref="editableName">{this.props.value.name}</a>
        </td>
      </tr>
    )
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
