import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getWords from '@wasp/queries/getWords';
import addToCart from '@wasp/actions/addToCart';

export function Words() {
  const { data: words, isLoading, error } = useQuery(getWords);
  const addToCartFn = useAction(addToCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddToCart = (wordId) => {
    addToCartFn({ wordId });
  };

  return (
    <div className='p-4'>
      {words.map((word) => (
        <div
          key={word.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{word.description}</div>
          <button
            onClick={() => handleAddToCart(word.id)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add to Cart
          </button>
        </div>
      ))}
      <Link to='/cart' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Go to Cart</Link>
    </div>
  );
}