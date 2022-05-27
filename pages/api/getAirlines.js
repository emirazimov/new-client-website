import * as axios from "axios"

const axiosInstance = axios.create({
  baseURL: `https://api.bookinglane.com/api/`,
  headers: {
    "App-Version": "1.2.36",
  },
})

export function getAirlines(req, res) {
  return axiosInstance.get(`place/airlines`).then((response) => {
    return response.data
  })
}
