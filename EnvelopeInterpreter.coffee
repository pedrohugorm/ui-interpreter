class ActionHandler
	handle: (action) ->
		return null
class AlertHandler extends ActionHandler
class ConfirmHandler extends ActionHandler
class ChangeStateHandler extends ActionHandler
class RedirectHandler extends ActionHandler
class ValidationHandler extends ActionHandler

class EnvelopeInterpreter
	constructor: (handleAlert, 
	handleConfirm, 
	handleChangeState, 
	handleRedirect, 
	handleValidation) ->
		@handleAlert = handleAlert or new DefaultAlertHandler()
		@handleConfirm = handleConfirm or new DefaultConfirmHandler()
		@handleChangeState = handleChangeState or new DefaultChangeStateHandler()
		@handleRedirect = handleRedirect or new DefaultRedirectHandler()
		@handleValidation = handleValidation or new DefaultValidationHandler()

		return

	parse: (envelope) ->
		@parseAction envelope.Action
		
	parseAction: (action) ->
		if not action 
			return
		console.log "parseAction", action
		result = @["handle" + action.Name].handle action
		@parseAction result

class DefaultAlertHandler extends AlertHandler
	handle: (action) ->
		window.alert action.Message
		return action.OkAction
        
class DefaultConfirmHandler extends ConfirmHandler
	handle: (action) ->
		if window.confirm action.Message
			return action.OkAction
		else return action.CancelAction
		
class DefaultRedirectHandler extends RedirectHandler
	handle: (action) ->
		window.location action.RedirectUrl

class DefaultChangeStateHandler extends ChangeStateHandler #do nothing
class DefaultValidationHandler extends ValidationHandler #do nothing
