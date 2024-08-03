import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { IProduct } from "../../interface/IProduct";
import { instance } from "../../instance/instance";
import { toast } from "react-toastify";


const Detail = () => {
    const { id } = useParams()
    const [detail, setDetail] = useState<IProduct>()
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await instance.get(`/products/${id}`)
            setDetail(data)
        }
        fetchData()
    }, [])

    //add to cart
    const [cart, setCart] = useState<any[]>([]);
    const dataLocal = localStorage.getItem('W209_USER_INFO');
    const [dataLocalStorage, setDataLocalStorage] = useState('')
    useEffect(() => {
        if (dataLocal) {
            const newData = JSON.parse(dataLocal)
            setDataLocalStorage(newData);
        }
    }, [])
    const addtocart = async (productId: string) => {
        console.log(productId)
        try {
            const { data } = await instance.post(`cart`, {
                userId: dataLocalStorage?._id,
                product: productId, quantity: 1
            });
            toast.success("Thêm thành công")
            console.log(data);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    }
    return (
        <>
            <div className="flex items-center bg-gray-200">
                <Link to={"/"} className="mb-1 mx-2 hover:underline">Trang chủ </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
                <h3 className="mb-1 mx-2 hover:underline">Product</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
                <h3 className="mb-1 mx-2 hover:underline">Detail</h3>
            </div>
            {/* Detail */}
            <main className="flex mx-auto w-[1300px] gap-2 mt-5 border rounded-xl *:mt-3">
                <div className="w-[45%]">
                    <img src={`${detail?.images}`} className="" alt="" />
                </div>
                <div className="w-[55%] ml-8">
                    <div className="">
                        <h1 className="text-2xl font-normal">{detail?.name}</h1>
                        <p className="text-xl text-red-500 font-medium">{detail?.price}$</p>
                        <div className="mt-3">
                            <p className="font-medium">Mô tả sản phẩm: </p>
                            <p>
                                {detail?.desc}
                            </p>
                        </div>
                    </div>
                    {/*  */}
                    <Button outline gradientDuoTone="cyanToBlue" className="mt-5" onClick={() => addtocart(product._id)}>
                        Add TO Cart
                    </Button>
                </div>
            </main>
        </>

    )
}
export default Detail