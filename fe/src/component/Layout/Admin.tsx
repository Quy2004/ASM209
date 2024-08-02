import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import CountTimer from "../CountTimer";
import { IProduct } from "../../interface/IProduct";
import { instance } from "../../instance/instance";


const AdminLayout = () => {
    const [activeTab, setActiveTab] = useState('Tất cả');
    const [search, setSearch] = useState('');
    const [product, setProduct] = useState([] as IProduct[]); // lưu dữ liệu ban đầu
    const [products, setProducts] = useState([] as IProduct[]); // lưu dữ liệu search
    const [showSearchResults, setShowSearchResults] = useState(true);
    // const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const { data } = await instance.get("/products")
            setProduct(data.data)
        })()
    }, [])

    useEffect(() => {
        let productSearch = [...product]
        productSearch = productSearch.filter(pro => pro.name.toUpperCase().includes(search.toUpperCase()))
        setProducts(productSearch)
    }, [search, product])

    const handleProductClick = (_id: Number | string) => {
        setShowSearchResults(false); // Ẩn kết quả tìm kiếm khi người dùng click sản phẩm
        // navigate(`/detail/${id}`)
    };
    const tabs = [
        { name: 'Dashboard', link: '/admin' },
        { name: 'Quản lí danh mục', link: 'categories' },
        { name: 'Quản lí sản phẩm', link: 'products' },
        { name: 'Quản lí đơn hàng', link: '#' },
        { name: 'Quản lí bình luận', link: '#' },
        { name: 'Quản lí tài khoản', link: '#' }
    ];
    return (
        <>
            <div className="flex w-full h-screen" >
                <aside className="p-[20px] w-[250px] h-full bg-[#00A9FF] overflow-y-auto">
                    <div className="logo mb-[20px] w-full *:mx-auto text-center">
                        <img src="../src/assets/images/logoadmin.png" alt="" className="w-24" />
                        <p className="mt-[15px] text-white font-semibold">AKKA</p>
                    </div>
                    <ul className="list-none p-0 *:my-[5px] *:p-[15px] text-left *:text-white *:font-medium *:text-[14px] ">
                        {tabs.map(tab => (
                            <li
                                // hover:bg-[#AFD4FF] hover:rounded-[5px] hover:text-black
                                key={tab.name}
                                className={`${activeTab === tab.name ? 'bg-[#AFD4FF] text-black' : ""} rounded-[5px] py-1.5 `}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                <Link to={tab.link} className={`px-8 py-[10px] ${activeTab === tab.name ? 'text-black' : ''}`}>
                                    {tab.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="main-content w-full flex-1 mt-4 overflow-y-auto">
                    <div className="breadcrumb flex justify-between items-center  mx-5 mb-3 border rounded-lg border-gray-300 *:px-10 *:py-2.5">
                        <form className="">
                            <div className="relative">
                                <input type="text" id="default-search" onChange={(e) => { setSearch(e.target.value); setShowSearchResults(true); }}
                                    className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <button type="button" className="text-white absolute end-1 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                                {
                                    search && showSearchResults && (
                                        <div className="absolute bg-gray-100 w-max py-1 px-1">
                                            <div className="w-auto">
                                                {
                                                    products && products.length > 0 ? (
                                                        products.map((pro) => (
                                                            <Link to={`detail/${pro._id}`} onClick={() => handleProductClick(pro._id!)}
                                                                className="flex hover:bg-gray-300 w-auto">
                                                                <img src={`${pro.images}`} className="w-12 h-12 mr-3" />
                                                                <h1 className="mr-4 text-sm font-medium">{pro.name}</h1>
                                                                <b className="text-sm text-red-500">{pro.price}</b>
                                                            </Link>

                                                        ))
                                                    ) : (
                                                        <div>
                                                            <h1>Khong co san pham ban can tim</h1>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                        </form>
                        <div className="date-time flex items-center *:gap-1 font-semibold">
                            <span className="mr-3">{<CountTimer />}</span>
                            <Link to={"/"} >
                                {/* Đăng xuất */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <Outlet />
                </main>
            </div>
        </>
    )
}
export default AdminLayout