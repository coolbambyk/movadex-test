import React, { Fragment, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLiveData from 'hooks/common/useLiveData';
import useLiveTodos from 'hooks/todos/useLiveTodos';
import CategoryDataService from 'services/CategoryDataService';
import TodoListCard from '../components/todos/TodoListCard';
import TodoForm from '../components/todos/TodoForm';

const useLiveCategory = (categoryId) => {
  return useLiveData({
    getData: useCallback(() => CategoryDataService.findOne({ _id: categoryId }), [categoryId]),
    listen: CategoryDataService.listenChanges,
  });
};
export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = useLiveCategory(categoryId);
  const [activeStatus, setActiveStatus] = useState('open');
  const params = useParams();
  const todos = useLiveTodos({ status: activeStatus, categoryId: params.categoryId });
  return (
    <>
      <TodoForm />
      <TodoListCard
        title={category?.title || 'Unknown category'}
        {...{ todos, activeStatus, setActiveStatus, categoryId }}
      />
    </>
  );
}
