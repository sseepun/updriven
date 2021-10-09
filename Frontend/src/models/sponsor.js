export default class Sponsor {
  constructor(link = "", image = "", btnText = "") {
    (this.link = link), (this.image = image), (this.btnText = btnText);
  }
}

export class TempSponsor extends Sponsor {
  constructor(file = false) {
    super();
    this.file = file;
  }
}
