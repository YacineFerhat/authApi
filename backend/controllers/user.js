const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const userSchema = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { 
    email,  
    password,
     } = req.body;
  let existingUser;
  try{
    existingUser = await userSchema.findOne({email :email});
  }catch(err){
    const error = new HttpError("Problème d'auth", 500);
    return next(error);
  }
  if(existingUser !== null){
    const error = new HttpError(
      "Le nom d'utilisateur existe déjà", 422
    );
    return next(error)
  }
  let hashedPassword;
  
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  }catch(err){
    const error = new HttpError("Création de l'utilisateur impossible", 500)
    return next(error);
  }
  const createUser = new userSchema({
    email,
    password : hashedPassword,
  });

  try {
    await createUser.save();
    console.log(`user ${createUser} created`)
  } catch (err) {
    const error = new HttpError(
      'Creating information failed, please try again.',
      500
    );
    return next(error);
  }  

  let token;
  try{
    token = jwt.sign(
    {userId: createUser._id, 
    email : createUser.email}, 
    'todoApp', 
    {expiresIn:'15d'});
  } catch(err){
    const error = new HttpError(
      'Creating information failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ userId: createUser._id , token : token});
};


const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try{
    existingUser = await userSchema.findOne({email : email})
  }catch(err){
    const error = new HttpError("Erreur système", 500);
    return next(error);
  }
  if(!existingUser){
    const error = new HttpError("Utilisateur introuvale, vérifier votre identifiant", 404);
    return next(error);
  }
  let isValidPassword = false;
  try{
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch(err){
    const error = new httpError("Mot de passe introuvable", 500)
    return next(error)
  } 
  if(!isValidPassword){
    const error = new HttpError("Combinaison MDP/utilisateur fausse, vérifier vos données ", 401);
    return next(error);
  }

  let token;
  try{
    token = jwt.sign(
    {userId: createUser._id, 
    email : createUser.email}, 
    'todoApp', 
    {expiresIn:'15d'});
  } catch(err){
    const error = new HttpError(
      'authentificaition impossible, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ userId: existingUser._id , token : token});
}


exports.login=login;
exports.createUser = createUser;
