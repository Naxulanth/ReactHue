import { createRequestTypes } from "../actions";
import { create } from "domain";

export const LIGHTS_GET = createRequestTypes("LIGHTS_GET");
export const LIGHTS_PUT = createRequestTypes("LIGHTS_PUT");
export const LIGHTS_PUT_ATTR = createRequestTypes("LIGHTS_PUT_ATTR");

export const ROOMS_GET = createRequestTypes("ROOMS_GET");
export const ROOMS_PUT = createRequestTypes("ROOMS_PUT");
export const ROOMS_PUT_ATTR = createRequestTypes("ROOMS_PUT_ATTR");
export const ROOMS_CREATE = createRequestTypes("ROOMS_CREATE");

export const SCENES_GET = createRequestTypes("SCENES_GET");
export const SCENE_GET = createRequestTypes("SCENE_GET");
export const SCENES_PUT = createRequestTypes("SCENES_PUT");
export const SCENE_LIGHTS_PUT = createRequestTypes("SCENE_LIGHTS_PUT");
export const SCENE_POST = createRequestTypes("SCENE_POST");
export const SCENE_DELETE = createRequestTypes("SCENE_DELETE");

export const SCHEDULES_GET = createRequestTypes("SCHEDULES_GET");
export const SCHEDULE_PUT = createRequestTypes("SCHEDULE_PUT");
export const SCHEDULE_DELETE = createRequestTypes("SCHEDULE_DELETE");
export const SCHEDULE_GET = createRequestTypes("SCHEDULE_GET");
export const SCHEDULE_CREATE = createRequestTypes("SCHEDULE_CREATE");

export const RESOURCES_GET = createRequestTypes("RESOURCES_GET");
export const RESOURCE_CREATE = createRequestTypes("RESOURCE_CREATE");
export const RESOURCE_PUT = createRequestTypes("RESOURCE_PUT");
export const RESOURCE_DELETE = createRequestTypes("RESOURCE_DELETE");

export const SENSORS_GET = createRequestTypes("SENSORS_GET");
export const SENSOR_CREATE = createRequestTypes("SENSOR_CREATE");
export const SENSOR_PUT = createRequestTypes("SENSOR_PUT");
export const SENSOR_DELETE = createRequestTypes("SENSOR_DELETE");

export const RULES_GET = createRequestTypes("RULES_GET");
export const RULE_CREATE = createRequestTypes("RULE_CREATE");
export const RULE_PUT = createRequestTypes("RULE_PUT");
export const RULE_DELETE = createRequestTypes("RULE_DELETE");

export const ROUTINE_CREATE = createRequestTypes("ROUTINE_CREATE");
export const ROUTINE_DELETE = createRequestTypes("ROUTINE_DELETE");