import axios from "axios";
import { SCENES } from "constants/endpoints";

export function getScenes() {
  return axios.request({
    method: "get",
    url: SCENES
  });
}

export function modifyScene(id, body) {
  return axios.request({
    method: "put",
    url: SCENES + "/" + id,
    data: JSON.stringify(body)
  });
}

export function getScene(id) {
  return axios.request({
    method: "get",
    url: SCENES + "/" + id
  });
}

export function createScene(body) {
  return axios.request({
    method: "post",
    url: SCENES,
    data: JSON.stringify(body)
  });
}

export function modifySceneLights(id, lightId, body) {
  return axios.request({
    method: "put",
    url: SCENES + "/" + id + "/lightstates/" + lightId,
    data: JSON.stringify(body)
  });
}

export function deleteScene(id) {
  return axios.request({
    method: "delete",
    url: SCENES + "/" + id
  });
}
