import { Model } from "@nozbe/watermelondb";
import { text, relation, field } from "@nozbe/watermelondb/decorators";

export default class Event extends Model {
  static table = "events";
  static associations = {
    timelines: { type: "belongs_to", key: "track_id" },
  };

  @text("name") name; // eslint-disable-line
  @field("color") color; // eslint-disable-line
  @text("description") description; // eslint-disable-line
  @field("duration") duration; // eslint-disable-line
  @field("start_time") startTime; // eslint-disable-line

  @relation("tracks", "track_id") track; // eslint-disable-line
}
