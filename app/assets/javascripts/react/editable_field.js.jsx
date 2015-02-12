/** @jsx React.DOM */

var EditableField = React.createClass({
  propTypes: {
    id:         React.PropTypes.string.isRequired,
    fieldTable: React.PropTypes.string.isRequired,
    fieldName:  React.PropTypes.string.isRequired,
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
    this._submit(this.refs.editableField.getDOMNode().value.trim());
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
    console.error("[EditableField._submitError] status: %s, errorText: %s", status, (errorText.length > 0 ? errorText : '[empty]'));
  },

  render: function() {
    if (this.state.editing) {
      return (
        <form className='editable'>
          <input type='text' ref='editableField' defaultValue={this.props.value}/>
          <div className='btn-tiny-panel'>
            <button type='submit' className='btn btn-primary btn-tiny' onClick={this._onSubmit} >
              <i className='glyphicon glyphicon-ok' />
            </button>
            <button type='button' className='btn btn-default btn-tiny' onClick={this._onCancel} >
              <i className='glyphicon glyphicon-menu-down' />
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <span ref='editableField' className='editable' onClick={this._edit}>
          {this.props.value}
        </span>
      );
    }
  }
});
