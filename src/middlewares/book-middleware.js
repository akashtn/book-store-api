const { StatusCodes } = require('http-status-codes');

const AppError = require('../utils/errors/app-error');
const { ErrorResponse } = require('../utils/common');

function validateGetRequest(req, res, next) {
  const { id } = req.params;
  if (!id) {
    ErrorResponse.message = 'Something went wrong while getting the requested book';
    ErrorResponse.error = new AppError(['id not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }

  next();
}

function validateCreateRequest(req, res, next) {
  const { title, author, summary } = req.body;
  if (!title) {
    ErrorResponse.message = 'Something went wrong while adding the task';
    ErrorResponse.error = new AppError(['Title not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }

  if (!author) {
    ErrorResponse.message = 'Something went wrong while adding the book';
    ErrorResponse.error = new AppError(['Author not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }

  if (!summary) {
    ErrorResponse.message = 'Something went wrong while adding the book';
    ErrorResponse.error = new AppError(['Summary not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }

  next();
}

function validatePatchRequest(req, res, next) {
  const { id } = req.params;
  if (!id) {
    ErrorResponse.message = 'Something went wrong while updating the book';
    ErrorResponse.error = new AppError(['id not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
  next();
}

function validateDeleteRequest(req, res, next) {
  const { id } = req.params;
  if (!id) {
    ErrorResponse.message = 'Something went wrong while getting the requested book';
    ErrorResponse.error = new AppError(['id not found in the incoming request'], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateGetRequest,
  validateCreateRequest,
  validatePatchRequest,
  validateDeleteRequest
}