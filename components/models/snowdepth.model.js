class Snowdepth {
  from = {
    pos: { }
  }
  when
  depth
  manual

  constructor (position, when, depth, manual) {
    this.from.pos = position
    this.when = when
    this.depth = depth
    this.manual = manual
  }
}

export default Snowdepth
