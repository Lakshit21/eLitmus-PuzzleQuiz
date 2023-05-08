const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./models/User');
const Game1 = require('./models/Game1');
const Game2 = require('./models/Game2');
const Game3 = require('./models/Game3');
const Game4 = require('./models/Game4');
const Game5 = require('./models/Game5');
const ADMIN_NAME = "Lakshit";
const ADMIN_PWD = "india"; //india
const PORT = process.env.PORT || 3000


const app = express();
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(  path.join(__dirname + '/public') ));
app.use(express.static(  path.join(__dirname + '/public/img') ));
app.use(express.static(  path.join(__dirname + '/public/images') ));
app.use(express.static(  path.join(__dirname + '/public/css') ));
app.use(express.static(  path.join(__dirname + '/public/js') ));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));



let userName, userEmail;
let game_completed = [0 , 0,0,0,0,0];
let CLUES = ["Empty","Mermaid Lagoon", "Crocodile Crack" , "Indian camp" , "HungmanTree", "Skull Rock", "End OF The game"];
let HyperLink = ["/game_1","/game_2","/game_3","/game_4","/game_5"];
let clueCount = 1;


// For USER DATA

mongoose.connect("mongodb+srv://20bce124:lakshit@cluster0.r2wqinv.mongodb.net/USER", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected USER'))
    .catch(err => console.log(err));

// mongoose.connect("mongodb+srv://20bce124:lakshit@cluster0.r2wqinv.mongodb.net/?retryWrites=true&w=majority/USER", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected USER'))
//     .catch(err => console.log(err));

// // For GAME1 DATA
// mongoose.connect("mongodb://127.0.0.1:27017/GAME1", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected GAME1'))
//     .catch(err => console.log(err));


// Start index page In
app.get('/', (req, res) => {
    const user = req.session.user;
    res.render('index');
});

// Login page In
app.get('/login', (req, res) => {
    console.log("This is Login Page");
    res.render('login',{message:""}); // need to pass message?
});

// Login Page - OUT
app.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const game1 = await Game1.findOne({email : req.body.email});
      const game2 = await Game2.findOne({email : req.body.email});
      const game3 = await Game3.findOne({email : req.body.email});

        if(game1 || game2 || game3){
            res.redirect('/');
            return
        }


      if (!user) {
        res.render('login', { message: 'User not found' });
        return;
      }
      
      const isValidPassword = await bcrypt.compare(req.body.password, user.password)
      if (!isValidPassword) {
        res.render('login', { message: 'Incorrect password', email: req.body.email });
        return
      }

      const name = user.name;
      console.log(name);
      
      // store the cradential of user
      userName = user.name;
      userEmail = user.email;

    // console.log(user);
    // console.log(userEmail);

        // Successfully authenticated
        // Go to Home Page of the Game 
    //   res.redirect('/start') ;
        // res.redirect('start');
        res.render('start');
    } catch (error) {
      console.log(error)
      res.render('login', { message: 'Something went wrong', email: req.body.email })
    }
}); 
  
  
  
// SignUp Page - IN
app.get('/signup', (req, res) => {
    console.log("This is Signup Page");
    res.render('signup',{message:""}); // need to pass message?
});


// SignUp Page - OUT
app.post('/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    console.log(name, email, password, confirm_password);

    // if (password !== confirmPassword) {
    //     res.render('signup', { message: 'Passwords do not match' });
    //     return;
    // }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.render('signup', { message: 'Email already in use' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // store the cradential of user
    
    userName = name;
    userEmail = email;


    const newUser = new User({
        name:name,
        email:email,
        password: hashedPassword
    });

    await newUser.save();
    console.log("new User added!");

    req.session.user = newUser;

    // res.redirect('/start'); // Go to Home page of the GAME
    res.render('start');
});

// LOG OUT PAGE
app.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/index');
});

app.post('/logout',(req,res)=>{
    req.session.user = null;
    res.redirect('/index');
});

// start page
// app.get('/start', (req,res)=>{
//     res.redirect('/start');
// });

app.post('/start',(req,res)=>{
    // res.redirect('/home');
    res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
});


// GAME1 - IN 
app.get('/game_1',(req, res)=>{
    console.log('game_1 reached!');
    // let in_Game1 = 0;
    // User.exists({ email: userEmail })
    // .then((result) => {
    //     // console.log(result); // true if user exists, false otherwise
    //     if(result){
    //         in_Game1 = 1;
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
    // console.log(in_Game1);
    if(HyperLink[0]==""){
        res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
        return;
    }
    res.render('game_1');
});

