const allowedCors = {
  origin: [
    'https://vyalov.students.nomoredomains.sbs',
    'http://vyalov.students.nomoredomains.sbs',
    'http://api.vyalov.students.nomoredomains.sbs',
    'https://api.vyalov.students.nomoredomains.sbs',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  credentials: true,
};

module.exports = allowedCors;
