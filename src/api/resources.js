import axios from "axios";
import { RESOURCES } from "constants/endpoints";

export function getResources() {
  return axios.request({
    method: "get",
    url: RESOURCES
  });
}

export function createResource(body) {
  return axios.request({
    method: "post",
    url: RESOURCES,
    data: JSON.stringify(body)
  });
}

export function modifyResource(id, body) {
  return axios.request({
    method: "put",
    url: RESOURCES + "/" + id,
    data: JSON.stringify(body)
  });
}
