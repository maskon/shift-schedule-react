import { useEffect, useState } from "react"

export const useTheme = () => {
  // Инициализируем состояние с темой, считанной из localStorage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light"; // Если нет сохраненной темы, ставим светлую по умолчанию
  });

  useEffect(() => {
    // Применяем тему сразу после первого рендера
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Сохраняем тему в localStorage при ее изменении
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Переключение темы
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};