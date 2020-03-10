class Report {
  from = {pos: {}};
  when;
  reportType;
  
  constructor(position, when, type){
    this.from.pos = position;
    this.when = when;
    this.reportType = type;
  }
}

export default Report