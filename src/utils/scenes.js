export function selectifyScenes(scenes, room, roomId) {
  let roomScenes = [];
  if (!room) {
    // need to find out home scenes
    Object.keys(scenes).forEach(scene => {
      if (scenes[scene].type === "GroupScene") {
        roomScenes.push({ [scene]: scenes[scene] });
      }
    });
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
