/** @jsx React.DOM */

var FlashMessages = React.createClass({
  getInitialState: function() {
    return {messages: null};
  },

  messages: function (messageArray) {
    this.setState({messages: messageArray});
  },

  clear: function() {
    this.setState({messages: null});
  },

  render: function() {
    if (this.state.messages) {
      return (
        <div className='flash_messages_component'>
          {this.state.messages.map(function(message, index) {
            _level = message[0];
            _text  = message[1];
            return (
              <div key={index} className={this._flash_class(_level)}>
                {_text}
              </div>
            );
          }.bind(this))}
        </div>
      )
    } else {
      return null;
    }
  },

  _flash_class: function(level) {
    var _result = 'alert alert-error';
    if (level === 'notice') {
      _result = 'alert alert-info';
    } else if (level === 'success') {
      _result = 'alert alert-success';
    } else if (level === 'error') {
      _result = 'alert alert-error';
    } else if (level === 'alert') {
      _result = 'alert alert-error';
    }
    return _result;
  }

});

function handleFlashMessageHeader(node, xhr) {
  var _message_array = new Array();
  var _raw_messages = xhr.getResponseHeader("X-FlashMessages")
  if (_raw_messages) {
    var _json_messages = JSON.parse(_raw_messages);
    count = 0
    for (var key in _json_messages) {
      _message_array[count] = new Array();
      _message_array[count][0] = key;
      _message_array[count][1] = _json_messages[key];
      count += 1;
    }
  }
  node.messages(_message_array);
}

function clearFlashMessages() {
  flashDiv.clear();
}

$(document).ready(function() {
  window.flashDiv = React.render(<FlashMessages/>, $('#flash_messages')[0]);

  $(document).ajaxComplete(function(event, xhr, settings) {
    handleFlashMessageHeader(flashDiv, xhr);
  });
});
