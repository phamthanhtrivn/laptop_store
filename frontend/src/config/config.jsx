export const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export const categories = [
  "Đồ họa - Studio",
  "Học sinh - Sinh viên",
  "Mỏng nhẹ cao cấp",
  "Gaming",
];
export const priceRanges = [
  { label: "Mặc định", min: 0, max: 0 },
  { label: "Dưới 10 triệu", min: 0, max: 10000000 },
  { label: "10 triệu - 20 triệu", min: 10000000, max: 20000000 },
  { label: "20 triệu - 30 triệu", min: 20000000, max: 30000000 },
  { label: "Trên 30 triệu", min: 30000000, max: 100000000 },
];
export const brands = ["ASUS", "ACER", "MSI", "LENOVO", "DELL", "HP", "LG"];
