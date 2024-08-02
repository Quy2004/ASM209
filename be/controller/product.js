import upload from "../middleware/upload.js";
import { Image } from "../models/image.js";
import { Product } from "../models/product.js";


// Middleware để xử lý upload tối đa 2 hình ảnh
// export const uploadProductImages = upload.array('images', 2);

export const addProductWithImages = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded or field name is incorrect');
    }
    try {
        // Tạo đối tượng hình ảnh mới
        const imageData = {
            image1: req.files[0] ? req.files[0].path : undefined,
        };
        // Lưu hình ảnh vào bảng Image
        const savedImages = await Image.create(imageData);
        // Tạo sản phẩm và liên kết với hình ảnh
        const productData = {
            name: req.body.name,
            images: savedImages._id,
            price: req.body.price,
            desc: req.body.desc,
            categoryId: req.body.categoryId
        };

        const newProduct = await Product.create(productData);

        res.status(201).send({
            status: true,
            message: 'Product added successfully with images!',
            product: newProduct
        });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error adding product: ' + error });
    }
};
export const addProduct = async (req, res) => {
    try {
        const data = await Product.create(req.body)
        if (data)
            return res.status(201).json({ message: "Them thanh cong", data })

    } catch (error) {
        res.status(500).send({ status: false, message: 'Error adding product: ' + error });
    }
};
export const getProduct = async (req, res) => {
    try {
        const products = await Product.find().populate('images').exec();
        res.status(200).send({ data: products });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error fetching products: ' + error });
    }
};

export const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('images').exec();
        if (!product) {
            return res.status(404).send({ status: false, message: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error fetching product: ' + error });
    }
};

export const putProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        )

        if (!updatedProduct) {
            return res.status(404).send({ status: false, message: 'Product not found' });
        }

        res.status(200).send({ status: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error); // Log lỗi chi tiết để dễ dàng theo dõi
        res.status(500).send({ status: false, message: 'Error updating product: ' + error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ status: false, message: 'Product not found' });
        }
        res.status(200).send({ status: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error deleting product: ' + error });
    }
};
