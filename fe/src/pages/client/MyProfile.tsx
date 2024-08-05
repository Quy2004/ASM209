import { SubmitHandler, useForm } from "react-hook-form";
import { USER_INFO_STORAGE_KEY } from "../../constants";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UploadCoudiary from "../../component/utils/Cloudiary";
import { UserApi } from "../../api/userApi";

type Inputs = {
  name: string;
  email: string;
  phone: string;
};

const MyProfile = () => {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");

  const userInfo = JSON.parse(
    localStorage.getItem(USER_INFO_STORAGE_KEY) as string
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    reset(userInfo);
    setPreview(userInfo?.avatar);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    if (!preview) {
      return toast.info("Vui lòng chọn ảnh");
    }

    try {
      let avatar = preview;
      if (file) {
        avatar = await UploadCoudiary(file);
      }

      const body = {
        ...values,
        avatar,
      };

      const res = await UserApi.update({
        userId: userInfo?._id,
        ...body,
      });

      localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(res?.data));
      alert("Cập nhật thành công");
      window.location.reload();
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-[1400px] mx-auto max-w-full py-12 px-3">
      <h1 className="uppercase font-semibold text-xl text-center">
        Cập nhật tài khoản
      </h1>

      <form
        action=""
        className="md:w-1/2 mx-auto max-w-full mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label htmlFor="">
            Họ tên
            <span className="text-red-500"> *</span>
          </label>
          <input
            {...register("name", {
              required: "Vui lòng nhập họ tên",
            })}
            type="text"
            placeholder="Họ tên"
            className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none mt-1"
          />

          {errors.name && (
            <p className="text-sm mt-1 text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="">
            Email
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email không đúng định dạng",
              },
            })}
            placeholder="Email"
            className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none mt-1"
          />

          {errors.email && (
            <p className="text-sm mt-1 text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="">
            Số điện thoại
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Số điện thoại không đúng định dạng",
              },
            })}
            placeholder="Số điện thoại"
            className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none mt-1"
          />

          {errors.phone && (
            <p className="text-sm mt-1 text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="">Avatar</label>

          <input
            type="file"
            name=""
            id=""
            className="block mt-1"
            onChange={onFileChange}
            accept="image/*"
          />
        </div>

        {preview && (
          <div className="mb-4">
            <label htmlFor="">Preview</label>

            <img
              src={preview}
              alt=""
              className="size-28 rounded object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-[#00A9FF] mt-4 w-full py-2 rounded-3xl text-white tracking-widest [&:disabled]:opacity-50"
        >
          Cập nhật thông tin
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
