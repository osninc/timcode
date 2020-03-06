const api = require('./api/index');

const defaultError = {
  "error_code": 500,
  "error": "server_error",
  "error_message": "unexpected server error"
}
module.exports = {
  proxyApi: async (req, res) => {
    const params = Object.assign({}, req.body);
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    await api.fetchData(params).then(resp => {
      res.status(200).end(JSON.stringify(resp || []))
    }).catch(err => {
      const status = err && err.response && err.response.status
      const errorResponse = (err && err.response && err.response.data) || defaultError
        res.status(status || 500)
         .end(JSON.stringify(errorResponse))
    });
  }
}
