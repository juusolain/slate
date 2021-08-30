import { Model } from "@nozbe/watermelondb";
import { text, relation, field } from "@nozbe/watermelondb/decorators";

export default class Event extends Model {
  static table = "events";
  static associations = {
    timelines: { type: "belongs_to", key: "track_id" },
  };

  @text("name") name;
  @field("color") color;
  @text("description") description;
  @field("duration") duration;
  @field("start_time") startTime;

  @relation("tracks", "track_id") track;
}
