import { MouseEvent, useEffect, useState } from "react";
import { UserApi } from "../../../api/userApi";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  role: number;
  password: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userSelected, setUserSelected] = useState<IUser>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, user: IUser) => {
    setUserSelected(user);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await UserApi.getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteUser = async (id: string) => {
    try {
      const isConfirm = confirm("Xác nhận xoá tài khoản này?");

      if (isConfirm) {
        await UserApi.removeUser(id);
        fetchUsers();
        toast.success("Xoá tài khoản thành công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const onUpdateUserRole = async () => {
    if (!userSelected) return;

    const role = userSelected.role === 0 ? 1 : 0;
    try {
      const { name, email, phone, password } = userSelected;

      await UserApi.update({
        userId: userSelected._id,
        name,
        email,
        phone,
        password,
        role,
      });

      handleClose();
      fetchUsers();
      toast.success("Cập nhật vai trò thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-lg border-2 sm:rounded-lg mx-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Vai trò
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((it, index) => (
              <tr
                key={it._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{it.name}</td>
                <td className="px-6 py-4">{it.email}</td>
                <td className="px-6 py-4">{it.phone}</td>
                <td className="px-6 py-4">
                  {it.avatar && (
                    <img
                      src={it.avatar}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                </td>
                <div className="px-6 py-4">
                  <Button onClick={(e) => handleClick(e, it)}>
                    {it.role === 1 ? "Admin" : "User"}
                  </Button>
                </div>
                <td className="px-6 py-4">
                  <div className="flex *:text-black *:px-2 *:py-1 *:mx-1 *:rounded-md">
                    <button
                      onClick={() => onDeleteUser(it._id)}
                      className="bg-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onUpdateUserRole}>
          {userSelected?.role === 1 ? "USER" : "ADMIN"}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserManagement;
