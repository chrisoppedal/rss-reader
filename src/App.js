import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const feeds = [
      {url: 'https://www.nationalreview.com/feed', title: 'National Review', isLoaded: false},
      {url: 'https://www.westernjournal.com/admin_page/rss-masterfeed-wj-merge-feed-all-content', title: 'Western Journal', isLoaded: false
      },
      {url: 'http://feeds.feedburner.com/dailycaller-us', title: 'Daily Caller', isLoaded: false},
      {url: 'https://nypost.com/feed/', title: 'NY Post', isLoaded: false},
      {url: 'http://feeds.foxnews.com/foxnews/national', title: 'Fox National', isLoaded: false},
      {url: 'https://www.washingtonexaminer.com/tag/news.rss', title: 'Washington Examiner', isLoaded: false},
      {url: 'https://thehill.com/rss/syndicator/19110', title: 'The Hill', isLoaded: false},
      {url: 'https://townhall.com/api/openaccess/news/', title: 'Townhall', isLoaded: false},
      {url: 'https://www.hotair.com/feed', title: 'Hot Air', isLoaded: false},
      {url: 'https://www.realclearpolitics.com/index.xml', title: 'Real Clear Politics', isLoaded: false}
      ];

    const loadFeeds = async () => {
      try {
        const apiCalls = [];
        feeds.forEach((feed) => {
          apiCalls.push(fetch('https://rss2json.com/api.json?api_key=itkg2i7up3cwrfthubruisslrbtb3qj7qctzagr5&rss_url=' + feed.url).then((res) => res.json()));
        });
        let newsArr = await Promise.all(
          apiCalls
        );
        const stories = []
        newsArr.forEach((newsFeed) => {
          newsFeed.items?.forEach((feed) => {
            stories.push(feed);
          })
        })
        console.log('stories', stories);
      }
      catch(err) {
        console.log(err);
      };
    };
    loadFeeds();

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
