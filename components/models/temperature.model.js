class Temperature {
  from = { pos: {} };
  when;
  temp;

  constructor (position, when, temperature) {
    this.from.pos = position
    this.when = when
    this.temp = temperature
  }
}

export default Temperature
