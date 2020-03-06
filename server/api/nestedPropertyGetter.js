
const ctxReference = 'this.$ctx$';
const allowedCharsExp = /^(\[|\]|\.|\w|"|')+$/;

function validateExp(path) {
  if (!allowedCharsExp.test(path)) {
    throw new Error(`${fileIdentifier} validateExp(): Bad format error, only the characters [ ] " ' . $ _ a-z A-Z 0-9 are allowed.`);
  }
}

function preparePath(path) {
  const prepared = path.replace(/\[([\w\.\$]+)(?=\]|\[)/g, (_, token) => {
    if (/^([0-9]+)$/.test(token)) return `[${token}`;
    return `[${ctxReference}.${token}`;
  });
  const sep = prepared.startsWith('[') ? '' : '.';
  return `${ctxReference}${sep}${prepared}`;
}

function evalInContext(context, path) {
  validateExp(path);
  const evalCtx = {};
  // to support uglify
  evalCtx.$ctx$ = context;
  // eslint-disable-next-line func-names
  return (function (exp) {
    // eslint-disable-next-line no-eval
    return eval(exp);
  }).call(evalCtx, preparePath(path));
}

function getProperty(context, path, defValue) {
  if (!context || !path) {
    return defValue;
  }
  try {
    const resp = evalInContext(context, path);
    // eslint-disable-next-line eqeqeq
    return resp != undefined ? resp : defValue;
  } catch (e) {
    // eslint-disable-next-line no-console
    return defValue;
  }
}

module.exports = { getProperty };
