import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 80,  // Встановлюємо порт 80 для локального сервера
    open: false,  // Не відкриває автоматично браузер при запуску
    host: true,  // Дозволяє доступ до сервера з іншого пристрою
  },
});
