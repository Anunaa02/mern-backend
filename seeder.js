import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import users from './data/users.js';
import products from './data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert users and get admin user id
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Add admin user to each product object
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Insert products
        await Product.insertMany(sampleProducts);
        console.log('Data Imported!');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

console.log(process.argv);
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}