const reducerCreator = (initState, reducerByActionType) => (
	(state = initState, action) => (
		reducerByActionType[action.type]?.(state, action.payload) ?? state
	)
);

export default reducerCreator;