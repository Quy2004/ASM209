import { useForm } from "react-hook-form";
import { ICategory } from "../../../interface/ICategory"
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

type Props = {
    onAdd: (categories: ICategory)=>void
  }
  const cateSchemma= Joi.object({
    name: Joi.string().required().trim()
  })
const AddCate = ({onAdd }: Props) => {
    const {register, handleSubmit, formState: {errors}, reset}=useForm<ICategory>({
        resolver: joiResolver(cateSchemma)
    })
    const onSubmit= (cate: ICategory)=>{
        onAdd(cate)
    }
    return (
        <div className='relative overflow-x-auto shadow-lg border-2 sm:rounded-lg mx-5'>
            <div className='mx-6 mt-6'>
                <h1 className='p-2 text-sm rounded-md font-medium'>Thêm Danh Mục</h1>
                <hr className='mt-4 bg-[#FFEA20] h-[2px]' />
            </div>
            <div className='py-2 mx-6  mt-2'>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex *:mr-5'>
                        <div className="mb-5 w-[200px]">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                            <input type="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ID Tự Động Tăng" disabled />
                        </div>
                        <div className="mb-5 w-[400px]">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên Danh Mục</label>
                            <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("name", {required: true})}  />
                            {errors.name&&(
                                <p className="text-red-500">Tên danh mục không được để trống</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thêm</button>
                </form>
            </div>
        </div>
    )
}
export default AddCate