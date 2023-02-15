const express = require("express");
const carrito = express.Router();

// const { productModel } = require("../models/products.model");
const { cartModel } = require("../models/cart.model");
const { productCartModel } = require("../models/productcart.model");

carrito.get("/", async (req, res) => {
  const datos = await cartModel.find();
  res.json(datos);
});

carrito.post("/", async (req, res) => {
  const body = req.body;
  await cartModel.create(body);
  res.send("Carrito creado");
});

carrito.get("/:id", async(req, res) =>{
  const {id} = req.params
  let traerID = await cartModel.findOne({_id: id})
  res.send(traerID)
})

carrito.put("/carrito/:idcart/producto/:idproducto", async (req, res) => {
  //tomamos los datos de la url
  const id_Cart = req.params.idcart;
  const id_producto = req.params.idproducto;

  //seleccionamos al carrito
  const carrito = await cartModel.findOne({ _id: id_Cart });
  if (!carrito) {
    res.send("El carrito no existe");
  }

  //seleccionamos el Producto
  const producto = await productCartModel.findOne({ _id: id_producto });

  if (!producto) {
    res.send("El producto no existe");
  }

  //revisamos si el carrito ya tiene el producto
  const cursoExistente = carrito.articulos.find(
    (element) => element.producto.toString() === id_producto.toString()
  );

  if (cursoExistente) {
    res.send("El producto ya existe");
  } else {
    carrito.articulos.push({ IdProducto: id_producto, producto: producto.producto, quantity: producto.quantity });

    await cartModel.updateOne({ _id: id_Cart }, carrito);

    res.send({ mensaje: `carrito ${id_Cart} Actualizado`, carrito: carrito });
  }
});

carrito.put(
  "/eliminarproducto/carrito/:idcart/producto/:idproducto",
  async (req, res) => {
    //tomamos los datos de la url
    const id_Cart = req.params.idcart;
    const id_producto = req.params.idproducto;

    //seleccionamos al carrito
    const carrito = await cartModel.findOne({ _id: id_Cart });    
    const productosActualizados = carrito.articulos.filter(
      (element) => element.IdProducto.toString() !== id_producto.toString()
    );
    carrito.articulos = productosActualizados;
console.log(productosActualizados)    

    await cartModel.updateOne({ _id: id_Cart }, carrito);

    res.send({ mensaje: `Carrito ${id_Cart} Actualizado`, carrito: carrito });
  }
);

module.exports = carrito;
