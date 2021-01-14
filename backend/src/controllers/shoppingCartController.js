function shoppingCarController(cartItemSchema) {
  async function getMethod(req, res) {
    try {
      const query = { };
      const cartList = await cartItemSchema.find(query);

      await cartList.populate('product').execPopulate();

      res.send(cartList);
    } catch (error) {
      res.send(error);
    }
  }

  async function patchMethod(req, res) {
    try {
      const { item } = req.body;
      const query = { product: item._id };
      const update = { $inc: { quantity: 1 } };

      const updatedItem = await cartItemSchema.findOneAndUpdate(
        query,
        update,
        { upsert: true, new: true },
      );
      await updatedItem.populate('product').execPopulate();

      res.send(updatedItem);
    } catch (error) {
      res.send(error);
    }
  }

  async function deleteMethod(req, res) {
    try {
      const item = req.body;
      const query = { product: item._id };
      const update = { $inc: { quantity: -1 } };

      const deletedItem = await cartItemSchema.findOneAndUpdate(query, update, { new: true });

      await deletedItem.populate('product').execPopulate();

      res.send(deletedItem);
    } catch (error) {
      res.send(error);
    }
  }

  return { getMethod, patchMethod, deleteMethod };
}

module.exports = shoppingCarController;
