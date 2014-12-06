/** @jsx React.DOM */

var RevenueSourceForm = React.createClass({
  _onSubmit: function(e) {
    e.preventDefault();

    var _url = 'revenue_sources/' + this.props.id;

    var _name = this.refs.name.getDOMNode().value.trim();
    var _rs  = { revenue_source: {name: _name }};

    // TODO: send request to the server
    $.ajax({
      url: _url,
      dataType: 'json',
      type: 'PUT',
      data: _rs,
      success: this._submitSuccess,
      error:   this._submitError
    });
    return;
  },

  _submitSuccess: function(data) {
    _id = data.id;
    delete data.id
    this.props.onClose(_id, data);
  },

  _submitError: function(xhr, status, err) {
    console.error(this.props.url, status, err.toString());
  },

  render: function() {
    return (
      <form>
        Rename: <input type='text' ref='name' placeholder='Name' defaultValue={this.props.value.name}/>
        <br/>
        <input type='submit' value='Update' onClick={this._onSubmit} />
        <input type='button' value='Cancel' onClick={this.props.onClose.bind(this, null, null)} />
      </form>
    );
  }
});

var RevenueSourceListItem = React.createClass({
  getInitialState: function() {
    return {show: false};
  },

  _onClick: function() {
    this.setState({show: this.state.show ? false : true});
  },

  _onClose: function(id, value) {
    if (id && value) {
      this.props.updateItem(id, value);
    }
    this.setState({show: false});
  },

  _renderDetail: function() {
    if (this.state.show) {
      return (
        <div className='panel panel-body'>
          <RevenueSourceForm onClose={this._onClose} id={this.props.id} value={this.props.value}/>
        </div>
      )
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <tr>
        <td>
          <span onClick={this._onClick}>
            {this.props.value.name}
          </span>
          {this._renderDetail()}
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

  render: function() {
    if ( this.state.items ) {
      keys = Object.keys(this.state.items);
      return (
        <table className='table table-hover'>
          <tbody>
            {keys.map(function(key) {
              return <RevenueSourceListItem key={key} id={key} value={this.state.items[parseInt(key)]} updateItem={this._updateItem}/>;
            }.bind(this))}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }
});
