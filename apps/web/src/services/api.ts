import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    apikey: process.env.REACT_APP_SUPABASE_KEY,
    Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
  },
});

export default api;