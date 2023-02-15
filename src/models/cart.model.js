const mongoose = require("mongoose");

const carrito = "carrito";

const cartSchema = new mongoose.Schema(
  {
    articulos: [
      {
        IdProducto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productCart",
        },
        producto: String,
        quantity: { type: String, ref: "productCart" },
        _id: false,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const cartModel = mongoose.model(carrito, cartSchema);

module.exports = { cartModel };
