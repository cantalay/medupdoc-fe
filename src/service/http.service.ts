import axios from "axios";

//TODO: Change here to BE host and port
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  /*
  headers: { Authorization: APIKEY } as HeadersDefaults,*/
});
function useAuditLogHttp() {
  return axiosInstance;
}

export { useAuditLogHttp };
