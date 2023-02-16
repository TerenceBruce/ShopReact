import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactapp-d41d0-default-rtdb.europe-west1.firebasedatabase.app/",
});
export default instance;