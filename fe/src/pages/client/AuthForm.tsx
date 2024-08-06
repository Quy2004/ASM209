/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { AuthApi, ILoginBody, IRegisterBody } from "../../api/authApi";
import { toast } from "react-toastify";
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from "../../constants";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type Props = {
  isLogin?: boolean;
};

type Inputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
const registerSchemma= Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().required().email({tlds: false}),
  phone: Joi.number().required(),
  password: Joi.string().min(6).required(),
})
const loginSchemma= Joi.object({
  email: Joi.string().required().email({tlds: false}),
  password: Joi.string().min(6).required(),
})

const AuthForm = ({ isLogin }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: joiResolver( isLogin ?registerSchemma : loginSchemma  )
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    if (isLogin) {
      login(values);
    } else {
      registerAccount(values);
    }
  };

  const registerAccount = async (data: IRegisterBody) => {
    try {
      await AuthApi.register(data);
      toast.success("Đăng ký thành công");
      reset();
      navigate("/login");
    } catch (error: any) {
      //   toast.error(
      //     error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      //   );
    }
  };

  const login = async (body: ILoginBody) => {
    try {
      const { data } = await AuthApi.login(body);
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(data.user));

      if (data.user.role === 1) {
       navigate("/admin");
       toast.success("Đăng nhập vào admin thành công");
      } else {
       navigate("/");
       toast.success("Đăng nhập thành công");
      }
    } catch (error: any) {
      //   toast.error(
      //     error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      //   );
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex text-white items-center bg-[url(../src/assets/images/bg-login.jpg)] bg-no-repeat bg-cover h-lvh w-[50%]">
          <div className="text-center tracking-widest mx-auto">
            <div>
              <h4 className="text-2xl">Nice to meet you again</h4>
              <h1 className="text-[60px]">WELCOME BACK</h1>
              <hr className="w-[80px] mx-auto py-1 rounded-xl bg-white" />
            </div>
            <div className="w-[500px] mt-10">
              <p className="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrum exercitationem ullam corporis
                suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <Link to={"/"} className="flex items-center *:mx-1 hover:opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Trang chủ
          </Link>
          <div className="text-center my-[50px]">
            <h1 className="text-3xl text-[#00A9FF] font-medium">
              {isLogin ? "Login Account" : "Register Account"}
            </h1>
            <p className="text-sm text-gray-500 text-center w-[300px] mt-6 mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
              tempor incidunt ut labore et dolore aliqua.
            </p>
          </div>
          <form
            action=""
            className="*:my-4 w-[340px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {!isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    {...register("name", {
                      required: true
                    })}
                    id=""
                    placeholder="Name"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                  {errors.name&&(
                    <p className="text-red-500">Tên không được để trống </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register("email", {
                      required: true
                    })}
                    id=""
                    placeholder="Email"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                  {errors.email&&(
                    <p className="text-red-500">Email không được để trống và Phải đúng định dạng</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register("phone", {
                      required: true
                    })}
                    id=""
                    placeholder="Phone"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                  {errors.phone&&(
                    <p className="text-red-500">Số điện thoại không được để trống</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: true
                    })}
                    id=""
                    placeholder="Password"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                  {errors.password&&(
                    <p className="text-red-500">Mật khẩu không được để trống và ít nhất 6 kí tự</p>
                  )}
                </div>

                <div className="flex justify-end items-center">
                  <Link
                    to={"/login"}
                    className="text-[#00A9FF] hover:font-medium hover:text-blue-600 text-sm"
                  >
                    Back to login!
                  </Link>
                </div>

                <button
                  type="submit"
                  className="bg-[#00A9FF] w-full py-2 rounded-3xl text-white tracking-widest [&:disabled]:opacity-50"
                  disabled={!errors}
                >
                  REGISTER
                </button>
              </>
            )}
            {isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    {...register("email", {
                      required: true
                    })}
                    id=""
                    placeholder="Email"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                  {errors.email&&(
                    <p className="text-red-500">email không được để trống và phải úng định dạng</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: true
                    })}
                    id=""
                    placeholder="Password"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                  {errors.password&&(
                    <p className="text-red-500">Mật khẩu không được để trống và ít nhất 6 kí tự</p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    <input type="checkbox" name="" id="" className="" /> Keep me
                    a signed in
                  </span>
                </div>
                <span className="flex justify-between">
                  <Link
                    to={"/register"}
                    className="text-[#00A9FF] hover:font-medium hover:text-blue-600 text-sm"
                  >
                    {" "}
                    Don't have an account yet?
                  </Link>
                  <Link
                    to={"/forgotpass"}
                    className="text-sm hover:font-medium"
                  >
                    Forgot Password ?
                  </Link>
                </span>

                <button
                  type="submit"
                  className="bg-[#00A9FF] w-full py-2 rounded-3xl text-white tracking-widest [&:disabled]:opacity-50"
                  disabled={!errors}
                >
                  LOGIN
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default AuthForm;
