import HttpError from '@wasp/core/HttpError.js'

export const addToCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId, wordId } = args;

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });
  if (!user) { throw new HttpError(404) }

  const word = await context.entities.Word.findUnique({
    where: { id: wordId }
  });
  if (!word) { throw new HttpError(404) }

  const cart = await context.entities.Cart.findFirst({
    where: { userId: user.id }
  });

  return context.entities.Cart.update({
    where: { id: cart.id },
    data: { words: { connect: { id: word.id } } }
  });
}

export const createEbook = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: args.userId }
  });
  if (!user) { throw new HttpError(404) };

  const cart = await context.entities.Cart.findUnique({
    where: { userId: user.id }
  });
  if (!cart) { throw new HttpError(404) };

  const words = await context.entities.Word.findMany({
    where: { cartId: cart.id }
  });

  const ebookContent = generateEbook(words, cart);

  const ebookId = await uploadEbookToS3(ebookContent);

  return { ebookId };
}