import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../axiosClient';

/**
 *
 * @param pathToGet the path to GET e.g `/serach-terms`
 * @param axiosParams object of additional params to pass to axios
 * @param onPageFetch callback called with response.data as its argument after
 *                    each successful axios request, can be used for example to save data
 *                    to Redux
 * @param resetDeps when any of these dependencies change, the component should be
 *                  cleared and reset
 * @param shouldFetchMore optional callback that returns whether there is a need to
 *                        fetch another page straight away after fetching a previous one
 * @returns object with a lot of stuff
 */
const useInfiniteScroll = (pathToGet, axiosParams, onPageFetch, resetDeps, shouldFetchMore = null) => {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [isFetchRequested, setIsFetchRequested] = useState(false);
  const [shouldSudoFetchAll, setShouldSudoFetchAll] = useState(false);
  const [error, setError] = useState(null);
  const lastElementRef = useRef();

  // source: https://stackoverflow.com/a/7557433/4541480
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const fetchMoreItems = useCallback(
    () => {
      setNextPageNumber(nextPageNumber + 1);
      axiosClient.get(pathToGet, {
        params: {
          pageNumber: nextPageNumber,
          ...axiosParams,
          // this won't work because we use pages and not offsets
          // so changing the pageSize when we already fetched a different one
          // would break everything
          // pageSize: shouldSudoFetchAll ? 300 : axiosParams.pageSize
        },
      }).then(response => {
        const page = response.data;
        onPageFetch(page);
        const pageItems = page.data;
        const pageItemsWithUuids = pageItems.map(it => ({ ...it, uuid: uuidv4() }));
        setItems(value => [...value, ...pageItemsWithUuids]);
        const hasMorePages = parseInt(page.pageNumber) < parseInt(page.pagesCount);
        setHasMoreItems(hasMorePages);
        const shouldFetchMoreSucceeded = shouldFetchMore && shouldFetchMore(pageItems);
        const isLibraryBroken = lastElementRef.current && isElementInViewport(lastElementRef.current) && !shouldFetchMoreSucceeded;

        if (hasMorePages && (shouldFetchMoreSucceeded || isLibraryBroken || shouldSudoFetchAll)) {
          if (isLibraryBroken) {
            console.log(`Applying fix to broken endless scroll library (page ${page.pageNumber}) on route ${window.location.pathname}`);
            setShouldSudoFetchAll(true);
          }
          setIsFetchRequested(true);
        }
      }).catch(ex => {
        // if (ex.isAxiosError) {
        //
        // }
        setError(ex);
        console.log(ex);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathToGet, axiosParams, onPageFetch, isFetchRequested, shouldSudoFetchAll, nextPageNumber, ...resetDeps]
  );

  useEffect(() => {
    if (isFetchRequested) {
      fetchMoreItems();
      setIsFetchRequested(false);
    }
  }, [isFetchRequested]);

  // if any of resetDeps resets then reset everything to default values and start from scratch
  useEffect(() => {
    setItems([]);
    setHasMoreItems(true);
    setNextPageNumber(1);
    setIsFetchRequested(true);
    setShouldSudoFetchAll(false);
  }, [...resetDeps]); // eslint-disable-line react-hooks/exhaustive-deps

  return { items, hasMoreItems, nextPageNumber, fetchMoreItems, lastElementRef, error }
};

export default useInfiniteScroll;