// GAME1 - OUT
app.post('/game_1', async (req, res) => {
    console.log('Game 1 ended from post');
    let in_Game1 = 0;
    User.exists({ email: userEmail })
    .then((result) => {
        // console.log(result); // true if user exists, false otherwise
        if(result){
            in_Game1 = 1;
        }
    })
    .catch((err) => {
        console.log(err);
    });
    console.log(in_Game1);
    // game_completed[1] = 1;
    if(HyperLink[0]==""){
        console.log("IN TRUE BLOCK?");
        res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
    }else{
        console.log('In Game 1');
        console.log(userName);
        console.log(userEmail);
        
        // const existingUser = await User.findOne({ userEmail });

        game_completed[1] = 1;
        const newGame = new Game1({
            name:userName,
            email:userEmail,
            score: Number(req.body.game_score)
        });
        HyperLink[0] = "";
      
        await newGame.save();
        console.log('New Game status added');
        clueCount = 2; // move to next
        res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
    }

});

// GAME2 - IN
app.get('/game_2', (req,res)=>{
    console.log('game_2 reached!');
    res.render('game_2');
});

// GAME2 - OUT
app.post('/game_2', async (req,res)=>{
    console.log('Game 2 ended from post');
    // game_completed[1] = 1;
    if(HyperLink[1]==""){
        res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
    }else{
        console.log('In Game 2');
        console.log(userName);
        console.log(userEmail);
        
        // const existingUser = await User.findOne({ userEmail });

        game_completed[2] = 1;
        const newGame = new Game2({
            name:userName,
            email:userEmail,
            correct: Number(req.body.correct_score),
            wrong: Number(req.body.wrong_score),
            skip: Number(req.body.skip_score),
        });
        HyperLink[1] = "";
      
        await newGame.save();
        console.log('New Game status added');
        clueCount = 3; // move to next
        res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
    }
});


// GAME3 - IN
app.get('/game_3', (req,res)=>{
    console.log('game_3 reached!');
    res.render('game_3');
});

// GAME3 - OUT
app.post('/game_3', async (req,res)=>{
    console.log('Game 3 ended from post');

    if(HyperLink[2]==""){
        res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
    }else{
        console.log('In Game 3');
        console.log(userName);
        console.log(userEmail);
        
        // const existingUser = await User.findOne({ userEmail });

        game_completed[3] = 1;
        const newGame = new Game3({
            name:userName,
            email:userEmail,
            correct: Number(req.body.correct_score),
            wrong: Number(req.body.wrong_score),
            hint: Number(req.body.hint_score),
        });
        HyperLink[2] = "";
      
        await newGame.save();
        console.log('New Game status added');
        clueCount = 5; // move to At The end
        res.render('home',{curClue : CLUES[clueCount],g1:HyperLink[0],g2:HyperLink[1],g3:HyperLink[2],g4:HyperLink[3],g5:HyperLink[4]});
    }
});

// // GAME4 - IN
// app.get('/game_4', (req,res)=>{
//     console.log('game_4 reached!');
//     res.render('game_4');
// });

// // GAME4 - OUT
// app.post('/game_4', async (req,res)=>{

// });



// GAME5 - IN : Final Game
app.get('/game_5', async (req,res)=>{
    console.log('game_5 reached!');
    const user = await User.findOne({ email: userEmail });
    const game1 = await Game1.findOne({ email: userEmail });
    const game2 = await Game2.findOne({ email: userEmail });
    const game3 = await Game3.findOne({ email: userEmail });

    let obj = {
        who:user.name,
        g1s:game1.score,
        g2s_c:game2.correct,
        g2s_w:game2.wrong,
        g2s_s:game2.skip,
        g3s_c:game3.correct,
        g3s_w:game3.wrong,
        g3s_h:game3.hint
    }


    res.render('game_5',obj);
});

// GAME5 - OUT
app.post('/game_5', async (req,res)=>{
    console.log('game_5 reached!');
    const user = await User.findOne({ email: userEmail });
    const game1 = await Game1.findOne({ email: userEmail });
    const game2 = await Game2.findOne({ email: userEmail });
    const game3 = await Game3.findOne({ email: userEmail });

    let obj = {
        who:user.name,
        g1s:game1.score,
        g2s_c:game2.correct,
        g2s_w:game2.wrong,
        g2s_s:game2.skip,
        g3s_c:game3.correct,
        g3s_w:game3.wrong,
        g3s_h:game3.hint
    }

    // add some comment on the softskill

    res.render('game_5',obj);
});







// Admin - Login

