const allowedCors = [
  'https://vyalov.students.nomoredomains.sbs',
  'http://vyalov.students.nomoredomains.sbs',
  'https://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const Credentials = req.headers['access-control-allow-credentials: true'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin, Credentials);
  }

  if (method === 'OPTIONS') {
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin, Credentials);
    }
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS, Credentials);
    res.header('Access-Control-Allow-Headers', requestHeaders, Credentials);
    return res.end();
  }

  return next();
};

module.exports = cors;
