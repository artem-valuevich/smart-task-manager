// src/mockData.js
const mockTasks = [
  {
    _id: '1',
    title: 'Изучить React',
    description: 'Пройти курс по React Hooks',
    status: 'in-progress',
    priority: 'high',
    tags: ['учеба', 'разработка'],
    dueDate: '2024-12-31'
  },
   {
    _id: '2',
    title: 'Сделать презентацию',
    description: 'Подготовить слайды к митингу по проекту',
    status: 'todo',
    priority: 'medium',
    tags: ['работа', 'документы'],
    dueDate: '2024-10-25'
  },
  {
    _id: '3',
    title: 'Купить продукты',
    description: 'Молоко, хлеб, яйца, фрукты',
    status: 'in-progress',
    priority: 'high',
    tags: ['быт', 'шопинг'],
    dueDate: '2024-10-15'
  },
  {
    _id: '4',
    title: 'Прочитать книгу',
    description: '«Чистый код» Роберта Мартина, главы 5-7',
    status: 'completed',
    priority: 'low',
    tags: ['учеба', 'чтение'],
    dueDate: '2024-09-30'
  },
  {
    _id: '5',
    title: 'Записаться к врачу',
    description: 'Профилактический осмотр у терапевта',
    status: 'todo',
    priority: 'medium',
    tags: ['здоровье'],
    dueDate: '2024-11-10'
  },
  {
    _id: '6',
    title: 'Написать тесты',
    description: 'Покрыть Jest-тестами модуль авторизации',
    status: 'in-progress',
    priority: 'high',
    tags: ['работа', 'разработка', 'тестирование'],
    dueDate: '2024-10-20'
  },
  {
    _id: '7',
    title: 'Поздравить друга',
    description: 'Позвонить и отправить подарок на день рождения',
    status: 'todo',
    priority: 'medium',
    tags: ['личное', 'друзья'],
    dueDate: '2024-10-18'
  },
  {
    _id: '8',
    title: 'Планирование отпуска',
    description: 'Выбрать отель и купить билеты',
    status: 'completed',
    priority: 'low',
    tags: ['отдых', 'планирование'],
    dueDate: '2025-12-24'
  }
];

export default mockTasks;