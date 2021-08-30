import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";
import children from "@nozbe/watermelondb/decorators/children";

export default class Timeline extends Model {
  static table = "timelines";
  static associations = {
    tracks: { type: "has_many", foreignKey: "timeline_id" },
  };

  @text("name") name;
  @children("tracks") tracks;
}
