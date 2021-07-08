import { useEffect, useState } from 'react';

export default function useLiveData({ listen, getData }) {
  const [data, setData] = useState(() => getData());
  useEffect(() => {
    setData(getData);
  }, [getData]);
  useEffect(() => {
    const clearListener = listen(() => setData(getData()));
    return clearListener;
  }, [getData, listen]);

  return data;
}
