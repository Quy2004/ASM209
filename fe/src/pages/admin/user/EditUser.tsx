import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { IUser } from '../../../interface/IUser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../../instance/instance';
import UploadCoudiary from '../../../component/utils/Cloudiary';

type Props = { onEditUser: (user: IUser) => void };

const userSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.any().optional(),
  role: Joi.number().valid(0, 1).required(),
});

const EditUser = ({ onEditUser }: Props) => {
    const [users, setUsers]= useState<IUser>()
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    resolver: joiResolver(userSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get(`/user/${id}`);
        reset({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          avatar: data.avatar,
          role: data.role,
        });
        setUsers(data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (formData: IUser) => {
    try {
      let uploadImg;
      if (formData.avatar && formData.avatar.length > 0) {
        uploadImg = await UploadCoudiary(formData.avatar[0]);
      } else {
        uploadImg = formData.avatar;
      }
      const updatedUser = {
        ...formData,
        avatar: uploadImg,
        id,
      };
      await onEditUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-lg border-2 sm:rounded-lg mx-5">
      <div className="mx-6 mt-6">
        <h1 className="p-2 text-sm rounded-md font-medium">Chỉnh Sửa Người Dùng</h1>
        <hr className="mt-4 bg-[#FFEA20] h-[2px]" />
      </div>
      <div className="py-2 mx-6 mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap">
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500">Không được để trống</p>}
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500">Không được để trống</p>}
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số Điện Thoại
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("phone")}
              />
              {errors.phone && <p className="text-red-500">Không được để trống</p>}
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="avatar"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Avatar
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="avatar"
                type="file"
                {...register("avatar")}
              />
            </div>
            <div className="mb-5 w-[250px] mr-5">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vai Trò
              </label>
              <select
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("role")}
              >
                <option value="1">Quản trị viên</option>
                <option value="0">Người dùng</option>
              </select>
            </div>
          </div>
          <div>
            <h1>Image Avata</h1>
            <img src={users?.avatar} alt="" className='w-[150px] rounded-md border border-black' />
          </div>
          <button
            type="submit"
            className="text-white mt-[20px] bg-blue-700 mb-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập Nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
