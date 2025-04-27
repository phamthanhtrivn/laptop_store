import { Link, useNavigate } from "react-router-dom";
import {
  BookText,
  ChevronRight,
  Feather,
  Headset,
  PaintBucket,
} from "lucide-react";
import { images } from "../assets/assets";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const [laptops, setLaptops] = useState([]);
  const navigate = useNavigate();

  const categories = [
    "Đồ họa - Studio",
    "Học sinh - Sinh viên",
    "Mỏng nhẹ cao cấp",
    "Gaming",
  ];

  const fetchLaptops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      if (response.data.success) {
        setLaptops(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching laptops:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="flex flex-col justify-center space-y-6 animate-fadeInUp">
                <div className="space-y-8 text-center lg:text-start">
                  <div className="inline-block bg-red-100 text-[#E30019] px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    Khuyến mãi đặc biệt
                  </div>
                  <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tighter text-gray-900 transition-colors duration-500 hover:text-[#E30019]">
                    Laptop chất lượng cao <br /> với giá tốt nhất
                  </h1>
                  <p className="max-w-[600px] mx-auto lg:mx-0 text-gray-500 text-lg md:text-xl animate-fadeInUp delay-200">
                    Khám phá bộ sưu tập laptop mới nhất với hiệu suất vượt trội
                    và thiết kế hiện đại
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 min-[400px]:flex-row mt-2 justify-center lg:justify-start">
                  <button onClick={() => navigate('/products')} className="cursor-pointer px-8 py-3 bg-[#E30019] text-white rounded-md font-medium border border-[#E30019] hover:text-[#E30019] hover:bg-white transition-all duration-300 transform hover:scale-105">
                    Mua ngay
                  </button>
                  <button onClick={() => navigate('/products')} className="cursor-pointer px-8 py-3 rounded-md font-medium border border-[#E30019] text-[#E30019] bg-white hover:bg-[#E30019] hover:text-white transition-all duration-300 transform hover:scale-105">
                    Xem thêm
                  </button>
                </div>
              </div>

              {/* Image Content */}
              <div className="mx-auto lg:ml-auto flex w-full items-center justify-center relative group">
                <img
                  src={images.image}
                  width={800}
                  height={550}
                  alt="Laptop hiện đại"
                  className="rounded-xl object-cover shadow-lg transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-xl bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-10 md:py-20 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Sản phẩm nổi bật
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Khám phá các mẫu laptop mới nhất với công nghệ tiên tiến và
                  thiết kế hiện đại
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-12">
              {laptops.slice(0, 6).map((laptop, index) => (
                <ProductItem key={index} product={laptop} />
              ))}
            </div>
            <div className="flex justify-center">
              <button onClick={() => navigate('/products')} className="cursor-pointer flex items-center gap-1 px-8 py-3 bg-[#E30019] text-white rounded-md font-medium border border-[#E30019] hover:text-[#E30019] hover:bg-white transition-all duration-300 transform hover:scale-105">
                Xem tất cả sản phẩm
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                  Danh mục sản phẩm
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Khám phá các dòng laptop phù hợp với nhu cầu của bạn
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-16 sm:grid-cols-2 md:gap-10 lg:grid-cols-4">
              {/* Category Item */}
              <Link
                to={`/products/category/${categories[0]}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all hover:border-rose-400 hover:shadow-xl hover:scale-105 duration-300"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 mb-6 transition-colors group-hover:bg-rose-200">
                  <PaintBucket className="h-10 w-10 text-rose-600 group-hover:text-rose-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-700">
                  Đồ họa - Studio
                </h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Màn hình chất lượng cao, hiệu năng mạnh
                </p>
              </Link>

              {/* Category Item */}
              <Link
                to={`/products/category/${categories[1]}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all hover:border-rose-400 hover:shadow-xl hover:scale-105 duration-300"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 mb-6 transition-colors group-hover:bg-rose-200">
                  <BookText className="h-10 w-10 text-rose-600 group-hover:text-rose-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-700">
                  Học sinh - Sinh viên
                </h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Giá rẻ nhưng chất lượng tốt, phù hợp với nhu cầu học tập và
                  giải trí
                </p>
              </Link>

              {/* Category Item */}
              <Link
                to={`/products/category/${categories[2]}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all hover:border-rose-400 hover:shadow-xl hover:scale-105 duration-300"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 mb-6 transition-colors group-hover:bg-rose-200">
                  <Feather className="h-10 w-10 text-rose-600 group-hover:text-rose-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-700">
                  Mỏng nhẹ cao cấp
                </h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Thiết kế sang trọng, công nghệ tiên tiến
                </p>
              </Link>

              {/* Category Item */}
              <Link
                to={`/products/category/${categories[3]}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all hover:border-rose-400 hover:shadow-xl hover:scale-105 duration-300"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 mb-6 transition-colors group-hover:bg-rose-200">
                  <Headset className="h-10 w-10 text-rose-600 group-hover:text-rose-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-700">
                  Gaming
                </h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Hiệu năng mạnh mẽ cho game thủ
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
