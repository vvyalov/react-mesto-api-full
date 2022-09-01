const validator = require('validator');

module.exports = ({
  validate: validator.isURL({
    message: 'Must be a Valid URL', protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true,
  }),
});
