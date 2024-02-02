function createEDQid () {
  let aleatorios = '';
  for (let i = 0; i < 7; i++) {
    aleatorios += Math.floor(Math.random() * 10);
  }
  return aleatorios;
}

module.exports = {
  createEDQid
};
