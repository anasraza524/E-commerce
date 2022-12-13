import express from 'express'
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose'


const app = express();
const port = process.env.PORT || 3000;
const mongodbURL = process.env.mongodbURL || "mongodb+srv://anas:12ANASraza786@cluster0.eu5uldj.mongodb.net/?retryWrites=true&w=majority"
// mongodb+srv://anas:12ANASraza786@cluster0.eu5uldj.mongodb.net/?retryWrites=true&w=majority
app.use(cors());
app.use(express.json());
let products = [];
let addtocart = [];
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
    id:Number,
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
        || !body.id
        // && !body.productImage
    ) {

        res.status(400)
        res.send({ message: "Requird cart  Parameter missing." })
        return;
    }
    // console.log(body.id)
    console.log(body.name)
    console.log(body.price)
    console.log(body.description)
    // console.log('name:',body.productImage)

    addtocart.push({
        // id: `${new Date().getTime()}`,
        id: body.id,
        name: body.name,
        price: body.price,
        description: body.description,
        productImage: body.productImage,
    })

    res.send({
        message: "Addtocart added successfully"
    });

})
app.delete('/addtocart/:id', (req, res) => {
    const id = req.params.id;

    let isFound = false;
    for (let i = 0; i <addtocart.length; i++) {
        if (addtocart[i].id === id) {
            addtocart.splice(i, 1);
            res.send({
                message: "product in cart deleted successfully"
            });
            isFound = true
            break;
        }
    }
    if (isFound === false) {
        res.status(404)
        res.send({
            message: "delete fail: product not found"
        });
    }
})




app.post('/product', (req, res) => {
    const body = req.body
    if (!body.name 
        || !body.price 
        || !body.description
        // && body.id
         && body.productImage
    ) {

        res.status(400)
        res.send({ message: "Requird Parameter missing." })
        return;
    }
    // console.log(body.id)
    console.log(body.name)
    console.log(body.price)
    console.log(body.description)
    // console.log('name:',body.productImage)

    products.push({
        id: `${new Date().getTime()}`,
        // id: body.id,
        name: body.name,
        price: body.price,
        description: body.description,
        productImage: body.productImage,
    })

    res.send({
        message: "product added successfully"
    });

})


app.get('/products', (req, res) => {
    res.send({
        message: "got all products successfully",
        data: products
    })
})

// app.get('/bageno', (req, res) => {
//     res.send({
//         message: "got BageNO  successfully",
//         data: bageNo
        
//     })
// })
// app.post('/bageno', (req, res) => {
//     const body = req.body
//     // if (bageNo) {

//     //     res.status(400)
//     //     res.send({ message: "Requird Parameter missing." })
//     //     return;
//     // }
 

//    bageNo = body.bageNo

//     res.send({
//         message: "Bage added successfully"
//     });

// })
app.get('/addtocarts', (req, res) => {
    res.send({
        message: "got all products successfully",
        data: addtocart
      
        
    })
})
app.get('/product/:id', (req, res) => {

    const id = req.params.id;

    let isFound = false;
    for (let i = 0; i < products.length; i++) {

        if (products[i].id === id) {
            res.send({
                message: `get product by id: ${products[i].id} success`,
                data: products[i]
            });

            isFound = true
            break;
        }
    }
    if (isFound === false) {
        res.status(404)
        res.send({
            message: "product not found"
        });
    }
    return;
})

app.delete('/product/:id', (req, res) => {
    const id = req.params.id;

    let isFound = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products.splice(i, 1);
            res.send({
                message: "product deleted successfully"
            });
            isFound = true
            break;
        }
    }
    if (isFound === false) {
        res.status(404)
        res.send({
            message: "delete fail: product not found"
        });
    }
})

app.put('/product/:id', (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if ( // validation
        !body.name
        && !body.price
        && !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing"
        });
        return;
    }

    console.log(body.name)
    console.log(body.price)
    console.log(body.description)

    let isFound = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {

            products[i].name = body.name;
            products[i].price = body.price;
            products[i].description = body.description;

            res.send({
                message: "product modified successfully"
            });
            isFound = true
            break;
        }
    }
    if (!isFound) {
        res.status(404)
        res.send({
            message: "edit fail: product not found"
        });
    }
    res.send({
        message: "product added successfully"
    });
})


const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURL);

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