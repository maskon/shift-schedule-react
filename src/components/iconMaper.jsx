import React from "react";
import { FiSun, FiUsers, FiMoon } from "react-icons/fi";

const iconMap = {
  FiSun: <FiSun />,
  FiUsers: <FiUsers />,
  FiMoon: <FiMoon />,
};

export const getIcon = (iconName) => iconMap[iconName] || null;