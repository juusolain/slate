import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useRxCollection } from "rxdb-hooks";

import Timeline from "./components/timeline/timeline";
import Modal from "./components/util/modal";

function Project() {
  const [currentTimeline, setCurrentTimeline] = useState();

  const [modalType, setModalType] = useState(null);

  //const timelines = useRxCollection("timelines");

  /*const createNewTimeline = () => {
    const t = {
      id: uuidv4(),
      name: "Hi",
    };
    timelines.upsert(t);
    setCurrentTimeline(t.id);
  };*/

  const openModal = (newModal) => {
    setModalType(newModal);
  };

  const closeModal = () => {
    setModalType(null);
  };
  function ModalContent() {
    switch (modalType) {
      case "timeline":
        return <p>Timeline modal</p>;
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
      <div className="bg-green-300 sticky flex p-1 items-start items-center m-2 rounded">
        <button
          className="bg-green-700 text-gray-200 rounded p-1 px-2 mx-1"
          onClick={() => openModal("timeline")}
        >
          Timeline
        </button>
        <button
          className="bg-green-700 text-gray-200 rounded p-1 px-2 mx-1"
          onClick={() => openModal("track")}
        >
          Track
        </button>
      </div>
      <div>{currentTimeline && <Timeline id={currentTimeline}></Timeline>}</div>
    </div>
  );
}

export default Project;
