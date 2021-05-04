import React from "react";

import styles from "./event.module.css"; // Import css modules stylesheet as styles

export default function TimelineEvent({ event: { name, color, description } }) {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className={styles.box}
    >
      <p className="text-white">{name}</p>
      <p>{description}</p>
    </div>
  );
}
