const data = {
  names: require('./nameGeneratorFiles/names.json'),
  adjectives: require('./nameGeneratorFiles/adjectives.json'),
};

const separator = '-';

const generate = () => {
  const random_a = Math.floor(Math.random() * data.adjectives.length);
  const random_b = Math.floor(Math.random() * data.names.length);
  const ran_suffix = Math.floor(Math.random() * 1000);
  return `${data.adjectives[random_a]}${separator}${data.names[random_b]}${ran_suffix}`;
};

module.exports = {
  generate,
};
