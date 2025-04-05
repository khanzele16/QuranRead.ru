import { Context } from "grammy";

export default async (
  ctx: Context,
  callback_name: string,
  callback_message: string
) => {
  if (ctx.hasCallbackQuery(callback_name)) {
    await ctx.answerCallbackQuery(callback_message);
    if (ctx.callbackQuery.message?.message_id) {
      await ctx.api.deleteMessage(
        ctx.callbackQuery.from.id,
        ctx.callbackQuery.message?.message_id
      );
    }
  }
};
