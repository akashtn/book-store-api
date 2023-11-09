const { StatusCodes } = require("http-status-codes");

const { BookService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * Returns a single book that matches the id passed
 * @param {number} req.params.id - id of the book
 */
const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const books = await BookService.getOneBook({ _id: id });
    SuccessResponse.data = books;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

/**
 * Returns all the books
 */
const getBooks = async (req, res, next) => {
  try {
    const books = await BookService.getAllBooks();
    SuccessResponse.data = books;

    return res
      .status(StatusCodes.OK)
      .json({ ...SuccessResponse, size: books.length })
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

/**
 * Returns all the books
 * @param {string} req.body.title - title of the book (max 100 characters)
 * @param {string} req.body.author - author of the book
 * @param {string} req.body.summary - summary of the book (min 200 characters and max 500 characters)
 */
const createBook = async (req, res, next) => {
  try {
    const book = await BookService.createOneBook(req.body);
    SuccessResponse.data = book;

    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse)
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

/**
 * Updates a single book that matches the id passed
 * @param {string} req.params.id - id of the book
 * @param {string} [req.body.title] - title of the book (max 100 characters)
 * @param {string} [req.body.author] - author of the book
 * @param {string} [req.body.summary] - summary of the book (min 200 characters and max 500 characters)
 */
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, summary } = req.body;

    const updatedBook = {};
    if (title) updatedBook.title = title;
    if (author) updatedBook.author = author;
    if (summary) updatedBook.summary = summary;

    const result = await BookService.updateOneBook(id, updatedBook);
    SuccessResponse.data = result;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

/**
 * Deletes a single book that matches the id passed
 * @param {number} req.params.id - id of the book
 */
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const books = await BookService.deleteOneBook(id);
    SuccessResponse.data = books;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook
}