import { FormEvent } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectTask } from '../slices/appSlices';
import { useMutateTask } from './useMutateTask';

interface useProcessTaskType {
  processTask: (e: FormEvent<HTMLFormElement>) => void;
}

export const useProcessTask = (): useProcessTaskType => {
  const editedTask = useAppSelector(selectTask);
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  const processTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.id === '') {
      createTaskMutation.mutate({
        title: editedTask.title,
        description: editedTask.description,
      });
    } else {
      updateTaskMutation.mutate(editedTask);
    }
  };
  return { processTask };
};
