import { memo } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useMutateTask } from '../hooks/useMutateTask';
import { Task } from '../types/types';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { setEditedTask } from '../slices/appSlices';

export const TaskItem = memo(
  ({ id, title, description }: Task): JSX.Element => {
    const dispatch = useAppDispatch();
    const { deleteTaskMutation } = useMutateTask();
    return (
      <li>
        <span className="font-bold cursor-pointer">{title}</span>
        <div className="flex float-light ml-20">
          <PencilSquareIcon
            className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
            onClick={() => {
              dispatch(
                setEditedTask({
                  id: id,
                  title: title,
                  description: description,
                })
              );
            }}
          />
          <TrashIcon
            className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
            onClick={() => {
              deleteTaskMutation.mutate(id);
            }}
          />
        </div>
      </li>
    );
  }
);
