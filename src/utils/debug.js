function debug(name) {
  const display = process.env.NODE_ENV === 'development';

  return (...args) => {
    if (!display) return;
    console.log(name, ...args);
  };
}

module.exports = debug;
