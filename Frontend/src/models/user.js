export default class User {
    constructor(id = null, firstname = null, lastname = null, avatar = null, background = null, state_id=null, province=null, email=null, organization = [], interests = null ,country_id=null, about=null,  followings=[], images=[] ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.avatar = avatar;
      this.background = background;
      this.state_id = state_id;
      this.province = province;
      this.email = email;
      this.organization = organization;
      this.interests = interests;
      this.country_id = country_id;
      this.about = about;
      this.followings = followings;
      this.images = images;
      this.profileLink = `/user/profile/${id}`;
    }
}