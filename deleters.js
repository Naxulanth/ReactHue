import { deleteResource } from 'api/resources'
import { deleteSensor } from "api/sensors";
import { deleteRule } from "api/rules";
import { deleteSchedule } from "api/schedules";

if (this.props.resources) {
    Object.keys(this.props.resources).forEach(key => {
      deleteResource(key)
    })
  }

  for (let i = 0; i < 99; ++i) {
    deleteSensor(i);
    deleteSchedule(i);
    deleteRule(i);
  }