const express = require('express');
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const migrations = require("./app/migrations/migrations");
const cors = require("cors");
require('./app/passport/passport');
require('dotenv').config()

const app = express();
const db = require("./app/models");

var multer = require('multer')
var fs = require('fs')

app.use(cookieSession({
    name: process.env.SESSION_PREFIX + 'session',
    keys: ['key1', 'key2']
}))

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: false
  });

const CLIENT_URL_REGEX = new RegExp(process.env.CLIENT_REGEX)
const DOMAIN_URL_REGEX = new RegExp(process.env.DOMAIN)
console.log(CLIENT_URL_REGEX)
const corsOptions = {
    origin: [CLIENT_URL_REGEX, DOMAIN_URL_REGEX], // น้ำตาจะไหล ลืมใส่ regex
    credentials: true,
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors( corsOptions )); // remove corsOptions to allow all origins

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'media'
    },
  });

app.use(multer({ storage: storage }).array('media'));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/feed.routes")(app);

server = app.listen(port, () => console.log("server running on port " + port))

//socket.io instantiation
const io = require("socket.io")(server, {
  cors: {
      origin: /localhost$/,
      methods: ["GET", "POST"],
      credentials: true
  }
});
//listen on every connection
io.on('connection', (socket) => {
  socket.on('join-with-id',(data) => {
      socket.join(data.user_id);
      console.log(data.user_id)
    //   User.findById(data.user_id).exec((err,user) => {
          io.in(data.user_id).emit('receive-notify',
          {
              user_id: data.user_id,
              notification:  1//user.notification
          });
    //       }
    //   );
  });
  socket.on('sent-realtime-notify' , (data) =>{

    console.log(data);
    io.in(data.user_id).emit('get-count-notify',{
        sentiment_type: data.sentiment_type,
        post_id: data.post_id,
        user_id: data.user_id,
        user_like_post_id: data.user_like_post_id,
        user_like_post_firstname: data.user_like_post_firstname ,
        user_like_post_lastname: data.user_like_post_lastname,
    });
        
  });
  
  socket.on('join', (data) => {
      console.log('join room :', data.job_id)
      socket.join(data.job_id);
  });

  socket.on('disconnect', () => {
      // console.log("A user disconnected");
  });

  socket.on('send-message', (data) => {
      User.findById(data.user_id)
      .populate('avatar')
      .exec((err, result) => {
          socket.to(data.job_id).emit('recive-message', 
          { 
              user_id: data.user_id,
              message: data.message,
              job_id: data.job_id,
              createdAt: new Date(data.createdAt),
              avatar: result.avatar[0].value,
              username: result.username
          });
          const chat = new Chat({
              message: data.message,
              });    
          chat.user.push(data.user_id);
          chat.job.push(data.job_id);
          chat.save();
      });
  })
})

// connect to database
db.mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
    migrations.initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});