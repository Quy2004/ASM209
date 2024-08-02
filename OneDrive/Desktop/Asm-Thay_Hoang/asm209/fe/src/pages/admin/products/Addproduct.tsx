import { useForm } from "react-hook-form";
import { IProduct } from "../../../interface/IProduct";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { ICategory } from "../../../interface/ICategory";
import { instance } from "../../../instance/instance";
import UploadCoudiary from "../../../component/utils/Cloudiary";

type Props = {
  onAdd: (product: IProduct) => void;
};

const productSchema = Joi.object({
  name: Joi.string().required().trim(),
  price: Joi.number().required().min(0),
  desc: Joi.string().optional(),
  images: Joi.any().optional(),
  categoryId: Joi.string().required(),
});

const AddProduct = ({ onAdd }: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await instance.get("/category");
      setCategories(data);
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: joiResolver(productSchema),
  });

  const onSubmit = async (product: IProduct) => {
    console.log(product);
    const uploadImg = await UploadCoudiary(product?.images[0])
    onAdd({ ...product, images: uploadImg });
    console.log(uploadImg);
  };


  return (
    <div className="relative overflow-x-auto shadow-lg border-2 sm:rounded-lg mx-5">
      <div className="mx-6 mt-6">
        <h1 className="p-2 text-sm rounded-md font-medium">Thêm Sản Phẩm</h1>
        <hr className="mt-4 bg-[#FFEA20] h-[2px]" />
      </div>
      <div className="py-2 mx-6 mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap">
            <div className="mb-5 w-[100px] mr-5">
              <label
                htmlFor="id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ID
              </label>
              <input
                type="number"
                id="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Auto"
                disabled
              />
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên Sản Phẩm
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">Không được để trống</p>
              )}
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Giá Sản Phẩm
              </label>
              <input
                type="number"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-red-500">
                  Không được để trống, và không được âm
                </p>
              )}
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="file_input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                {...register("images")}
              />
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả
              </label>
              <input
                type="text"
                id="desc"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("desc")}
              />
            </div>
            <div className="mb-5 w-[250px]">
              <label
                htmlFor="categoryId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Danh mục
              </label>
              <select
                id="categoryId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("categoryId")}
              >
                {categories.map((item) => (
                  <option key={item._id!} value={item._id!}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 mb-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
