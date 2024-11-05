'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createTodo } from '@/graphql/mutations';
import { client } from '@/components/ConfigureAmplifyClientSide';

export default function TodoNew() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    client
      .graphql({
        query: createTodo,
        variables: { input: { name, description } },
      })
      .then((result) => {
        console.log('result', result);

        router.refresh();

        setName('');
        setDescription('');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.currentTarget;

    if (name === 'name') {
      setName(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" onChange={handleChange} value={name} />
        </label>

        <label>
          Description:
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />
        </label>

        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
}