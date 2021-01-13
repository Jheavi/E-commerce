function itemsMongoController(itemSchema) {
  async function getMethod(req, res) {
    try {
      const query = {};

      const items = await itemSchema.find(query);

      res.send(items);
    } catch (error) {
      res.send(error);
    }
  }

  async function postMethod(req, res) {
    try {
      const item = req.body;
      const newItem = await itemSchema.create(item);

      res.send(newItem);
    } catch (error) {
      res.send(error);
    }
  }

  async function deleteMethod(req, res) {
    try {
      const item = req.body;
      const query = { 'product-type': item['product-type'] };

      await itemSchema.deleteMany(query);

      res.send('Deleted');
    } catch (error) {
      res.send(error);
    }
  }

  async function getByIdMethod(req, res) {
    try {
      const { itemId } = req.params;
      const query = { id: itemId };

      const items = await itemSchema.findOne(query);

      res.send(items);
    } catch (error) {
      res.send(error);
    }
  }

  return {
    getMethod, postMethod, deleteMethod, getByIdMethod,
  };
}

module.exports = itemsMongoController;
