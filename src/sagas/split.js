// first scene
const firstScene = yield call(
  scenesApi.createScene,
  sceneObject(false, props.type, lights)
);
yield put(scenesActions.createScene.success(firstScene));
const firstSceneId = firstScene.data[0].success.id;
// second schedule
const secondSchedule = Object.assign({}, firstSchedule);
secondSchedule.description = shortId + "_trigger end scene";
secondSchedule.name = shortId;
secondSchedule.command = groupObject(firstSceneId);
for (let light of lights) {
  const modifyFirstScene = yield call(
    scenesApi.modifySceneLights,
    firstSceneId,
    light,
    createLightstates(state.fadeSelect.value, props.type, false)
  );
  yield put(scenesActions.modifySceneLights.success(modifyFirstScene));
}
const secondScheduleData = yield call(
  schedulesApi.createSchedule,
  secondSchedule
);
yield put(schedulesActions.createSchedule.success(secondScheduleData));
const secondScheduleId = secondScheduleData.data[0].success.id;
// second scene
const secondScene = yield call(
  scenesApi.createScene,
  sceneObject(true, props.type, lights)
);
yield put(scenesActions.createScene.success(secondScene));
const secondSceneId = secondScene.data[0].success.id;
for (let light of lights) {
  const modifySecondScene = yield call(
    scenesApi.modifySceneLights,
    secondSceneId,
    light,
    createLightstates(state.fadeSelect.value, props.type, true)
  );
  yield put(scenesActions.modifySceneLights.success(modifySecondScene));
}
// main rule
const rule = yield call(
  rulesApi.createRule,
  ruleObject(
    state.name,
    sensorId,
    secondSceneId,
    state.rooms,
    secondScheduleId,
    true,
    state.timeOff,
    props.type
  )
);
yield put(rulesActions.createRule.success(rule));
const ruleId = rule.data[0].success.id;
// timeoff rule & group
let timeoffRuleId = null;
let roomId = null;
if (state.timeOff) {
  const room = yield call(roomsApi.createRoom, roomObject(lights));
  roomId = room.data[0].success.id;
  yield put(roomsActions.createRoom.success(room));
  const timeoffRule = yield call(
    rulesApi.createRule,
    ruleObject(
      state.name,
      sensorId,
      secondSceneId,
      roomId,
      secondScheduleId,
      false,
      state.timeOff,
      props.type
    )
  );
  yield put(rulesActions.createRule.success(rule));
  timeoffRuleId = timeoffRule.data[0].success.id;
}
// resources
let resource = resourceObject(state.name, props.type);
resource.links.push("/sensors/" + sensorId);
resource.links.push("/schedules/" + firstScheduleId);
resource.links.push("/schedules/" + secondScheduleId);
resource.links.push("/rules/" + ruleId);
resource.links.push("/scenes/" + firstSceneId);
resource.links.push("/scenes/" + secondSceneId);
if (state.timeOff) {
  resource.links.push("/rules/" + timeoffRuleId);
  resource.links.push("/groups/" + roomId);
}
if (state.rooms.length > 0) {
  state.rooms.forEach(room => {
    resource.links.push("/groups/" + room);
  });
} else {
  resource.links.push("/groups/" + 0);
}
const resourceData = yield call(resourcesApi.createResource, resource);
yield put(resourcesActions.createResource.success(resourceData));
yield put(actions.createRoutine.success());
} else if (props.type === "sleep") {
} else if (props.type === "routines") {
// clone scenes in roomScenes and pass
// 1 scene for each group, group 0 for home
// turn rooms off at @ rules routine end
} else if (props.type === "timers") {
}