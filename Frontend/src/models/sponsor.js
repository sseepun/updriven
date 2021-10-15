export default class Sponsor {
  constructor(
    link = "",
    image = "",
    btnText = "Join Us",
    _id = "",
    title = ""
  ) {
    (this._id = _id),
      (this.title = title),
      (this.link = link),
      (this.image = image),
      (this.btnText = btnText);
  }

  static responseFormat(response) {
    let output = [];
    response.forEach((data) => {
      output.push(
        new Sponsor(data.link, data.path, data.btnText, data._id, data.title)
      );
    });
    return output;
  }

  static requestFormat(request) {
    console.log(request);
    var formData = new FormData();
    formData.append("adsID", request._id);
    formData.append("btnText", request.btnText);
    formData.append("link", request.link);
    formData.append("title", request.title);
    if (request.file) {
      formData.append("media", file)
    }
    return formData;
  }
}

export class TempSponsor extends Sponsor {
  constructor(file = false) {
    super();
    this.file = file;
  }
}
