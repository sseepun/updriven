export default class User {
    // constructor(id = null, firstname = null, lastname = null, avatar = null, background = null, state_id=null, province=null, email=null, organization = [], interests = null ,country_id=null, about=null,  followings=[], images=[] ) {
    //   this.id = id;
    //   this.firstname = firstname;
    //   this.lastname = lastname;
    //   this.avatar = avatar;
    //   this.background = background;
    //   this.state_id = state_id;
    //   this.province = province;
    //   this.email = email;
    //   this.organization = organization;
    //   this.interests = interests;
    //   this.country_id = country_id;
    //   this.about = about;
    //   this.followings = followings;
    //   this.images = images;
    //   this.profileLink = `/user/profile/${id}`;
    // }

    constructor(data) {
      this.id = data.id? data.id : '';
      this.firstname = data.firstname? data.firstname : '';
      this.lastname = data.lastname? data.lastname : '';
      this.avatar = data.avatar? data.avatar : '';
      this.background = data.background? data.background : '';
      this.state_id = data.state_id? data.state_id : '';
      this.province = data.province? data.province : '';
      this.email = data.email? data.email : '';
      this.organization = data.organization? data.organization : [];
      this.interests = data.interests? data.interests : [];
      this.country_id = data.country_id? data.country_id : '';
      this.about = data.about? data.about : '';
      this.followings = data.followings? data.followings : [];
      this.images = data.images? data.images : []; 
      this.role = data.role? data.role : [];
      this.profileLink = `/user/profile/${this.id}`;
    }
}