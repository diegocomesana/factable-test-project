let stateDefault = {};

const onStateChangeDefault = (newState) => {
  stateDefault = newState;
};

const onStateGetDefault = () => stateDefault;

const defaultObj = {
  onStateChange: onStateChangeDefault,
  onStateGet: onStateGetDefault,
  debug: true,
};

export const storeFactory = ({
  onStateChange,
  onStateGet,
  debug,
  initialState,
} = defaultObj) => {
  if (!onStateGet) onStateGet = onStateGetDefault;
  if (!onStateChange) onStateChange = onStateChangeDefault;
  const applyState = (newState) => {
    onStateChange(newState);
    if (debug) console.log("NEW STATE: ", newState);
    return onStateGet();
  };

  if (initialState) applyState(initialState);

  return {
    getState: () => onStateGet(),
    initState: (initialState) => applyState(initialState),
    dispatch: (action) => (...payload) =>
      applyState(action(onStateGet())(...payload)),
  };
};

export const setResponseElement = (prevState) => (id, value) => {
  return {
    ...prevState,
    [id]: value,
  };
};

export const actions = {
  setResponseElement,
};

export default storeFactory;
