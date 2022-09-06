import axios from "axios";

export const NodeURL = "http://localhost:2022";
export const client = axios.create({
  baseURL: NodeURL,
});

client.defaults.responseType = "json";

const request = (options) => {
  const onSuccess = (response) => {
    if (response.data.status === "00") {
      alert("something Went wrong");
    }
    return response.data;
  };
  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};
export default request;

// const useFetch = (url) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${NodeURL}/${url}`);
//         setData(res.data);
//       } catch (err) {
//         setError(err);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [url]);

//   return { data, loading, error };
