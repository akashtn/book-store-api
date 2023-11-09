const express = require('express');
const { BookMiddleware } = require('../../middlewares');
const { BookController } = require('../../controllers');

const router = express.Router();

router
  .get('/', BookController.getBooks)
  .get('/:id', BookMiddleware.validateGetRequest, BookController.getBook)
  .post('/', BookMiddleware.validateCreateRequest, BookController.createBook)
  .patch('/:id', BookMiddleware.validatePatchRequest, BookController.updateBook)
  .delete('/:id', BookMiddleware.validateDeleteRequest, BookController.deleteBook);

module.exports = router;