// Generated by IcedCoffeeScript 108.0.9
(function() {
  var ActionHandler, AlertHandler, ChangeStateHandler, ConfirmHandler, DefaultAlertHandler, DefaultChangeStateHandler, DefaultConfirmHandler, DefaultRedirectHandler, DefaultValidationHandler, EnvelopeInterpreter, RedirectHandler, ValidationHandler, test,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ActionHandler = (function() {
    function ActionHandler() {}

    ActionHandler.prototype.handle = function(action) {
      return null;
    };

    return ActionHandler;

  })();

  AlertHandler = (function(_super) {
    __extends(AlertHandler, _super);

    function AlertHandler() {
      return AlertHandler.__super__.constructor.apply(this, arguments);
    }

    return AlertHandler;

  })(ActionHandler);

  ConfirmHandler = (function(_super) {
    __extends(ConfirmHandler, _super);

    function ConfirmHandler() {
      return ConfirmHandler.__super__.constructor.apply(this, arguments);
    }

    return ConfirmHandler;

  })(ActionHandler);

  ChangeStateHandler = (function(_super) {
    __extends(ChangeStateHandler, _super);

    function ChangeStateHandler() {
      return ChangeStateHandler.__super__.constructor.apply(this, arguments);
    }

    return ChangeStateHandler;

  })(ActionHandler);

  RedirectHandler = (function(_super) {
    __extends(RedirectHandler, _super);

    function RedirectHandler() {
      return RedirectHandler.__super__.constructor.apply(this, arguments);
    }

    return RedirectHandler;

  })(ActionHandler);

  ValidationHandler = (function(_super) {
    __extends(ValidationHandler, _super);

    function ValidationHandler() {
      return ValidationHandler.__super__.constructor.apply(this, arguments);
    }

    return ValidationHandler;

  })(ActionHandler);

  EnvelopeInterpreter = (function() {
    function EnvelopeInterpreter(handleAlert, handleConfirm, handleChangeState, handleRedirect, handleValidation) {
      this.handleAlert = handleAlert || new DefaultAlertHandler();
      this.handleConfirm = handleConfirm || new DefaultConfirmHandler();
      this.handleChangeState = handleChangeState || new DefaultChangeStateHandler();
      this.handleRedirect = handleRedirect || new DefaultRedirectHandler();
      this.handleValidation = handleValidation || new DefaultValidationHandler();
      return;
    }

    EnvelopeInterpreter.prototype.parse = function(envelope) {
      return this.parseAction(envelope.Action);
    };

    EnvelopeInterpreter.prototype.parseAction = function(action) {
      var result;
      if (!action) {
        return;
      }
      console.log("parseAction", action);
      result = this["handle" + action.Name].handle(action);
      return this.parseAction(result);
    };

    return EnvelopeInterpreter;

  })();

  DefaultAlertHandler = (function(_super) {
    __extends(DefaultAlertHandler, _super);

    function DefaultAlertHandler() {
      return DefaultAlertHandler.__super__.constructor.apply(this, arguments);
    }

    DefaultAlertHandler.prototype.handle = function(action) {
      window.alert(action.Message);
      return action.OkAction;
    };

    return DefaultAlertHandler;

  })(AlertHandler);

  DefaultConfirmHandler = (function(_super) {
    __extends(DefaultConfirmHandler, _super);

    function DefaultConfirmHandler() {
      return DefaultConfirmHandler.__super__.constructor.apply(this, arguments);
    }

    DefaultConfirmHandler.prototype.handle = function(action) {
      if (window.confirm(action.Message)) {
        return action.OkAction;
      } else {
        return action.CancelAction;
      }
    };

    return DefaultConfirmHandler;

  })(ConfirmHandler);

  DefaultRedirectHandler = (function(_super) {
    __extends(DefaultRedirectHandler, _super);

    function DefaultRedirectHandler() {
      return DefaultRedirectHandler.__super__.constructor.apply(this, arguments);
    }

    DefaultRedirectHandler.prototype.handle = function(action) {
      return window.location(action.RedirectUrl);
    };

    return DefaultRedirectHandler;

  })(RedirectHandler);

  DefaultChangeStateHandler = (function(_super) {
    __extends(DefaultChangeStateHandler, _super);

    function DefaultChangeStateHandler() {
      return DefaultChangeStateHandler.__super__.constructor.apply(this, arguments);
    }

    return DefaultChangeStateHandler;

  })(ChangeStateHandler);

  DefaultValidationHandler = (function(_super) {
    __extends(DefaultValidationHandler, _super);

    function DefaultValidationHandler() {
      return DefaultValidationHandler.__super__.constructor.apply(this, arguments);
    }

    return DefaultValidationHandler;

  })(ValidationHandler);

  test = new EnvelopeInterpreter();

  test.parse({
    Action: {
      Name: "Alert",
      Message: "Opa!",
      OkAction: {
        Name: "Confirm",
        Message: "Are you sure?"
      }
    }
  });

}).call(this);
