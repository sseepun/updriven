export default class Sponsor {
  constructor(
    link = "",
    image = "",
    btnText = "Join Us",
    _id = ""
  ) {
    (this._id = _id),
      (this.link = link),
      (this.image = image),
      (this.btnText = btnText);
  }

  static responseFormat(response) {
    let output = [];
    response.forEach((data) => {
      output.push(
        new Sponsor(data.link, data.path, data.title, data._id)
      );
    });
    return output;
  }

  static requestFormat(request) {
    var formData = new FormData();
    formData.append("adsID", request._id);
    formData.append("title", request.btnText);
    formData.append("link", request.link);
    formData.append("media", request.file);
    return formData;
  }
}

export class TempSponsor extends Sponsor {
  constructor(file = false) {
    super();
    this.file = file;
  }
}
