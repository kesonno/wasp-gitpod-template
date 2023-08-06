import HttpError from '@wasp/core/HttpError.js'

export const getCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const cart = await context.entities.Cart.findUnique({
    where: { userId: context.user.id },
    include: { words: true }
  });

  if (!cart) throw new HttpError(404, 'Cart not found');

  return cart;
}

export const getWords = async (args, context) => {
  const words = await context.entities.Word.findMany();

  return words;
}