export default class RegisUser {
    constructor(data) {
      this.password = data.password? data.password : null;
      this.email = data.email? data.email : null;
      this.firstname = data.firstname? data.firstname : null;
      this.lastname = data.lastname? data.lastname : null;
      this.organization = data.organization? data.organization : null;
      this.occupation = data.occupation? data.occupation : null;
      this.providing = data.providing? data.providing : null;
    }
  }