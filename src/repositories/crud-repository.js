const { StatusCodes } = require('http-status-codes');

const AppError = require('../utils/errors/app-error');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async createOne(data) {
    const response = await this.model.create(data);
    return response;
  }

  async deleteOne(id) {
    const response = await this.model.deleteOne({ _id: id });
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getOne(id) {
    const response = await this.model.findOne({ _id: id });
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    const response = await this.model.find();
    return response;
  }

  async updateOne(id, data) {
    const response = await this.model.updateOne({ _id: id }, data)
    return response;
  }
}

module.exports = CrudRepository;