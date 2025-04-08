  /* eslint-disable react-hooks/exhaustive-deps */
  import React, { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import { useToken } from "../context/TokenContextProvider";
  import { toast } from "react-toastify";
  import { BookmarkPlus, ChevronLeft, ChevronRight, Edit, RefreshCcw, Search, Trash2 } from "lucide-react";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import Swal from 'sweetalert2/dist/sweetalert2.js'

  const Users = () => {
    const searchRef = useRef(null);
    const { backendUrl, token } = useToken();
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [userID, setUserID] = useState(null)

    const handleRefresh = async () => {
      fetchUserData()
      searchRef.current.value = ""
    }

    const handleSearch = async () => {
      const email = searchRef.current.value
      const response = await axios.get(backendUrl + `/api/user/email-user?email=${email}`)
      if (response.data.success) {
        setUsers([response.data.user])
      }
      else {
        toast.error(response.data.message)
      }
    }

    const handleDeleteUser = async (id) => {
      Swal.fire({
        title: "Bạn có muốn xóa người dùng này không?",
        showDenyButton: true,
        confirmButtonText: "Xóa",
        denyButtonText: `Hủy`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(backendUrl + `/api/user/delete/${id}`, {headers: {token}})
          if (response.data.success) {
            Swal.fire("Xóa người dùng thành công!", "", "success");
            fetchUserData()
          }
          else {
            Swal.fire("Không thể xóa người dùng này!");
          }
          
        } 
      });
    }
    

    const handleOpenEditModal = (id) => {
      setUserID(id); 
      setShowEditModal(true)
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          backendUrl + `/api/user/list?page=${page}`,
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          setUsers(response.data.users);
          setPagination(response.data.pagination);
        } else {
          toast.error("Không thể lấy dữ liệu người dùng!");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    useEffect(() => {
      fetchUserData();
    }, [page]);

    return (
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5">Quản Lý Người Dùng</h1>
        <div className="flex justify-between">
          <div className="flex gap-5 text-gray-700 items-center">
            <p>Nhập email cần tìm: </p>
            <input
              type="text"
              placeholder="ex: phamthanhtri@gmail.com"
              ref={searchRef}
              className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
            />
            <button onClick={() => handleSearch()} className="items-center w-[250px] hover:text-red-500 hover:bg-white duration-300 transition-all cursor-pointer bg-red-500 border border-red-500 text-white flex px-4 py-2 rounded-md gap-5 font-medium">
              <Search />
              <p>Tìm kiếm</p>
            </button>
          </div>
          <div className="flex gap-5 items-center">
            <button onClick={() => setShowAddModal(true)} className="hover:text-red-500 hover:bg-white duration-300 transition-all cursor-pointer bg-red-500 border border-red-500 text-white flex px-4 py-2 rounded-md gap-5 font-medium">
              <BookmarkPlus />
              <p>Thêm</p>
            </button>
            <button onClick={() => handleRefresh()} className="hover:bg-red-500 hover:text-white duration-300 transition-all cursor-pointer bg-white border border-red-500 text-red-500 flex px-4 py-2 rounded-md gap-5 font-medium">
              <RefreshCcw />
              <p>Tải lại</p>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full table-auto border-collapse shadow-lg rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-red-500 to-indigo-500 text-white text-sm">
                <th className="px-4 py-3">STT</th>
                <th className="px-4 py-3">Họ và tên</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Số điện thoại</th>
                <th className="px-4 py-3">Địa chỉ</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white text-gray-800">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100 transition border-b">
                  <td className="px-4 py-3">{(page - 1) * pagination.limitPerPage + index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    {new Date(user.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3">
                    {[
                      user.address?.street,
                      user.address?.ward,
                      user.address?.district,
                      user.address?.city,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleOpenEditModal(user._id)} className="text-yellow-500 hover:text-yellow-600 transition cursor-pointer">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:text-red-600 transition cursor-pointer">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between">
          <div className="text-sm mt-6" >
            Tổng số người dùng: {pagination.totalUsers}
          </div>
          <div className="flex justify-center items-center gap-5 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span>
              Trang <strong>{page}</strong> / {pagination.totalPages}
            </span>
            <button
              disabled={page === pagination.totalPages}
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, pagination.totalPages))
              }
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        {showAddModal && (
          <AddUserModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
        )}
        {showEditModal && (
          <EditUserModal id={userID} isOpen={showEditModal} onClose={() => setShowEditModal(false)} />
        )}
      </div>
    );
  };

  export default Users;
