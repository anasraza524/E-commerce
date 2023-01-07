
import mongoose from 'mongoose';


let otpSchema = new mongoose.Schema({

    otp: String,
     email: String,
    
    //  isDeleted: { typeof: Boolean, default: false },
    createdOn: { type: Date, default: Date.now }
});
export const OtpRecordModel = mongoose.model('OtpRecords', otpSchema);


let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
     productImage: String,
     owner: { type: mongoose.ObjectId, required: true },
    //  isDeleted: { typeof: Boolean, default: false },
    createdOn: { type: Date, default: Date.now }
});
export const productModel = mongoose.model('products', productSchema);


let addtocartSchema = new mongoose.Schema({
    id:String,
    name: { type: String, required: true },
    price: Number,
    description: String,
    productImage: String,
    owner: { type: mongoose.ObjectId, required: true },
    createdOn: { type: Date, default: Date.now }
});
export const addtocartModel = mongoose.model('addtocarts', addtocartSchema);


const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },

    createdOn: { type: Date, default: Date.now },
});
export const userModel = mongoose.model('Users', userSchema);

const mongodbURI = process.env.mongodbURI ||
"mongodb+srv://abcd:abcd@cluster0.eu5uldj.mongodb.net/anas?retryWrites=true&w=majority"


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