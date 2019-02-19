import axios from "axios";
import { GROUPS } from "constants/endpoints";

export function getRooms() {
  return axios.request({
    method: "get",
    url: GROUPS
  });
}

export function modifyRoom(id, body) {
  return axios.request({
    method: "put",
    url: GROUPS + "/" + id + "/action",
    data: JSON.stringify(body)
  });
}

export function modifyRoomAttr(id, body) {
  return axios.request({
    method: "put",
    url: GROUPS + "/" + id + "/",
    data: JSON.stringify(body)
  });
}