app.get('/admin_login',(req,res)=>{
    console.log('Welcome Login');
    res.render('admin_login',{message:""});
});


app.post('/admin_login', async (req, res) => {
    const name = req.body.name;
    const pwd = req.body.password;

    if (name == ADMIN_NAME && pwd == ADMIN_PWD) {
        console.log("welcome admin!");
    } else {
        res.render('admin_login', { message: "Not Admin" });
        return;
    }

    try {
        // get all the data
        const users = await User.find().lean();
        const game1 = await Game1.find().lean();
        const game2 = await Game2.find().lean();
        const game3 = await Game3.find().lean();

        // Pass it to Ejs and Display the content
        // add chart to the admin page 

        let game1_score_avg = 0;
        let total = 0;

        let game2_correct_avg = 0;
        let game2_wrong_avg = 0;
        let game2_skip_avg = 0;

        let game3_correct_avg = 0;
        let game3_wrong_avg = 0;
        let game3_hint_avg = 0;

        total = 0;
        game1.forEach((item)=>{
            game1_score_avg += item.score;
            total++;
        });

        if(total > 0){
            game1_score_avg /=  total;
        }


        total = 0;
        game2.forEach((item)=>{
            game2_correct_avg += item.correct;
            game2_wrong_avg += item.wrong;
            game2_skip_avg += item.skip;
            total++;
        });

        if(total > 0){
            game2_correct_avg  /= total;
            game3_wrong_avg /= total;
            game2_skip_avg /= total;
        }


        total = 0;
        game3.forEach((item)=>{
            game3_correct_avg += item.correct;
            game3_wrong_avg += item.wrong;
            game3_hint_avg += item.hint;
            total++;
        });

        if(total > 0){
            game3_correct_avg  /= total;
            game3_wrong_avg /= total;
            game3_hint_avg /= total;
        }


        let xVal = ["Game1 avg Score", "Game2 avg Correct", "Game2 avg Wrong", "Game2 avg Skip", "Game3 avg Correct", "Game3 avg Wrong", "Game3 avg Hint"]
        let yVal = [game1_score_avg, game2_correct_avg, game2_wrong_avg, game2_skip_avg, game3_correct_avg, game3_wrong_avg, game3_hint_avg]
        
        // window.localStorage.setItem("xVal",JSON.stringify(xVal));
        // window.localStorage.setItem("yVal",JSON.stringify(yVal));

        const obj = {
            User_arr: users,
            Game1_arr: game1,
            Game2_arr: game2,
            Game3_arr: game3,
            xVal : xVal,
            yVal : yVal
        };

        console.log("User");
        console.log(users);
        console.log("game1");
        console.log(game1);
        console.log("game2");
        console.log(game2);
        console.log("game3");
        console.log(game3);

        res.render('admin_home', obj);
        res.redirect('/admin_home');
    } catch (err) {
        console.log(err);
        res.render('admin_login', { message: err.message });
    }
});


// app.post('/admin_login', (req, res)=>{
//     const name = req.body.name;
//     const pwd = req.body.password;

//     if(name == ADMIN_NAME && pwd == ADMIN_PWD){
//         console.log("welcome admin!");
//     }else{
//         res.render('admin_login',{ message : "Not Admin"});
//         return;
//     }
//     // get all the data

//     const User_arr = []
//     const Game1_arr = []
//     const Game2_arr = []
//     const Game3_arr = []

//     // User.find({})
//     // .then((users) => {
//     //     User_arr.push(users);
//     // })
//     // .catch((err) => {
//     //     console.log(err);
//     // });

//     User.find({})
//       .then((data) => {
//         console.log("here");
//         // console.log(data);
//         User_arr.push(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });


//     Game1.find({})
//     .then((users) => {
//         Game1_arr.push(users);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//     Game2.find({})
//     .then((users) => {
//         Game2_arr.push(users);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//     Game3.find({})
//     .then((users) => {
//         Game3_arr.push(users);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//     // Pass it to Ejs and Display the content
//     // add chart to the admin page 

//     let obj = {
//         User_arr : User_arr,
//         Game1_arr : Game1_arr,
//         Game2_arr : Game2_arr,
//         Game3_arr : Game3_arr
//     }
//     console.log("User")
//     console.log(User_arr);
//     console.log("game1")
//     console.log(Game1_arr);
//     console.log("game2")
//     console.log(Game2_arr);
//     console.log("game3")
//     console.log(Game3_arr);

//     // res.render('admin_home',obj);
//     res.render('admin_login',{message:User_arr});
// });


app.listen(PORT, () => console.log('Server started'));
