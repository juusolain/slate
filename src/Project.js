import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Timeline from "./editor/timeline/timeline";
import Modal from "./components/util/modal";

import { Button } from "./components/util/button";
import { dbContext } from "./database";

function Project() {
  const [currentTimeline, setCurrentTimeline] = useState();

  const [modalType, setModalType] = useState(null);

  const [timelines, setTimelines] = useState([]);

  const db = useContext(dbContext);

  useEffect(() => {
    db.collections.timelines.find().$.subscribe((docs) => {
      setTimelines(timelines);
    });
  });

  const createNewTimeline = () => {
    const t = {
      id: uuidv4(),
      name: "Hi",
    };
    db.collections.timelines.upsert(t);
    setCurrentTimeline(t.id);
  };

  const openModal = (newModal) => {
    setModalType(newModal);
  };

  const closeModal = () => {
    setModalType(null);
  };

  function TimelineItem({ name, ...props }) {
    <div>
      <p>{name}</p>;
    </div>;
  }

  function ModalContent() {
    switch (modalType) {
      case "timeline":
        return (
          <div>
            <p className="text-xl">Timelines</p>
            <div>
              <input
                type="text"
                className="rounded p-1 px-2 m-2 mx-1 focus:outline-none"
              ></input>
              <Button color="bg-green-200" hoverColor="bg-green-300">
                New
              </Button>
            </div>
            <div>{}</div>
          </div>
        );
      case "track":
        return <p>Track modal</p>;
      default:
        return null;
    }
  }

  return (
    <div className="w-screen">
      {modalType && (
        <Modal onClickOut={closeModal}>
          <ModalContent />
        </Modal>
      )}
      <div className="bg-blue-300 sticky flex p-1 items-start items-center m-2 rounded">
        <Button
          color="bg-blue-600"
          hoverColor="bg-blue-700"
          onClick={() => openModal("timeline")}
        >
          Timeline
        </Button>
        <Button
          color="bg-blue-600"
          hoverColor="bg-blue-700"
          onClick={() => openModal("track")}
        >
          Track
        </Button>
      </div>
      <div>{currentTimeline && <Timeline id={currentTimeline}></Timeline>}</div>
    </div>
  );
}

export default Project;
