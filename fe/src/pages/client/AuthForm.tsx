/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { AuthApi, ILoginBody, IRegisterBody } from "../../api/authApi";
// import { toast } from "react-toastify";
import { TOKEN_STORAGE_KEY, USER_INFO_STORAGE_KEY } from "../../constants";

type Props = {
  isLogin?: boolean;
};

type Inputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const AuthForm = ({ isLogin }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Inputs>();

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
    //   toast.success("Đăng ký thành công");
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

      if (data.user.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
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
                      required: "Vui lòng nhập họ tên",
                    })}
                    id=""
                    placeholder="Name"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    {...register("email", {
                      required: "Vui lòng nhập email",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Email không đúng định dạng",
                      },
                    })}
                    id=""
                    placeholder="Email"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    {...register("phone", {
                      required: "Vui lòng nhập số điện thoại",
                      pattern: {
                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                        message: "Số điện thoại không đúng định dạng",
                      },
                    })}
                    id=""
                    placeholder="Phone"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu",
                    })}
                    id=""
                    placeholder="Password"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
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
                  disabled={!isValid}
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
                      required: "Vui lòng nhập email",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Email không đúng định dạng",
                      },
                    })}
                    id=""
                    placeholder="Email"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu",
                    })}
                    id=""
                    placeholder="Password"
                    className="bg-gray-100 border-l-4 border-[#00A9FF] w-full py-2 pl-3 outline-none"
                  />
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
                  disabled={!isValid}
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
