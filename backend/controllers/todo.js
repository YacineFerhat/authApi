const todoSchema = require('../models/todo');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const createTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { title,description, date } = req.body;
    const createdAvis = new todoSchema({
        title,description, date
    });

    try {
      await createdAvis.save();
      console.log(`avis ${createdAvis} created`)
    } catch (err) {
      const error = new HttpError(
        'Creating avis failed, please try again.',
        500
      );
      return next(error);
    }  
    res.status(201).json({ avis: createdAvis });
};

const updateTodoState = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { done } = req.body;
    const todoId = req.params.id;
    let todo;
    try {
        todo = await todoSchema.findById(todoId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update Category.',
        500
      );
      return next(error);
    }
    todo.done = done;
    try {
      await todo.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update avis.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ todo: todo.toObject({ getters: true }) });
  };

  const updateTodosRank = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { rank } = req.body;
    const todoId = req.params.id;
    let todo;
    try {
        todo = await todoSchema.findById(todoId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update Category.',
        500
      );
      return next(error);
    }
    todo.rank = rank;
    try {
      await todo.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update avis.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ todo: todo.toObject({ getters: true }) });
  };

const getTodos = async (req, res, next) => {
    let todo;
    try {
        todo = await todoSchema.find();
    } catch (err) {
      const error = new HttpError(
        'Fetching avis failed, please try again later.',
        500
      );
      return next(error);
    }
    res.json({todo: todo.map(av => av.toObject({ getters: true }))});
  };

exports.createTodo = createTodo;
exports.updateTodoState = updateTodoState;
exports.getTodos = getTodos;
exports.updateTodosRank = updateTodosRank;