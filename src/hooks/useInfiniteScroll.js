import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../axiosClient';

const useInfiniteScroll = (pathToGet, axiosParams, onPageFetch, resetDeps, shouldFetchMore = null) => {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const fetchMoreItems = useCallback(
    (pageNumberToFetch, lastItemSlice = null) => {
      axiosClient.get(pathToGet, {
        params: {
          pageNumber: pageNumberToFetch,
          ...axiosParams
        },
      }).then(response => {
        const page = response.data;
        onPageFetch(page);
        const pageItems = page.data;
        const pageItemsWithUuids = pageItems.map(it => ({ ...it, uuid: uuidv4() }));
        setItems(value => [...value, ...pageItemsWithUuids]);
        setNextPageNumber(value => value + 1);
        const hasMorePages = parseInt(page.pageNumber) < parseInt(page.pagesCount);
        setHasMoreItems(hasMorePages);
        if (hasMorePages && (shouldFetchMore && shouldFetchMore(lastItemSlice, pageItems))) {
          fetchMoreItems(pageNumberToFetch + 1, pageItems);
        }
      }).catch(ex => {
        // if (ex.isAxiosError) {
        //
        // }
        setError(ex);
        console.log(ex);
      });
    },
    [...resetDeps]
  );

  useEffect(() => {
    setItems([]);
    setHasMoreItems(true);
    setNextPageNumber(1);
  }, resetDeps);

  useEffect(() => {
    if (nextPageNumber === 1) {
      fetchMoreItems(nextPageNumber, []);
    }
  }, [nextPageNumber, fetchMoreItems]);

  return { items, hasMoreItems, nextPageNumber, fetchMoreItems, error }
};

export default useInfiniteScroll;
