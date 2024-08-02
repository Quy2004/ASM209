
import { Link } from 'react-router-dom'
import { ICategory } from '../../../interface/ICategory'

type Props = {
  categoris: ICategory[],
  onDel: (id: number | string) => void
}

const Categories = ({ categoris, onDel }: Props) => {
  console.log(categoris);
  return (
    <>
      <div className="relative overflow-x-auto shadow-lg border-2 sm:rounded-lg mx-5">
        <div className='py-2 mx-6 mt-6'>
          <Link to="addcate" className='bg-[#38E54D] p-2 text-sm rounded-md font-medium'>Thêm Danh Mục</Link>
          <hr className='mt-5 bg-[#FFEA20] h-[2px]' />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Tên Danh Mục
              </th>
              <th scope="col" className="px-6 py-3">
                Tác Vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {
              categoris.map((cate: ICategory, i) => (
                <tr key={cate._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">
                    {cate.name}
                  </td>
                  <td className="flex px-6 py-4 *:text-black *:px-2 *:py-1 *:mx-1 *:rounded-md ">
                    <Link to={`/admin/categories/editCate/${cate._id}`} className='bg-yellow-300'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </Link>
                    <button onClick={() => onDel(cate._id!)} className='bg-red-500'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </>
  )
}
export default Categories