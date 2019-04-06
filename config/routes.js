const axios = require('axios');
const jwt=require('jsonwebtoken');

const cors=require('cors');

const knex=require('knex');

const bcrypt=require('bcryptjs');




const dbConfig=require('../knexfile.js');

const db= knex(dbConfig.development);

const { authenticate } = require('../auth/authenticate');


// Register
const registerUser=function(user){
  return db('users').insert(user).then(id=>id).catch(err=>err)
  

}
// Get
const getUser=function(user){
  
  return db('users').where({userName:user}).first().then(user=>user).catch(err=>err)
      };

const getUsers=function(){
      return db.select('*').from('users').then(users=>users).catch(err=>err)

    };

    // Post

module.exports = server => {
  
  server.post('/api/register', register);
  
  server.post('/api/login', login);

  server.get('/api/jokes', authenticate, getJokes);
};


// JSON Web TOken
const jwtKeys =




process.env.JWT_SECRET ||
function generateToken(user){
// Pay load  
  const payload={
    
    
    subject: user.id
  }
  const options={
  
    expiresIn:'1h',
  
    jwtid:'12345', 
  }
  return jwt.sign(payload,jwtKeys,options);
}

function register(req, res) {
  
  // Credientials
  
  const creds=req.body;
  
  const hash=bcrypt.hashSync(creds.password, 14);
  
  creds.password=hash;
  
  const registerToken=generateToken(creds);
  
  registerUser(creds).then(id=>res.status(201).json(registerToken)).catch(err=>res.status(500).json(err))
}

function login(req, res) {
  
  const creds=req.body;
  
  
  getUser(creds.username).then(user=>{
if

// Cryp

(user && bcrypt.compareSync(creds.password, user.password)){

  const token=generateToken(user);

    res.status(200).json({token:token})


  }else{


    res.status(401).json({message:'do not enter'})


  }}).catch(err=>res.json(err))
}

// JOkes api

function getJokes(req, res) {
  
  const requestOptions = {



    headers: { accept: 'application/json' },
  };

  axios
    .get('https://google.com/search', requestOptions)
   
   
    .then(response => {
    
      res.status(200).json(response.data.results);
    })

    .catch(err => {


      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}