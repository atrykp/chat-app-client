import { motion } from "framer-motion";
import React from "react";
import { topSlide } from "../utils/consts";
import "./InfoBar.scss";

interface InfoBar {
  text: string;
  warning?: boolean;
  isOpen: boolean;
}

const InfoBar = ({ text, warning, isOpen }: InfoBar) => {
  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={topSlide}
      className={`${warning ? "info-bar-wrapper-warning" : "info-bar-wrapper"}`}
    >
      <p className="info-bar-content">{text}</p>
    </motion.div>
  );
};

export default InfoBar;
