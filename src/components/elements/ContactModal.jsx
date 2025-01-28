import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { ContactFormModal } from "./ContactFormModal";

export function ContactModal({ isOpen, onClose }) {
  const [sourcePage, setSourcePage] = useState("");

  // console.log(sourcePage);

  useEffect(() => {
    if (isOpen) {
      setSourcePage(window.location.pathname);
    }
  }, [isOpen]);

  function handleClose() {
    onClose();
  }

  return (
    <Modal
      show={isOpen}
      size="md"
      style={{ zIndex: 1050 }}
      onClose={handleClose}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <ContactFormModal sourcePage={sourcePage} />
      </Modal.Body>
    </Modal>
  );
}
