import { Link } from "react-router-dom"
import CountdownTimer from "./CountdownTimer"
import { Drawer } from "flowbite-react";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from "../constants";
import { IProduct } from "../interface/IProduct";
import { instance } from "../instance/instance";

const Header = () => {
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

    console.log(products);
    // console.log(search);
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    // iconuser
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl(null);
    };
    //
    const isLogin = localStorage.getItem(TOKEN_STORAGE_KEY);
    const userInfo = JSON.parse(
        localStorage.getItem(USER_INFO_STORAGE_KEY) as string
    );

    const onLogout = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_INFO_STORAGE_KEY);
        window.location.href = "/";
    };
    return (
        <>
            <header>
                {/* top header  */}
                <div
                    className="w-full bg-[#00A9FF] lg:h-[37px] mb:h-[34px] *:text-white flex justify-center items-center *:lg:text-sm *:mb:text-xs gap-x-4">
                    <span className=" lg:w-auto mb:w-[266px] mb:truncate">LIMITED OFFER: 30% OFF. Use RABBIT30 at
                        Checkout.</span>
                    <span><CountdownTimer /></span>
                </div>

                {/* logo, search and cart  */}
                <div className="w-full flex justify-center items-center border-b">
                    <div className="container w-[1440px] lg:h-[760x] mb:h-[56px] flex justify-between *:flex *:items-center items-center">
                        <div>
                            <Link to={"/"}>
                                <img className="lg:translate-x-[64px] mb:translate-x-[-11.5px] lg:w-[167px] lg:h-[40px] mb:w-[119px] mb:h-[28px]"
                                    src="../src/assets/images/logos.png" alt="" />
                            </Link>
                        </div>
                        <div className="mb:hidden lg:block">
                            <div className="items-center ">
                                <div className=" h-[56px] flex items-center *:border-gray-200 ">
                                    <ul className="flex justify-center  *:flex *:justify-center *:px-8 *:py-2">
                                        <li>
                                            <Link to={""}>All</Link>
                                        </li>
                                        <li>
                                            <Link to={"/shop"}>Shop</Link>
                                        </li>
                                        <li>
                                            <Link to={"#"}>Blog</Link>
                                        </li>
                                        <li>
                                            <Link to={"#"}>About us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="lg:gap-x-6 mb:gap-x-4 lg:-translate-x-[60px] mb:-translate-x-[20px]">
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
                            {isLogin ? (
                                <div className="flex items-center gap-x-1">
                                    {/* <Link to={userInfo?.role === "ADMIN" ? "/admin" : "/profile"}>
                                        Hi, {userInfo?.name}
                                    </Link> */}
                                    <button onClick={handleClick} id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        className="*:hover:opacity-50 px-4 py-2 border-r-2 border-[#]">
                                        Hi, {userInfo?.name}
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleClick} id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    className="*:hover:opacity-50 px-4 py-2 border-r-2 border-[#]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </button>
                            )}
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose2}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {!isLogin ? (
                                    <>
                                        <MenuItem onClick={handleClose2}>
                                            <Link to={"/login"}>
                                                Login
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose2}>
                                            <Link to={"/register"}>
                                                Register
                                            </Link>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem onClick={handleClose2}>
                                            <Link to={"/"}>
                                                Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose2}>
                                            <p onClick={onLogout} className="cursor-pointer">
                                                Đăng xuất
                                            </p>
                                        </MenuItem>
                                    </>
                                )}

                                {/* <MenuItem onClick={handleClose2}>Logout</MenuItem> */}
                            </Menu>
                            {/* |Cart */}
                            <button className="h-[24px] *:hover:opacity-50" onClick={() => setIsOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="size-6 w-[24px]">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <span className="absolute bg-red-500 top-2 rounded-[50%] w-[16px] h-[16px] text-xs text-white">0</span>
                            </button>
                        </div>
                    </div>
                </div>

            </header >
            <Drawer open={isOpen} onClose={handleClose} position="right">
                <Drawer.Header title="Cart" />
                <Drawer.Items>
                    <div className="flex *:mx-1 my-1 items-center border-b-2 pb-2 mb-2">
                        <div className="w-1/5">
                            <img src="../src/assets/images/shirt.png" alt="" className="border rounded-lg p-1" />
                        </div>
                        <div className="w-3/5">
                            <h3 className="text-base font-semibold">Sơ Mi Trắng</h3>
                            <p className="text-xs text-red-500 font-semibold">100.000 VNĐ</p>
                        </div>
                        <div className="1/5">
                            <button className="border p-2 rounded-lg bg-gray-200 hover:bg-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <a
                            href="#"
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                            Buy Now
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                            Checking&nbsp;
                            <svg
                                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </div>
                </Drawer.Items>
            </Drawer>
        </>
    )
}
export default Header