import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getCart from '@wasp/queries/getCart';
import addToCart from '@wasp/actions/addToCart';
import createEbook from '@wasp/actions/createEbook';

export function Cart() {
  const { data: cart, isLoading, error } = useQuery(getCart);
  const addToCartFn = useAction(addToCart);
  const createEbookFn = useAction(createEbook);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddToCart = (wordId) => {
    addToCartFn({ wordId });
  };

  const handleCreateEbook = () => {
    createEbookFn({ title, description });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Title'
          className='px-2 py-1 border rounded'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <textarea
          placeholder='Description'
          className='px-2 py-1 border rounded'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        {cart.words.map((word) => (
          <div
            key={word.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{word.description}</div>
            <div>
              <button
                onClick={() => handleAddToCart(word.id)}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={handleCreateEbook}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Get Ebook
        </button>
      </div>
    </div>
  );
}