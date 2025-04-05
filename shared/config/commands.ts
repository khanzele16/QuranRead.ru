import channelCommand from "../../lib/commands/channelCommand";
import helpCommand from "../../lib/commands/helpCommand";
import mediaCommand from "../../lib/commands/mediaCommand";
import startCommand from "../../lib/commands/startCommand";
import useCommand from "../../lib/commands/useCommand";
import settingsCommand from "../../lib/commands/settingsCommand";

export const commands = [
  { command: "start", description: "Старт.", action: startCommand },
  { command: "channel", description: "Вступи в мой канал.", action: channelCommand },
  { command: "media", description: "Открыть меню.", action: mediaCommand },
  { command: "settings", description: "Настройки бота.", action: settingsCommand },
  { command: "use", description: "Как использовать бота?", action: useCommand },
  { command: "help", description: "Помощь.", action: helpCommand },
];