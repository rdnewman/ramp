/** @jsx React.DOM */
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var RevenueSourceNewItem = React.createClass({
  propTypes: {
    buttonText: React.PropTypes.string,
    createItem: React.PropTypes.func.isRequired
  },

  getDefaultProps : function() {
    return { 'value' : '' };
  },

  getInitialState: function() {
    return { editing: false };
  },
  _showForm:   function() { this.setState({editing: true});  },
  _showButton: function() { this.setState({editing: false}); },

  _onDisplay: function(e) {
    e.preventDefault();
    clearFlashMessages();
    this._showForm();
  },

  _onCancel: function(e) {
    e.preventDefault();
    this._showButton();
  },

  _onSubmit: function(e) {
    e.preventDefault();
    clearFlashMessages();
    this._submit(this.refs.insertableField.getDOMNode().value.trim());
    this._showButton();
  },

  _submit: function(_value) {
    if (_value && (this.props.value != _value)) { // don't submit if unchanged or null
      var _model = 'revenue_sources'

      var _fieldTable = pluralize.singular(_model);
      var _fieldData = {};
      _fieldData['name'] = _value;

      var _data = {};
      _data[_fieldTable] = _fieldData;

      var _url = _model

      $.ajax({
        url: _url,
        type: 'POST',
        data: _data,
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
      this.props.createItem(_id, data);
    }
  },

  _submitError: function(xhr, status, errorText) {
    console.error("[RevenueSourceNewItem._submitError] status: %s, errorText: %s", status, (errorText.length > 0 ? errorText : '[empty]'));
  },

  _renderButtonText: function() {
    if (this.props.buttonText && (this.props.buttonText !== "")) {
      return (
        <span className='btn-text'>
          {this.props.buttonText}
        </span>
      );
    }
  },

  _renderForm: function() {
console.log('in _renderForm')
    if (this.state.editing) {
console.log('editing')
      return (
        <form key='add-form' className='editable='>
          <input type='text' ref='insertableField' defaultValue={this.props.value}/>
          <div className='btn-tiny-panel'>
            <button type='submit' className='btn btn-success btn-tiny' onClick={this._onSubmit} >
              <i className='glyphicon glyphicon-plus' />
            </button>
            <button type='button' className='btn btn-default btn-tiny' onClick={this._onCancel} >
              <i className='glyphicon glyphicon-menu-down' />
            </button>
          </div>
        </form>
      );
    } else {
      return null;
    }
  },

  _renderButton: function() {
console.log('in _renderButton')
    if (!(this.state.editing)) {
console.log('not editing')
      return (
        <button key='add-button' type='submit' className='btn btn-xs btn-add' onClick={this._onDisplay} >
          <i className='glyphicon glyphicon-plus'/>
          {this._renderButtonText()}
        </button>
      );
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <div>
        {this._renderForm()}
        {this._renderButton()}
      </div>
      //  <ReactCSSTransitionGroup transitionName='new-item'>
      //  </ReactCSSTransitionGroup>
    );
  }
});

var RevenueSourceListItem = React.createClass({
  getInitialState: function() {
    return { table: 'revenue_sources' };
  },

  _onDelete: function(e) {
    e.preventDefault();
    clearFlashMessages();

    var _model = this.state.table.toLowerCase()
    var _url = _model + '/' + this.props.id;

    $.ajax({
      url: _url,
      type: 'DELETE',
      dataType: 'json',
      success: this._deleteSuccess,
      error:   this._deleteError
    });
  },

  _deleteSuccess: function() {
    this.props.deleteItem(this.props.id);
  },

  _deleteError: function(xhr, status, errorText) {
    console.error("[RevenueSourceListItem._deleteError] status: %s, errorText: %s", status, (errorText.length > 0 ? errorText : '[empty]'));
  },

  render: function() {
    var _key = this.props.key;
    var _id = this.props.id;
    var _table = this.state.table;
    var _value = this.props.value;
    var _update = this.props.updateItem;
    return (
      <tr>
        <td>
          <EditableField key={_key} id={_id} fieldTable={_table} fieldName='name' value={_value.name} updateItem={_update}/>
          <button type="button" className="close" aria-label="Close" onClick={this._onDelete} >
            <span aria-hidden="true">&times;</span>
          </button>
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

  _createItem: function(id, value) {
    this._updateItem(id, value);
  },

  _updateItem: function(id, value) {
    if (this.state.items && id && value) {
      _items = this.state.items;
      _items[id] = value;
      this.setState({items: _items});
    }
  },

  _deleteItem: function(id) {
    if (this.state.items && id) {
      _items = this.state.items;
      delete _items[id];
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

  _sortByName: function(itemA, itemB) {
    var aName = itemA.name.toLowerCase();
    var bName = itemB.name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
  },

  _sortedIds: function() {
    var _sortable = [];
    var _sorted = [];
    for (var _key in this.state.items) {
      _sortable.push({id: _key, name: this.state.items[_key].name});
    }
    _sortable.sort(this._sortByName);
    for (var _i = 0, _len = _sortable.length; _i < _len; ++_i) {
      _sorted.push(_sortable[_i].id)
    }
    return _sorted;
  },

  _renderItems: function() {
    _keys = this._sortedIds();
    return _keys.map(function(key) {
      return <RevenueSourceListItem key={key} id={key} value={this.state.items[parseInt(key)]} updateItem={this._updateItem} deleteItem={this._deleteItem}/>;
    }.bind(this))
  },

  render: function() {
    if ( this.state.items ) {
      return (
        <div id='SectionWrapper'>
          <RevenueSourceNewItem buttonText='add new source' createItem={this._createItem}/>
          <table className='table table-hover'>
            <tbody>
              {this._renderItems()}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
});
