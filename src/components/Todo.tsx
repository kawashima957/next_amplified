'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Todo } from '@/API';
import { client } from '@/components/ConfigureAmplifyClientSide';
import { updateTodo, deleteTodo } from '@/graphql/mutations';

export default function Todo({ item }: { item: Todo }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    client
      .graphql({
        query: updateTodo,
        variables: { input: { id: item.id, name, description } },
      })
      .then((result) => {
        router.refresh();

        setIsEditing(false);
        setName('');
        setDescription('');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    if (confirm('Are you sure?')) {
      client
        .graphql({
          query: deleteTodo,
          variables: { input: { id: item.id } },
        })
        .then((result) => {
          console.log('result', result);

          router.refresh();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
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
    <li>
      {isEditing ? (
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
              value={description ?? ''}
            />
          </label>
          CreatedAt:
          {item.createdAt} UpdatedAt: {item.updatedAt}
          <button type="submit">Update Todo</button>
        </form>
      ) : (
        <div>
          Name: {item.name} Description: {item.description} CreatedAt:
          {item.createdAt} UpdatedAt: {item.updatedAt}
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
          <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
}