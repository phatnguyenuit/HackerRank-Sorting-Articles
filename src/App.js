import React, { useState, useMemo } from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = 'Sorting Articles';

const comparators = {
  upvotes: (article1, article2) => {
    return article2.upvotes - article1.upvotes;
  },
  date: (article1, article2) => {
    return (
      new Date(article2.date).getTime() - new Date(article1.date).getTime()
    );
  },
};

const makeSorter = (comparator) => (list = []) => {
  const result = Array.from(list);
  result.sort(comparator);
  return result;
};

function App({ articles }) {
  const [sortKey, setSortKey] = useState('upvotes');
  const sorter = useMemo(() => {
    return makeSorter(comparators[sortKey]);
  }, [sortKey]);
  const sortedAticles = sorter(articles);
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row align-items-center justify-content-center my-20 navigation">
        <label className="form-hint mb-0 text-uppercase font-weight-light">
          Sort By
        </label>
        <button
          data-testid="most-upvoted-link"
          className="small"
          onClick={() => setSortKey('upvotes')}
        >
          Most Upvoted
        </button>
        <button
          data-testid="most-recent-link"
          className="small"
          onClick={() => setSortKey('date')}
        >
          Most Recent
        </button>
      </div>
      <Articles articles={sortedAticles} />
    </div>
  );
}

export default App;
