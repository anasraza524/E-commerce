import express from 'express';
import mongoose from 'mongoose';
import { productModel } from '../dbRepo/model.mjs'

const router = express.Router()


router.post('/product', (req, res) => {
    const body = req.body
    if (!body.name 
        || !body.price 
        || !body.description
        // && body.id
        //   || !body.productImage
    ) {

        res.status(400)
        res.send({ message: "Requird Parameter missing." })
        return;
    }
    // console.log(body.id)
    console.log(body.name)
    console.log(body.price)
    console.log(body.description)
     console.log('imaghe',body.productImage)

    productModel.create({
        name: body.name,
        price: body.price,
        description: body.description,
        productImage: body.productImage,
        owner: new mongoose.Types.ObjectId(body.token._id),
    },
        (err, saved) => {
            console.log("post Error",err)
            if (!err) {
                console.log(saved);

                res.send({
                    message: "product added successfully"
                });
            } else {
                res.status(500).send({
                    message: "server error .."
                })
            }
        })
})

router.get('/productAll', (req, res) => {
    productModel.find({}, (err, data) => {
        console.log("get Error",err)
        if (!err) {;
            res.send({
                message: "got all products successfully",
                data: data
              
            });
            // res.send({
            //     message: "got all products successfully",
            //     data: data
              
            // })  
           
        } else {
            res.status(500).send({
                message: "server error...."
            })
        }
    });
})
router.get('/product/:id', (req, res) => {

    const id = req.params.id;

    productModel.findOne({ _id: id }, (err, data) => {
        if (!err) {
            if (data) {
                res.send({
                    message: `get product by id: ${data._id} success`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: "product not found",
                })
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})
router.get("/products/:name", (req, res) => {
    console.log(req.params.name);

    const body = req.body
    const name = req.params.name
    productModel.find({ 
   
        name: { $regex: `${name}` }
     }, (err, data) => {
      if (!err) {
        if (data) {
          res.send({
            message: `get product by success`,
            data: data,
          });
        } else {
          res.status(404).send({
            message: "product not found",
          });
        }
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    });
  });

router.get('/products', (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.body.token._id);

    productModel.find(
        { owner: userId
            // , isDeleted: false 
            },
        {},
        {
            sort: { "_id": -1 },
            limit: 100,
            skip: 0
        }
        , (err, data) => {
            if (!err) {
                res.send({
                    message: "got all products successfully",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
})




router.delete('/product/:id',async (req, res) => {
    const id = req.params.id;
    productModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Product has been deleted successfully",
                })
            } else {
                res.status(404);
                res.send({
                    message: "No Product found",                    //  with this id: " + id,
                });
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.put('/product/:id',async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body.name ||
        !body.price ||
        !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "description": "value",
            "productImage": "value"
        }`)
        return;
    }

    try {
        let data = await productModel.findByIdAndUpdate(id,
            {
                name: body.name,
                price: body.price,
                description: body.description,
                productImage:body.productImage
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "product modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})

export default router