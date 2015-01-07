/** @jsx React.DOM */

var InsertableField = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    fieldTable: React.PropTypes.string.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    updateItem: React.PropTypes.func.isRequired
  },
  getDefaultProps : function() {
    return { 'value' : '' };
  },

  getInitialState: function() {
    return { editing: false };
  },
  _edit:     function() { this.setState({editing: true});  },
  _readonly: function() { this.setState({editing: false}); },

  _onSubmit: function(e) {
    e.preventDefault();
    clearFlashMessages();
    this._submit(this.refs.insertableField.getDOMNode().value.trim());
    this._readonly();
  },

  _onCancel: function(e) {
    e.preventDefault();
    clearFlashMessages();
    this._readonly();
  },

  _submit: function(_value) {
    if (_value && (this.props.value != _value)) { // don't submit if unchanged or null
      var _model = this.props.fieldTable.toLowerCase()

      var _fieldTable = pluralize.singular(_model);
      var _fieldData = {};
      _fieldData[this.props.fieldName] = _value;

      var _data = {};
      _data[_fieldTable] = _fieldData;

      var _url = _model + '/' + this.props.id;

      $.ajax({
        url: _url,
        type: 'PUT',
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
      this.props.updateItem(_id, data);
    }
  },

  _submitError: function(xhr, status, errorText) {
    console.error("[InsertableField._submitError] status: %s, errorText: %s", status, (errorText.length > 0 ? errorText : '[empty]'));
  },

  render: function() {
    if (this.state.editing) {
      return (
        <form>
          <input type='text' ref='insertableField' defaultValue={this.props.value}/>
          <button type='submit' className='btn btn-primary btn-sm' onClick={this._onSubmit} >
            <i className='glyphicon glyphicon-plus' />
          </button>
          <button type='button' className='btn btn-default btn-sm' onClick={this._onCancel} >
            <i className='glyphicon glyphicon-remove' />
          </button>
        </form>
      );
    } else {
      return (
        <span ref='insertableField' className='insertable' onClick={this._edit}>
          {this.props.value}
        </span>
      );
    }
  }
});
