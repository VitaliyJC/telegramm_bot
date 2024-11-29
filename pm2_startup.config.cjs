// pm2_startup.config.js
module.exports = {
  apps: [
    {
      name: "chowbaka", // Имя процесса
      script: "./index.js", // Основной файл бота
      instances: 1, // Количество инстансов
      exec_mode: "fork", // Используй "cluster" для распределения нагрузки
      watch: false, // Отключить наблюдение за файлами
      autorestart: true, // Автоматический перезапуск при сбоях
      max_memory_restart: "200M", // Перезапуск при достижении лимита памяти
      log_date_format: "YYYY-MM-DD HH:mm:ss", // Формат даты в логах
      error_file: "./logs/err.log", // Путь к файлу для логов ошибок
      out_file: "./logs/out.log", // Путь к файлу для обычных логов
      merge_logs: true, // Объединить логи всех инстансов в один файл
    },
  ],
};
