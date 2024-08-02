import { Link } from "react-router-dom";
import { IProduct } from "../../interface/IProduct";
import { instance } from "../../instance/instance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

 // Make sure to import your instance instance

type Props = {
    setProduct: IProduct[];
}

const Home = ({ setProduct }: Props) => {
    const [cart, setCart] = useState<any[]>([]);
    const dataLocal = localStorage.getItem('W209_USER_INFO');
    const [dataLocalStorage, setDataLocalStorage] = useState('')
    useEffect(() => {
        if (dataLocal) {
            const newData  = JSON.parse(dataLocal)
            setDataLocalStorage(newData);
        }
    }, [])
    const addtocart = async (productId: string) => {
        console.log(productId)
        try {
            const { data } = await instance.post(`cart`, {userId:dataLocalStorage?._id,
                product: productId, quantity: 1 });
            toast.success("Thêm thành công")
            console.log(data);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    }
   
    return (
        <>
            <div className="banner">
                <img src="./src/assets/images/banner.jpeg" className="w-full" alt="Banner" />
            </div>
            <div>
                <h1 className="text-center text-2xl font-semibold my-5">Sản Phẩm Hot</h1>
                <div className="grid grid-cols-4 w-[1400px] mx-auto rounded-lg shadow-lg border mx-auto bg-gray-100 gap-x-[10px] gap-y-[25px] px-3 py-6">
                    {
                        setProduct.slice(0, 8).map((product) => (
                            <div className="text-center" key={product._id}>
                                <h1 className="text-xl">{product.name}</h1>
                                <hr className="mt-2 w-6 mx-auto bg-gray-500 h-[2px]" />
                                <p className="mx-2 mt-2 mb-4">{product.desc}</p>
                                <div className="relative group w-[300px] mb-2 rounded-xl place-items-center">
                                <img className="w-[220px] mx-auto mb-2" src={product.images} alt="" />
                                    <Link to={`detail/${product._id}`}
                                        className="absolute scale-0 group-hover:scale-100 group-hover:translate-y-0 -translate-y-[200%] duration-200 z-[2] lg:w-[152px] mb:w-[136px] lg:h-[64px] mb:h-[48px] rounded-[100px] border-none bg-[#1A1E2630] text-sm text-white backdrop-blur-md left-1/2 top-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                        Details</Link>
                                    <section className="hidden absolute top-0 left-0 bg-[#F2BC1B] px-3 py-1.5 text-white">$60 ounce</section>
                                </div>
                                <span className="text-sm font-semibold"><p>{product.price}$</p></span>
                                <div className="mt-5">
                                    <button 
                                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" 
                                        onClick={() => addtocart(product._id)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Buy Now</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default Home;
