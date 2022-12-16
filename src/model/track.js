import { Model } from "@nozbe/watermelondb";
import { text, writer } from "@nozbe/watermelondb/decorators";
import children from "@nozbe/watermelondb/decorators/children";
import relation from "@nozbe/watermelondb/decorators/relation";

export default class Track extends Model {
  static table = "tracks";
  static associations = {
    events: { type: "has_many", foreignKey: "track_id" },
    timelines: { type: "belongs_to", key: "timeline_id" },
  };

  @text("name") name; // eslint-disable-line
  @children("events") events; // eslint-disable-line
  @relation("timelines", "timeline_id") timeline; // eslint-disable-line

  @writer async addEvent(name) {
    // eslint-disable-line
    const newEvent = await this.collections.get("events").create((event) => {
      event.track.set(this);
      event.name = name;
      event.startTime = 0;
      event.duration = 1000;
    });
    return newEvent;
  }
}
