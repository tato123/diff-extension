import createHistory from 'history/createMemoryHistory';

const history = createHistory({
  initialEntries: ['/annotations'], // The initial URLs in the history stack
  initialIndex: 0
});

export default history;
