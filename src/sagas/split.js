
// main rule
const rule = yield call(
  rulesApi.createRule,
  ruleObject(
    shortId,
    sensorId,
    startSceneId,
    state.rooms,
    endScheduleId,
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
      startSceneId,
      roomId,
      endScheduleId,
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
resource.links.push("/schedules/" + startScheduleId);
resource.links.push("/schedules/" + endScheduleId);
resource.links.push("/rules/" + ruleId);
resource.links.push("/scenes/" + endSceneId);
resource.links.push("/scenes/" + startSceneId);
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