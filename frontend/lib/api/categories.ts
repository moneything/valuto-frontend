import api from "../api";

export async function fetchCategories() {
  const res = await api.get("/categories");
  return res.data.data;
}

export async function fetchCategory(id: string) {
  const res = await api.get(`/categories/${id}`);
  return res.data.data;
}
