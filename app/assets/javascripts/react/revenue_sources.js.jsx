/** @jsx React.DOM */

var RevenueSourceListItem = React.createClass({
  getInitialState: function() {
    return { editing: false };
  },
  _edit:     function() { this.setState({editing: true});  },
  _readonly: function() { this.setState({editing: false}); },

  _onSubmit: function(e) {
    e.preventDefault();
    clearFlashMessages();
    this._submit(this.refs.editableName.getDOMNode().value.trim());
    this._readonly();
  },

  _onCancel: function(e) {
    e.preventDefault();
    clearFlashMessages();
    this._readonly();
  },

  _submit: function(_value) {
    if (_value && (this.props.value.name != _value)) { // don't submit if unchanged or null
      var _url = 'revenue_sources/' + this.props.id;
      var _rs  = { revenue_source: { name: _value }};

      $.ajax({
        url: _url,
        type: 'PUT',
        data: _rs,
        dataType: 'json',
        success: this._submitSuccess,
        error:   this._submitError
      });
    }
    return;
  },

  _submitSuccess: function(data) {
    _id = data.id;
    delete data.id
    if (_id && data) {
      this.props.updateItem(_id, data);
    }
  },

  _submitError: function(xhr, status, errorText) {
    console.error("[RevenueSourceListItem._submitError] status: %s, errorText: %s", status, (errorText.length > 0 ? errorText : '[empty]'));
  },

  _renderField: function () {
    if (this.state.editing) {
      return (
        <form>
          <input type='text' ref='editableName' placeholder='Name' defaultValue={this.props.value.name}/>
          <button type="submit" className="btn btn-primary btn-sm" onClick={this._onSubmit} >
            <i className="glyphicon glyphicon-ok" />
          </button>
          <button type="button" className="btn btn-default btn-sm" onClick={this._onCancel} >
            <i className="glyphicon glyphicon-remove" />
          </button>
        </form>
      );
    } else {
      return (
        <span ref='editableName' onClick={this._edit}>
          {this.props.value.name}
        </span>
      );
    }
  },

  render: function() {
    return (
      <tr>
        <td>
          {this._renderField()}
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
