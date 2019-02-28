import { homeScenes } from "constants/homeScenes";

export function selectifyScenes(scenes, room, roomId) {
  let roomScenes = [];
  if (!room) {
    Object.keys(homeScenes).forEach(scene => {
      roomScenes.push({[scene]: homeScenes[scene]})
    })
  } else {
    Object.keys(scenes).forEach(scene => {
      if (
        JSON.stringify(scenes[scene].lights.sort()) ===
        JSON.stringify(roomId ? room[roomId].lights.sort() : room.lights.sort())
      ) {
        roomScenes.push({ [scene]: scenes[scene] });
      }
    });
  }
  let selectors = [];
  roomScenes.forEach(scene => {
    let sceneValue = Object.values(scene)[0];
    let selector = {
      value: sceneValue,
      label: sceneValue.name,
      key: Object.keys(scene)[0]
    };
    selectors.push(selector);
  });
  return selectors;
}
