import { useEffect, useState } from "react";
import { IOder } from "../../../interface/Oder";
import { instance } from "../../../instance/instance";

type Props = {};

const Carts = ({}: Props) => {
    const [cart, setCart] = useState<IOder[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await instance.get('/Oder');
                setCart(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchData();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: number) => {
        try {
            await instance.put(`/Oder/${orderId}`, { status: newStatus });
            // Cập nhật trạng thái trong state
            setCart((prevCart) => 
                prevCart.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-lg border-2 sm:rounded-lg mx-5">
            <div className='py-2 mx-6 mt-6'>
                <div className='flex gap-5'>
                    <p className='p-2 text-sm rounded-md font-medium'>Đơn Hàng</p>
                </div>
                <hr className='mt-5 bg-[#FFEA20] h-[2px]' />
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">STT</th>
                        <th scope="col" className="px-6 py-3">Tên Khách Hàng</th>
                        <th scope="col" className="px-6 py-3">Tên Sản Phẩm</th>
                        <th scope="col" className="px-6 py-3">Ảnh Sản Phẩm</th>
                        <th scope="col" className="px-6 py-3">Số Lượng</th>
                        <th scope="col" className="px-6 py-3">Doanh Thu</th>
                        <th scope="col" className="px-6 py-3">Trạng Thái</th>
                        <th scope="col" className="px-6 py-3">Tác Vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map((order, orderIndex) => (
                        order.products.map((product, productIndex) => (
                            <tr key={`${order._id}-${product._id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {productIndex === 0 && (
                                    <th scope="row" rowSpan={order.products.length} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {orderIndex + 1}
                                    </th>
                                )}
                                {productIndex === 0 && (
                                    <td rowSpan={order.products.length} className="px-6 py-4 bg-gray-200 border-b border-gray-300">
                                        {order.name}
                                    </td>
                                )}
                                <td className="px-6 py-4">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover" />
                                </td>
                                <td className="px-6 py-4">
                                    {product.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {product.price * product.quantity} VND
                                </td>
                                <td>
                                    <form className="max-w-sm mx-auto">
                                        <label className="sr-only">Trạng thái</label>
                                        <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, parseInt(e.target.value))}
                                        >
                                            <option value={1}>Chờ xác nhận</option>
                                            <option value={2}>Đang Giao</option>
                                            <option value={3}>Đã Giao</option>
                                        </select>
                                    </form>
                                </td>
                                <td className="px-6 py-4 *:text-black *:px-2 *:py-1 *:mx-1 *:rounded-md">
                                    <button className='bg-red-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Carts;
