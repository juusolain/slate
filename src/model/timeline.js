import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";
import children from "@nozbe/watermelondb/decorators/children";
import { writer } from "@nozbe/watermelondb/decorators";

export default class Timeline extends Model {
  static table = "timelines";
  static associations = {
    tracks: { type: "has_many", foreignKey: "timeline_id" },
  };

  @text("name") name; // eslint-disable-line
  @children("tracks") tracks; // eslint-disable-line

  @writer async addTrack(name) { // eslint-disable-line
    const newTrack = await this.collections.get("tracks").create((track) => {
      track.timeline.set(this);
      track.name = name;
    });
    return newTrack;
  }
}
