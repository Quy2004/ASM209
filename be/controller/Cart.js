import Cart from "../models/cart.js";
import { Product } from "../models/product.js";


export const addToCart = async (req, res) => {
	const { product, quantity, userId } = req.body;
    try {
      // Kiểm tra người dùng có giỏ hàng chưa
      let cart = await Cart.findOne({ userId: userId });
      if (cart) {
        // Kiểm tra sản phẩm đó có trong giỏ hàng không
        const productIndex = cart.products.findIndex(
          (produc) => produc.product.toString() == product
        );
		console.log(productIndex)
        if (productIndex > -1) {
          // Nếu có thì cộng thêm số lượng sản phẩm
          cart.products[productIndex].quantity += quantity;
        } else {
          // Nếu không có thì push thêm sản phẩm vào mảng products
          cart.products.push({ product, quantity });
        }
        await cart.save();
      } else {
		  // Nếu người dùng chưa có giỏ hàng thì push thêm vào
		   cart = await Cart.create({
			  userId,
			  products: [{ product, quantity }],
			});
      }

      // Lấy ra thông tin sản phẩm của giỏ hàng
    //   const listCart = await cartSchema
    //     .findById(cart._id)
    //     .populate({
    //       path: "products.productId",
    //       select: "name price price_discount images",
    //     })
    //     .exec();

      return res.status(200).json({
        message:
           "Cart created successfully",
       		 data: cart,
      });
    } catch (error) {
      return res.status(400).send(error.message);
	}
};

export const removeFromCart = async (req, res, next) => {
	try {
		const { userId, idPro } = req.params;
		const cart = await Cart.findOne({ userId: userId });
		if (!cart) throw new ApiError(404, "Cart Not Found");
  
		const newProductCart = cart.products.filter(
		  (item) => item.product != idPro
		);
		const updateCart = await Cart.findByIdAndUpdate(
		  cart._id,
		  { products: newProductCart },
		  {
			new: true,
		  }
		);
		if (!updateCart) throw new ApiError(404, "Cart Not Found");
		return res.status(201).json({
		  message: "Delete Product Cart Successfull",
		  data: updateCart,
		});
	  } catch (error) {
		return res.status(400).send(error.message);
	  }
};

export const getCart = async (req, res, next) => {
	try {
		const userId = req.params.user_id;
		console.log(userId);
		const cart = await Cart.findOne({ userId : userId }).populate("products.product");
		return res.json({
			message: "Get cart successfully",
			cart,
		});
	} catch (error) {
		next(error);
	}
};

export const checkout = async (req, res, next) => {
	try {
		const userId = req.userId;
		const cart = await Cart.findOne({ userId }).populate("products.product");
		if (!cart) return res.status(400).json({ message: "Cart is empty" });
		// Viết thêm logic về thanh toán tuỳ xem chuyển khoản theo phương thức nào hoặc dùng api bên thứ 3.

		const order = new Order({
			user: userId,
			products: cart.products,
			totalPrice: cart.totalPrice,
		});
		await order.save();

		// Xoa gio hang sau khi thanh toan
		cart.products = [];
		cart.totalPrice = 0;
		await cart.save();
		return res.status(200).json({ message: "Checkout successfully" });
	} catch (error) {
		next(error);
	}
};