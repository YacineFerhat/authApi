import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchTodos = (reload) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos/`
      );
      setData(data.data.todo);
    }
    fetchData();
  }, [reload]);
  return data;
};
