import { authHeader } from "../helpers/authHeader";
import httpClient from "./httpClient";
import { server } from "./constants";

export const sponsorService = {
  fetchAds,
  addAds,
  editAds,
  deleteAds,
};

function fetchAds() {
  const Axiosmodel = server.FETCH_ADS;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function addAds(data) {
  const Axiosmodel = server.ADD_ADS;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function editAds(data) {
  const Axiosmodel = server.EDIT_ADS;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteAds(data) {
  const Axiosmodel = server.DELETE_ADS;

  return new Promise((resolve, reject) => {
    httpClient({
      method: Axiosmodel.method,
      url: Axiosmodel.url,
      data,
      withCredentials: true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
