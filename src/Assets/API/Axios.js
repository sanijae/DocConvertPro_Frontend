import axios from "axios";

const base_url = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      'Api-Key': 'TPpYZ2qbcycpJ-pEr8cfUfloUWd2JTknOOG4WibND_I',
    }
  });
export const host_url = "http://127.0.0.1:8000"
export default base_url;
