import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useProcessAuth } from '../hooks/useProcessAuth';
import { useProcessTask } from '../hooks/useProcessTask';
import { useQueryTasks } from '../hooks/useQueryTasks';
import { useQueryUser } from '../hooks/useQueryUser';
import { selectTask, setEditedTask } from '../slices/appSlices';
import { TaskItem } from './TaskItem';

export const Todo = () => {
  const { logout } = useProcessAuth();

  const { data: dataUser } = useQueryUser();
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks();
  const { processTask } = useProcessTask();
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectTask);

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex item-center">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-green-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">CRUD Tasks</span>
      </div>
      <p className="my-3 text-sm">{dataUser?.email}</p>
      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-7 w-7 mt-1 mb-5 text-blue-500 cursor-pointer"
      />
      <form onSubmit={processTask}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="title ?"
          type="title"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          value={editedTask.title}
        />
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="description ?"
          type="description"
          onChange={(e) =>
            dispatch(
              setEditedTask({ ...editedTask, description: e.target.value })
            )
          }
          value={editedTask.description}
        />
        <button
          className="disable:opacity-40 px-2 py-4 rounded text-white bg-indigo-600"
          disabled={!editedTask.title || !editedTask.description}
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoadingTasks ? (
        <p>Loading ...</p>
      ) : (
        <ul className="my-5">
          {dataTasks?.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
