/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useState } from "react";
import { images } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useToken } from "../context/TokenContextProvider";

const AddUserModal = ({ fetchProductsData, isOpen, onClose }) => {
  const { backendUrl, token } = useToken();

  const [isLoading, setIsLoading] = useState(false);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const nameRef = useRef("");
  const priceRef = useRef(0);
  const descRef = useRef("");
  const stockRef = useRef(0);
  const cpuRef = useRef("");
  const ramRef = useRef("");
  const storageRef = useRef("");
  const gpuRef = useRef("");
  const screenRef = useRef("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCate, setSelectedCate] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();

      const name = nameRef.current.value;
      const price = priceRef.current.value;
      const description = descRef.current.value;
      const stock = stockRef.current.value;
      const cpu = cpuRef.current.value;
      const ram = ramRef.current.value;
      const storage = storageRef.current.value;
      const gpu = gpuRef.current.value;
      const screen = screenRef.current.value;
      const brand = selectedBrand;
      const category = selectedCate;

      if (!image1 || !image2 || !image3 || !image4) {
        toast.error("Vui lòng chọn ít nhất 1 ảnh!");
        return;
      }

      if (!name.trim()) {
        toast.error("Tên sản phẩm không được để trống!");
        nameRef.current.focus();
        return;
      }

      if (isNaN(price) || Number(price) <= 0) {
        toast.error("Giá sản phẩm phải là số lớn hơn 0!");
        priceRef.current.focus();
        return;
      }

      if (!description.trim()) {
        toast.error("Mô tả sản phẩm không được để trống!");
        descRef.current.focus();
        return;
      }

      if (isNaN(stock) || Number(stock) < 0) {
        toast.error("Số lượng sản phẩm phải là số lớn hơn hoặc bằng 0!");
        stockRef.current.focus();
        return;
      }

      if (!cpu.trim()) {
        toast.error("Vui lòng nhập thông tin CPU!");
        cpuRef.current.focus();
        return;
      }

      if (!ram.trim()) {
        toast.error("Vui lòng nhập thông tin RAM!");
        ramRef.current.focus();
        return;
      }

      if (!storage.trim()) {
        toast.error("Vui lòng nhập thông tin bộ nhớ!");
        storageRef.current.focus();
        return;
      }

      if (!gpu.trim()) {
        toast.error("Vui lòng nhập thông tin GPU!");
        gpuRef.current.focus();
        return;
      }

      if (!screen.trim()) {
        toast.error("Vui lòng nhập thông tin màn hình!");
        screenRef.current.focus();
        return;
      }

      if (!brand.trim()) {
        toast.error("Vui lòng chọn thương hiệu!");
        return;
      }

      if (!category.trim()) {
        toast.error("Vui lòng chọn danh mục!");
        return;
      }

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("cpu", cpu);
      formData.append("ram", ram);
      formData.append("storage", storage);
      formData.append("gpu", gpu);
      formData.append("screen", screen);
      formData.append("brand", brand);
      formData.append("category", category);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/products/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        nameRef.current.value = "";
        priceRef.current.value = 0;
        descRef.current.value = "";
        stockRef.current.value = 0;
        cpuRef.current.value = "";
        ramRef.current.value = "";
        storageRef.current.value = "";
        gpuRef.current.value = "";
        screenRef.current.value = "";
        setSelectedBrand("");
        setSelectedCate("");
        toast.success(response.data.message);
        fetchProductsData();
        onClose();
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modalOverlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-white/20 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-6xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <img src={images.Loading_icon} alt="loading" className="w-full" />
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-indigo-500 text-white rounded py-5">
          Thêm sản phẩm
        </h2>

        <form
          onSubmit={handleAddProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* BÊN TRÁI */}
          <div className="space-y-5">
            {/* Ảnh sản phẩm */}
            <section>
              <h3 className="font-medium mb-2">Tải ảnh lên</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label htmlFor="image1">
                  <img
                    className="w-full"
                    src={
                      !image1 ? images.upload_area : URL.createObjectURL(image1)
                    }
                    alt="upload_area"
                  />
                  <input
                    onChange={(e) => setImage1(e.target.files[0])}
                    type="file"
                    id="image1"
                    hidden
                  />
                </label>
                <label htmlFor="image2">
                  <img
                    className="w-full"
                    src={
                      !image2 ? images.upload_area : URL.createObjectURL(image2)
                    }
                    alt="upload_area"
                  />
                  <input
                    onChange={(e) => setImage2(e.target.files[0])}
                    type="file"
                    id="image2"
                    hidden
                  />
                </label>
                <label htmlFor="image3">
                  <img
                    className="w-full"
                    src={
                      !image3 ? images.upload_area : URL.createObjectURL(image3)
                    }
                    alt="upload_area"
                  />
                  <input
                    onChange={(e) => setImage3(e.target.files[0])}
                    type="file"
                    id="image3"
                    hidden
                  />
                </label>
                <label htmlFor="image4">
                  <img
                    className="w-full"
                    src={
                      !image4 ? images.upload_area : URL.createObjectURL(image4)
                    }
                    alt="upload_area"
                  />
                  <input
                    onChange={(e) => setImage4(e.target.files[0])}
                    type="file"
                    id="image4"
                    hidden
                  />
                </label>
              </div>
            </section>

            {/* Tên & Giá */}
            <div>
              <label className="block font-medium mb-1">Tên sản phẩm</label>
              <input
                ref={nameRef}
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập tên..."
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Giá (VNĐ)</label>
              <input
                ref={priceRef}
                type="number"
                className="w-full px-3 py-2 border rounded"
                placeholder="1000000"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block font-medium mb-1">Mô tả sản phẩm</label>
              <textarea
                ref={descRef}
                rows="4"
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập mô tả..."
              />
            </div>
          </div>

          {/* BÊN PHẢI */}
          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Thương hiệu</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">-- Chọn thương hiệu --</option>
                <option value="ASUS">ASUS</option>
                <option value="ACER">ACER</option>
                <option value="MSI">MSI</option>
                <option value="LENOVO">LENOVO</option>
                <option value="DELL">DELL</option>
                <option value="HP">HP</option>
                <option value="LG">LG</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Số lượng trong kho
                </label>
                <input
                  ref={stockRef}
                  type="number"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Danh mục</label>
                <select
                  value={selectedCate}
                  onChange={(e) => setSelectedCate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">-- Chọn lại danh mục --</option>
                  <option value="Đồ họa - Studio">Đồ họa - Studio</option>
                  <option value="Học sinh - Sinh viên">
                    Học sinh - Sinh viên
                  </option>
                  <option value="Mỏng nhẹ cao cấp">Mỏng nhẹ cao cấp</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>
            </div>

            {/* Thông số kỹ thuật */}
            <section>
              <h3 className="font-medium mb-2">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  ref={cpuRef}
                  className="px-3 py-2 border rounded"
                  placeholder="CPU (e.g., i5 12400F)"
                />
                <input
                  ref={ramRef}
                  className="px-3 py-2 border rounded"
                  placeholder="RAM (e.g., 16GB DDR5)"
                />
                <input
                  ref={storageRef}
                  className="px-3 py-2 border rounded"
                  placeholder="Storage (e.g., 512GB SSD)"
                />
                <input
                  ref={gpuRef}
                  className="px-3 py-2 border rounded"
                  placeholder="GPU (e.g., RTX 3060)"
                />
                <input
                  ref={screenRef}
                  className="px-3 py-2 border rounded"
                  placeholder="Màn hình (e.g., 15.6'' FHD)"
                />
              </div>
            </section>
          </div>

          {/* Nút submit ở giữa cả 2 cột */}
          <div className="col-span-1 md:col-span-2 text-center pt-4">
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 font-bold transition mr-5"
            >
              Thêm sản phẩm
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 font-bold transition"
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(AddUserModal);
