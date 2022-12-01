import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useProcessAuth } from '../hooks/useProcessAuth';
import { useQueryTasks } from '../hooks/useQueryTasks';
import { useQueryUser } from '../hooks/useQueryUser';
import { selectTask } from '../slices/appSlices';

export const Todo = () => {
  const { logout } = useProcessAuth();

  const { data: dataUser } = useQueryUser();
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks();
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
      Todo
    </div>
  );
};
