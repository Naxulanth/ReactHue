import { createRequestTypes } from '../actions';

export const LIGHTS_GET = createRequestTypes('LIGHTS_GET');
export const LIGHTS_PUT = createRequestTypes('LIGHTS_PUT');

export const ROOMS_GET = createRequestTypes('ROOMS_GET');
export const ROOMS_PUT = createRequestTypes('ROOMS_PUT');

export const SCENES_GET = createRequestTypes('SCENES_GET');
export const SCENE_GET = createRequestTypes('SCENE_GET');
export const SCENES_PUT = createRequestTypes('SCENES_PUT');