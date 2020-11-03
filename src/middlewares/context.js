import { RunMode } from "../types";
import storeFactory, { actions } from "../state-store";

export const setContextMiddleware = (persistentContext) => (req, res, next) => {
  if (!res.locals) {
    res.locals = {};
  }

  res.locals.persistent_context = {
    ...persistentContext,
  };
  next();
};

export const getPersistentContext = (res) => {
  return res.locals.persistent_context;
};

const buildRequestContext = (req, res, dependencies) => {
  const store = storeFactory({ initialState: {} });
  // store.initState({});
  const setResponseElement = (id, value) =>
    store.dispatch(actions.setResponseElement)(id, value);
  const getResponseState = () => store.getState();
  const persistentContext = getPersistentContext(res);
  return {
    ...persistentContext,
    store,
    setResponseElement,
    getResponseState,
    req: {
      query: {
        ...req.query,
      },
      params: {
        ...req.params,
      },
      body: req.body,
    },
    dependencies: {
      ...dependencies,
    },
  };
};

export const applyController = ({ execute, setDependencies }) => {
  let dependencies = setDependencies();
  const middleware = (req, res) => {
    const context = buildRequestContext(req, res, dependencies);

    return Promise.resolve(execute(context))
      .then((controllerOutput) => {
        if (controllerOutput === undefined) {
          res.status(404).send();
          return;
        }

        res.status(200).json(controllerOutput);
        return;
      })
      .catch((error) => {
        let errorOutput = error.stack;

        if (context.execution.run_mode === RunMode.PROD) {
          res.status(404).send();
          return;
        }

        console.error("Error capturado en contextMiddleware: ");
        console.error(errorOutput);
        res.status(500).send(errorOutput);
        return;
      });
  };

  return middleware;
};
