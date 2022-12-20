import express from 'express'
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

//  mongoose.set('strictQuery', false);

const app = express();
const port = process.env.PORT || 3000;
const mongodbURI = process.env.mongodbURI ||
"mongodb+srv://abcd:abcd@cluster0.eu5uldj.mongodb.net/anas?retryWrites=true&w=majority"
app.use(cors());
// mongodb+srv://anas:12ANASraza786@cluster0.eu5uldj.mongodb.net/?retryWrites=true&w=majority


app.use(cors());
app.use(express.json());
 let products = [];
// let addtocart = [];
// let bageNo = 0

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
     productImage: String,
    createdOn: { type: Date, default: Date.now }
});
const productModel = mongoose.model('products', productSchema);


let addtocartSchema = new mongoose.Schema({
    id:String,
    name: { type: String, required: true },
    price: Number,
    description: String,
    productImage: String,
    createdOn: { type: Date, default: Date.now }
});
const addtocartModel = mongoose.model('addtocarts', addtocartSchema);


app.post('/addtocart', (req, res) => {
    const body = req.body
    if (!body.name 
        || !body.price 
        || !body.description
    
    ) {

        res.status(400)
        res.send({ message: "Requird cart  Parameter missing." })
        return;
    }
    
    console.log(body.name)
    console.log(body.price)
    console.log(body.description)
    // console.log('name:',body.productImage)

    addtocartModel.create({
        id:body.id,
        name: body.name,
        price: body.price,
        
        description: body.description,
        productImage: body.productImage,
    },
        (err, saved) => {
            console.log("post Error",err)
            if (!err) {
                console.log(saved);

                res.send({
                    message: "product added successfully in Cart"
                });
            } else {
                res.status(500).send({
                    message: "server error .."
                })
            }
        })
})

app.delete('/addtocart/:id', (req, res) => {
    const id = req.params.id;
    addtocartModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Product has been removed successfully",
                })
            } else {
                res.status(404);
                res.send({
                    message: "No cart Product found",
                //    "  with this id: " + id,"
                });
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.get('/addtocarts', (req, res) => {
    addtocartModel.find({}, (err, data) => {
        console.log("get Error",err)
        if (!err) {
            res.send({
                message: "got all products successfully",
                data: data
              
            })  
           
        } else {
            res.status(500).send({
                message: "server error...."
            })
        }
    });
})
/



app.post('/product', (req, res) => {
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




app.get('/products', (req, res) => {
    productModel.find({}, (err, data) => {
        console.log("get Error",err)
        if (!err) {
            res.send({
                message: "got all products successfully",
                data: data
              
            })  
           
        } else {
            res.status(500).send({
                message: "server error...."
            })
        }
    });
})
/

app.get('/product/:id', (req, res) => {

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

app.get('/product/:name', (req, res) => {
   
    const querryName = req.params.name;
    // ({name:{$regex:`${querryName}`}}`
    // { name:querryName}
      productModel.find({name:{$regex:`${querryName}`}}
        
        , (err, data) => {
            console.log("des: ", err)
        if (!err) {
          if (data.length !== 0) {
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
            message: "server error/./.",
          });
        }
      });
    });


app.delete('/product/:id',async (req, res) => {
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

app.put('/product/:id',async (req, res) => {

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



const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////