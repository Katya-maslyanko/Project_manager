import React, { useEffect, useState } from "react";
import TaskCard from "@/components/Task/TaskCard"; // Импортируем компонент TaskCard
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api"; // Импортируем хуки для получения задач и обновления статуса
import { useParams } from "next/navigation";
import { Task } from "@/state/api";
import { LoaderCircle, CircleCheck, BookCheck } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext"; // Импортируем контекст сайдбара

const TaskList: React.FC = () => {
  const { id } = useParams(); // Получаем ID проекта из параметров
  const { data: tasks = [], error, isLoading } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation(); // Хук для обновления статуса задачи
  const { isExpanded, isHovered, isMobileOpen } = useSidebar(); // Получаем состояние сайдбара

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    if (draggedTask) {
      await updateTaskStatus({ id: draggedTask.id, status }); // Обновляем статус задачи
      setDraggedTask(null); // Сбрасываем перетаскиваемую задачу
    }
  };

  if (isLoading) {
    return <p>Загрузка задач...</p>;
  }

  if (error) {
    console.error("Ошибка при загрузке задач:", error);
    return <p>Ошибка при загрузке задач: {JSON.stringify(error)}</p>;
  }

  // Устанавливаем ширину таблицы в зависимости от состояния сайдбара
  const tableWidth = isExpanded || isHovered || isMobileOpen ? "min-w-full" : "min-w-[450px]";

  return (
    <div style={{ borderLeft: 'none' }} className="border border-gray-200 rounded-md p-4">
      {/* <!-- К исполнению --> */}
      <div
        className="p-4 mb-6"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'Новая')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="flex items-center px-2 py-1 text-sm border font-semibold border-yellow-200 bg-yellow-100 rounded-lg text-yellow-700 duration-200 transition-colors">
              <CircleCheck className="h-4 w-4 mr-2" />
              К исполнению
            </span>
            <span className="text-sm bg-gray-200 border text-gray-600 ml-2 px-2 py-1 rounded">
              {tasks.filter(task => task.status === 'Новая').length}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className={`${tableWidth} text-left`}>
            <thead>
              <tr className="text-gray-600 text-sm bg-gray-100 border rounded-md">
                <th className="py-3 px-4">Задача</th>
                <th className="py-3 px-4">Описание</th>
                <th className="py-3 px-4">Исполнители</th>
                <th className="py-3 px-4">Срок выполнения</th>
                <th className="py-3 px-4">Приоритет</th>
                <th className="py-3 px-4">Прогресс</th>
                <th className="py-3 px-4">Теги</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {tasks.filter(task => task.status === 'Новая').map(task => (
                <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <!-- В процессе --> */}
      <div
        className="p-4 mb-6"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'В процессе')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="flex items-center px-2 py-1 text-sm border font-semibold border-purple-200 bg-purple-100 rounded-lg text-purple-700 duration-200 transition-colors">
              <LoaderCircle className="h-4 w-4 mr-2" />
              В процессе
            </span>
            <span className="text-sm bg-gray-200 border text-gray-600 ml-2 px-2 py-1 rounded">
              {tasks.filter(task => task.status === 'В процессе').length}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className={`${tableWidth} text-left`}>
            <thead>
              <tr className="text-gray-600 text-sm bg-gray-100 border">
                <th className="py-3 px-4">Задача</th>
                <th className="py-3 px-4">Описание</th>
                <th className="py-3 px-4">Исполнители</th>
                <th className="py-3 px-4">Срок выполнения</th>
                <th className="py-3 px-4">Приоритет</th>
                <th className="py-3 px-4">Прогресс</th>
                <th className="py-3 px-4">Теги</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {tasks.filter(task => task.status === 'В процессе').map(task => (
                <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <!-- Завершено --> */}
      <div
        className="p-4 mb-6"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 'Завершено')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="flex items-center px-2 py-1 text-sm border font-semibold border-green-200 bg-green-100 rounded-lg text-green-700 duration-200 transition-colors">
              <BookCheck className="h-4 w-4 mr-2" />
              Завершено
            </span>
            <span className="text-sm bg-gray-200 border text-gray-600 ml-2 px-2 py-1 rounded">
              {tasks.filter(task => task.status === 'Завершено').length}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className={`${tableWidth} text-left`}>
            <thead>
              <tr className="text-gray-600 text-sm bg-gray-100 border">
                <th className="py-3 px-4">Задача</th>
                <th className="py-3 px-4">Описание</th>
                <th className="py-3 px-4">Исполнители</th>
                <th className="py-3 px-4">Срок выполнения</th>
                <th className="py-3 px-4">Приоритет</th>
                <th className="py-3 px-4">Прогресс</th>
                <th className="py-3 px-4">Теги</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {tasks.filter(task => task.status === 'Завершено').map(task => (
                <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;