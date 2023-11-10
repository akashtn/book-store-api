const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

const { BookRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const bookRepository = new BookRepository();

async function createOneBook(data) {
  try {
    const book = await bookRepository.createOne(data);
    return book;
  } catch (error) {
    if (error.errors.title && error.errors.title.kind === 'maxlength') {
      throw new AppError(error.errors.title.properties.message, StatusCodes.BAD_REQUEST);
    }
    if (error.errors.summary && error.errors.summary.kind === 'maxlength') {
      throw new AppError(error.errors.summary.properties.message, StatusCodes.BAD_REQUEST);
    }
    if (error.errors.summary && error.errors.summary.kind === 'minlength') {
      throw new AppError(error.errors.summary.properties.message, StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new book', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getOneBook(id) {
  try {
    if (!mongoose.isValidObjectId(id)) {
      console.log(id);
      let err = new Error('Invalid id');
      err.statusCode = 400;
      throw err;
    }
    const book = await bookRepository.getOne(id);
    return book;
  } catch (error) {
    if (error.statusCode === 404) {
      throw new AppError('Cannot find the requested book. Please make sure that the id is correct', StatusCodes.NOT_FOUND);
    } else if (error.statusCode === 400) {
      throw new AppError('Invalid id. Please make sure to enter a valid id', StatusCodes.BAD_REQUEST);
    } else {
      throw new AppError('Cannot fetch the requested book', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

async function getAllBooks() {
  try {
    const books = await bookRepository.getAll();
    return books;
  } catch (error) {
    throw new AppError('Cannot fetch all the requested books', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateOneBook(id, data) {
  try {
    if (!mongoose.isValidObjectId(id)) {
      let err = new Error('Invalid id');
      err.statusCode = 400;
      throw err;
    }
    const result = await bookRepository.updateOne(id, data);
    if (result.matchedCount === 0) {
      throw new Error(StatusCodes.NOT_FOUND);
    }
    return result;
  } catch (error) {
    if (error.message === String(StatusCodes.NOT_FOUND)) {
      throw new AppError('Cannot find the book to be updated. Please make sure that the id is correct', StatusCodes.NOT_FOUND);
    } else if (error.statusCode === 400) {
      throw new AppError('Invalid id. Please make sure to enter a valid id', StatusCodes.BAD_REQUEST);
    } else {
      throw new AppError('Cannot update the requested book', StatusCodes.INTERNAL_SERVER_ERROR);
    };
  }
}

async function deleteOneBook(id) {
  try {
    if (!mongoose.isValidObjectId(id)) {
      let err = new Error('Invalid id');
      err.statusCode = 400;
      throw err;
    }
    const result = await bookRepository.deleteOne(id);
    if (result.deletedCount === 0) {
      throw new Error(StatusCodes.NOT_FOUND);
    }
    return result;
  } catch (error) {
    if (error.message === String(StatusCodes.NOT_FOUND)) {
      throw new AppError('Cannot find the book to be deleted. Please make sure that the id is correct', StatusCodes.NOT_FOUND);
    } else if (error.statusCode === 400) {
      throw new AppError('Invalid id. Please make sure to enter a valid id', StatusCodes.BAD_REQUEST);
    } else {
      throw new AppError('Cannot delete the requested book', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = {
  createOneBook,
  getOneBook,
  getAllBooks,
  updateOneBook,
  deleteOneBook
}

