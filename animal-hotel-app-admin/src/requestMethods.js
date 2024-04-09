import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const persistData = localStorage.getItem("persist:root");
let token = "";

try {
    const parsedData = JSON.parse(localStorage.getItem("persist:root"));
    const userData = JSON.parse(parsedData.user);
    token = userData?.currentUser?.accessToken || "";
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});