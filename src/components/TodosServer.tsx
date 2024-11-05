import { cookieBasedClient } from '@/utils/amplifyServerUtils';
import { listTodos } from '@/graphql/queries';
import TodoNew from '@/components/TodoNew';
import Todo from '@/components/Todo';

export default async function TodosServer() {
  const { data, errors } = await cookieBasedClient.graphql({
    query: listTodos,
  });

  if (errors) {
    console.log('errors', errors);
  }

  return (
    <div>
      <TodoNew />

      {data.listTodos.items.length === 0 ? (
        <p>You have no todos. Add one above.</p>
      ) : (
        <ul>
          {data.listTodos.items.map((item) => (
            <Todo key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}