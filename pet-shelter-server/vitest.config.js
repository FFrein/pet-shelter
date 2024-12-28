import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "html"], // Формат отчёта о покрытии
      all: true, // Показывать покрытие для всех файлов
      include: ["src/**/*.js"], // Включить тестируемые файлы
      exclude: ["node_modules", "src/tests/**"], // Исключить тестовые файлы и зависимости
    },
  },
});
