"use client"

import React, { useState } from "react";
import Modal from "../components/create-modal"; // Mettez à jour le chemin si nécessaire
import { Button } from "@/src/@/components/ui/button";

const CreatePrunoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={openModal}>Create Pruno</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={function (): void {
        throw new Error("Function not implemented.");
      } }>
      </Modal>
    </>
  );
};

export default CreatePrunoModal;
