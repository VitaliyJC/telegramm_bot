export const showMenu = (bot, chatId) => {
  bot.telegram.sendMessage(chatId, "Выберите действие", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Узнать погоду",
            request_location: true,
          },
        ],
        ["Получить котика)"],
        ["Закрыть меню"],
      ],
    },
  });
};

export const closeMenu = (bot, chatId) => {
  bot.telegram.sendMessage(
    chatId,
    "Меню закрыто, для открытия снова напишите меню",
    {
      reply_markup: {
        remove_keyboard: true,
      },
    }
  );
};
