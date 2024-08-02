import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ICategory } from '../../interface/ICategory';
import { IProduct } from '../../interface/IProduct';

type Props = {
    categories: ICategory[];
    products: IProduct[]
}

const ShopAll = ({ categories, products }: Props) => {
    const [activeTab, setActiveTab] = useState('');
    const [productFilter, setProductFilter] = useState<IProduct[]>([]);
    const [isListOpen, setIsListOpen] = useState(false);
    const [isAsideOpen, setIsAsideOpen] = useState(true);

    useEffect(() => {
        setProductFilter(products)
    }, [products])

    const handleTabChange = (id: string) => {
        if (!id) {
            setProductFilter(products)
        } else {
            const productMap = products.filter((item) => item.categoryId == id)
            setProductFilter(productMap)
        }
    }

    return (
        <>
            <div className="flex w-full h-screen mt-2">
                <aside className="p-[20px] overflow-y-auto w-[250px]">
                    <ul className="list-none *:w-full mb-[5px] p-[15px] text-leftfont-medium text-[14px]">
                        {categories.map(category => (
                            <li
                                key={category._id as string}
                                className={`rounded-[5px] py-1.5 ${activeTab === (category._id as string) ? 'bg-[#AFD4FF] text-black' : ''} hover:bg-gray-200 px-2 py-3`}
                                onClick={() => handleTabChange(category._id as string)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className={`main-content flex-1 mt-4 overflow-y-auto border-l-2 px-4`}>
                    <div className="grid grid-cols-4 *:rounded-lg *:shadow-lg *:border *:mx-auto *:bg-gray-100 gap-1 *:px-3 *:py-6">
                        {productFilter.map((item) => (
                            <div className="*:text-center w-[270px] h-auto mb-5" key={item._id}>
                                <div className="relative group w-[250px] mb-2 rounded-xl place-items-center">
                                    <h1 className="text-xl">{item.name}</h1>
                                    <hr className="mt-2 w-6 mx-auto bg-gray-500 h-[2px]" />
                                    <p className="mx-2 mt-2 mb-4">{item.desc}</p>
                                    <img className="w-[140px] h-[160px] mx-auto mb-2" src={`${item.images}`} alt="" />
                                    <Link to={`/detail/${item._id}`}
                                        className="absolute scale-0 group-hover:scale-100 group-hover:translate-y-0  duration-200 z-[2] lg:w-[152px] mb:w-[136px] lg:h-[64px] mb:h-[48px] rounded-[100px] border-none bg-[#1A1E2630] text-sm text-white backdrop-blur-md left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                        Details
                                    </Link>
                                    <section className="hidden absolute top-0 left-0 bg-[#F2BC1B] px-3 py-1.5 text-white">$60 ounce</section>
                                </div>
                                <span className="text-sm font-semibold"><p>{item.price}$</p></span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
}

export default ShopAll;
