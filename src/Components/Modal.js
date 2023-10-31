import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";

import styles from "./Modal.module.css";
import { addItem, clearCart } from "../Store/Slices/cartSlice";

const Modal = function ({ setShowModal, details }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const handleCancel = function () {
    setShowModal(false);
  };
  const handleConfirm = function () {
    setShowModal(false);
    dispatch(clearCart());
    dispatch(addItem(details));
  };
  useEffect(() => {
    const handler = function (e) {
      if (!modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div className={styles.modal} ref={modalRef}>
      <h5>Items already in cart</h5>
      <p>
        Your cart contains items from other restaurant. Would you like to reset
        your cart for adding items from this restaurant?
      </p>
      <div className={styles.action}>
        <button className={styles.cancel} onClick={handleCancel}>
          NO
        </button>
        <button className={styles.confirm} onClick={handleConfirm}>
          YES, START FRESH
        </button>
      </div>
    </div>
  );
};

export default Modal;
