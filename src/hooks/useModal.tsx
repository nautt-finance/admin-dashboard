"use client";

import { Portal } from "@radix-ui/react-portal";
import React, { useState, useCallback, ReactNode } from "react";

type ModalManagerType = {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
};

let modalManager: ModalManagerType;

export const useModal = () => {
  if (!modalManager) throw new Error("ModalProvider não está montado.");
  return modalManager;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback((modalContent: ReactNode) => {
    setModal(modalContent);
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setModal(null), 300);
  }, []);

  modalManager = { openModal, closeModal };

  return (
    <>
      {children}
      {modal && (
        <Portal>
          <div
            className={`fixed inset-0 bg-primary-900/60 dark:md:backdrop-blur-none dark:backdrop-blur-md z-50
              transition-opacity duration-300 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            onClick={closeModal}
          >
            <div
              className={`transition-transform duration-300 ease-in-out transform ${
                isVisible ? "scale-100" : "scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {modal}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
