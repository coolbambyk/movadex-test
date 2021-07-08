import { useEffect, useRef, useState } from 'react';
import TodoDataService from 'services/TodoDataService';
import _ from 'lodash';

const fetchDataByStatus = ({ status, categoryId }) => {
  let todos = [];
  switch (status) {
    case 'close':
      todos = TodoDataService.getClose({ categoryId });
      break;
    case 'open':
      todos = TodoDataService.getOpen({ categoryId });
      break;
    case 'all':
      todos = TodoDataService.getAll({ categoryId });
      break;
    default:
      todos = TodoDataService.getOpen({ categoryId });
  }

  return _.orderBy(todos, '_createdAt', 'desc');
};
export default function useLiveTodos({ status, categoryId }) {
  const [data, setData] = useState(() => fetchDataByStatus({ status, categoryId }));
  const paramsRef = useRef({ status, categoryId });

  useEffect(() => {
    paramsRef.current = { status, categoryId };
    setData(fetchDataByStatus({ status, categoryId }));
  }, [status, categoryId]);

  useEffect(() => {
    const clearListener = TodoDataService.listenChanges(() => setData(fetchDataByStatus(paramsRef.current)));
    return clearListener;
  }, []);

  return data;
}
