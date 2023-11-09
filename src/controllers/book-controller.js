const { StatusCodes } = require("http-status-codes");

const { BookService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

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