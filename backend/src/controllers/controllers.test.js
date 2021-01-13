const itemSchema = require('../models/itemSchema');
const itemsMongoController = require('./itemsMongoController')(itemSchema);
const cartSchema = require('../models/cartSchema');
const shoppingCarController = require('./shoppingCartController')(cartSchema);

jest.mock('../models/itemSchema');
jest.mock('../models/cartSchema');

describe('itemsMongoController', () => {
  let res;
  let req;
  let fakeResult;
  let fakeError;

  beforeEach(() => {
    res = { send: jest.fn() };
    fakeResult = {};
    fakeError = 'error';
  });

  describe('getMethod', () => {
    test('should call res.send the error if there is an error', async () => {
      itemSchema.find = jest.fn().mockRejectedValueOnce(fakeError);
      await itemsMongoController.getMethod(null, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });

    test('should call res.json with the result if there is no error', async () => {
      itemSchema.find = jest.fn().mockResolvedValueOnce(fakeResult);
      await itemsMongoController.getMethod(null, res);

      expect(res.send).toHaveBeenCalledWith(fakeResult);
    });
  });

  describe('postMethod', () => {
    beforeEach(() => {
      req = { body: null };
    });

    test('should call res.send the error if there is an error', async () => {
      itemSchema.create = jest.fn().mockRejectedValueOnce(fakeError);
      await itemsMongoController.postMethod(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });

    test('should call res.send the result if there is no error', async () => {
      itemSchema.create = jest.fn().mockResolvedValueOnce(fakeResult);
      await itemsMongoController.postMethod(req, res);

      expect(res.send).toHaveBeenCalledWith(fakeResult);
    });
  });

  describe('deleteMethod', () => {
    beforeEach(() => {
      req = { body: { item: { 'product-type': null } } };
    });

    test('should call res.send the error if there is an error', async () => {
      itemSchema.deleteMany = jest.fn().mockRejectedValueOnce(fakeError);
      await itemsMongoController.deleteMethod(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });

    test('should call res.send "deleted" if there is no error', async () => {
      itemSchema.deleteMany = jest.fn().mockResolvedValueOnce(fakeResult);
      await itemsMongoController.deleteMethod(req, res);

      expect(res.send).toHaveBeenCalledWith('Deleted');
    });
  });

  describe('getByIdMethod', () => {
    beforeEach(() => {
      req = { params: { itemId: null } };
    });

    test('should call res.send the error if there is an error', async () => {
      itemSchema.findOne = jest.fn().mockRejectedValueOnce(fakeError);
      await itemsMongoController.getByIdMethod(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });

    test('should call res.json with the result if there is no error', async () => {
      itemSchema.findOne = jest.fn().mockResolvedValueOnce(fakeResult);
      await itemsMongoController.getByIdMethod(req, res);

      expect(res.send).toHaveBeenCalledWith(fakeResult);
    });
  });
});

describe('shoppingCarController', () => {
  let req;
  let res;
  let fakeResult;
  let fakeError;
  beforeEach(() => {
    res = { send: jest.fn() };
    fakeResult = { populate: jest.fn().mockReturnValue({ execPopulate: jest.fn() }) };
    fakeError = 'error';
  });

  describe('getMethod', () => {
    test('should res.send the error if there is an error', async () => {
      cartSchema.find = jest.fn().mockRejectedValueOnce(fakeError);
      await shoppingCarController.getMethod(null, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });

    test('should res.send the result if there is no error', async () => {
      cartSchema.find = jest.fn().mockResolvedValueOnce(fakeResult);
      await shoppingCarController.getMethod(null, res);

      expect(res.send).toHaveBeenCalledWith(fakeResult);
    });
  });

  describe('patchMethod', () => {
    beforeEach(() => {
      req = { body: { item: {} } };
    });

    test('should res.send the error if there is an error', async () => {
      cartSchema.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError);
      await shoppingCarController.patchMethod(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });

    test('should res.send the result if there is no error', async () => {
      cartSchema.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeResult);
      await shoppingCarController.patchMethod(req, res);

      expect(res.send).toHaveBeenCalledWith(fakeResult);
    });
  });

  describe('deleteMethod', () => {
    beforeEach(() => {
      req = { body: { item: {} } };
    });

    test('should res.send the error if there is an error', async () => {
      cartSchema.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError);
      await shoppingCarController.deleteMethod(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });

    test('should res.send the result if there is no error', async () => {
      cartSchema.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeResult);
      await shoppingCarController.deleteMethod(req, res);

      expect(res.send).toHaveBeenCalledWith(fakeResult);
    });
  });
});
