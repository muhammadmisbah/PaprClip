export const createActionSet = actionName => ({
  LOADING: `${actionName}_LOADING`,
  SUCCESS: `${actionName}_SUCCESS`,
  UPDATE: `${actionName}_UPDATE`,
  ERROR: `${actionName}_ERROR`,
  actionName,
});
