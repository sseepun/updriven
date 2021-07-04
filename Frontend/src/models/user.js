export default class User {
    constructor(id = null, firstname = null, lastname = null, avatar = null, background = null) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.avatar = avatar;
      this.background = background;
    }
}