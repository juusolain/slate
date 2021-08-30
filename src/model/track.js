import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";
import children from "@nozbe/watermelondb/decorators/children";
import relation from "@nozbe/watermelondb/decorators/relation";

export default class Track extends Model {
  static table = "timelines";
  static associations = {
    events: { type: "has_many", foreignKey: "track_id" },
    timelines: { type: "belongs_to", key: "timeline_id" },
  };

  @text("name") name;
  @children("events") events;
  @relation("timelines", "timeline_id") timelines;
}
