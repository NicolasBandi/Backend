import axios from "axios";

export async function get() {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    return response.data;
  } catch (error) {
    throw new Error("Error getting the posts");
  }
}

export async function getById(id) {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error searching the posts");
  }
}

export async function add(data) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/products",
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error adding a new post");
  }
}

export async function updateById(data, id) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/products/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating a post");
  }
}

export async function deleteById(id) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting a post");
  }
}