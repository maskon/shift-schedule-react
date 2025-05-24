import React from "react";
import { FiSun, FiUsers, FiMoon, FiCoffee } from "react-icons/fi";
// import { MdOutlineWeekend } from "react-icons/md";

const iconMap = {
  FiSun: <FiSun />,
  FiUsers: <FiUsers />,
  FiMoon: <FiMoon />,
  FiCoffee: <FiCoffee />
};

export const getIcon = (iconName) => iconMap[iconName] || null;