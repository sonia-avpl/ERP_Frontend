import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import ApiService from "../services/axiosInstance";
import { upload } from "../services/api";

export function usePost(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const uploadImageOnSWithModule = async (images, typeId, type) => {
    return Promise.all(
      images.map(async (el) => {
        console.log(el);
        const reader = new FileReader();
        reader.readAsDataURL(el);
        reader.onload = async (e) => {
          console.log(e);
          let path = e.target.result?.split(",")[1];
          delete el.path;
          const extension = el.type.split("/")[1];
          let imgPayload = {
            ...el,
            name: el?.name,
            extension,
            fileType: el.type,
            fileSize: el?.size,
            typeId,
            type,
          };
          return await upload(imgPayload, path);
        };
      })
    );
  };
  const postData = async (url, body) => {
    setLoading(true);
    console.log(url, body);
    try {
      const res = await ApiService.post(url, body);
      setResponse(res.data);
      setError(null);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message); 
      setResponse(null);
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response, uploadImageOnSWithModule };
}
