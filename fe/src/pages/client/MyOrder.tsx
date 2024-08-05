import React, { useEffect, useState } from 'react'
import { IOder } from '../../interface/Oder';
import { instance } from '../../instance/instance';
import axios from 'axios';

type Props = {}

const MyOrder = (props: Props) => {
    const [cart, setCart] = useState<IOder[]>([]);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('W209_USER_INFO');
        if (userInfo) {
            setUserData(JSON.parse(userInfo));
        }

        const dataLocal = userInfo ? JSON.parse(userInfo)._id : null;
        const fetch = async () => {
            if (dataLocal) {
                const { data } = await axios.get(`http://localhost:4200/api/cart/${dataLocal}`)
                console.log(data)
                setCart(data?.cart?.products)
            }
        }
        fetch()
    }, []);

    return (
        <>
            <div className='flex my-8 mx-4'>
                <div className='w-[30%] px-6'>
                    <h1 className='text-xl'>Thông tin đặt hàng</h1>
                    <hr className='bg-gray-400 h-0.5 my-3' />
                    {userData && cart && (
                        <>
                            <p className=''> Tên : <span className='font-medium'>{userData.name}</span></p>
                            <p className=''> SDT : <span className='font-medium'>{userData.phone}</span></p>
                            <p className=''> Địa Chỉ : <span className='font-medium'>{cart?.address}</span></p>
                        </>
                    )}
                </div>
                <div className="relative overflow-x-auto shadow-lg border-2 sm:rounded-lg mx-5 w-[70%]">
                    <div className='py-2 mx-6 mt-6'>
                        <div className='flex gap-5'>
                            <p className=' p-2 text-sm rounded-md font-medium'>Đơn Hàng</p>
                        </div>
                        <hr className='mt-5 bg-[#FFEA20] h-[2px]' />
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tên Sản Phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ảnh Sản Phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số Lượng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Doanh Thu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng Thái
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tác Vụ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item:any, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item?.product?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img src={item.product.images} className="w-24 h-24 object-cover" alt={item.product.name} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.product.price * item.quantity} VND
                                    </td>
                                    <td>
                                        <form className="max-w-sm mx-auto">
                                            <label></label>
                                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Chờ xác nhận</option>
                                                <option value="US">Đang Giao</option>
                                                <option value="CA">Đã Giao</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className='bg-red-500 text-white px-2 py-1 rounded-md'>
                                            Hủy Đơn Hàng
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MyOrder;
