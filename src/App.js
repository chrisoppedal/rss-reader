import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const feeds = [
      { url: 'https://www.nationalreview.com/feed', title: 'National Review', isLoaded: false },
      { url: 'https://www.westernjournal.com/admin_page/rss-masterfeed-wj-merge-feed-all-content', title: 'Western Journal', isLoaded: false },
      { url: 'http://feeds.feedburner.com/dailycaller-us', title: 'Daily Caller', isLoaded: false },
      { url: 'https://nypost.com/feed/', title: 'NY Post', isLoaded: false },
      { url: 'http://feeds.foxnews.com/foxnews/national', title: 'Fox National', isLoaded: false },
      { url: 'https://www.washingtonexaminer.com/tag/news.rss', title: 'Washington Examiner', isLoaded: false },
      { url: 'https://thehill.com/rss/syndicator/19110', title: 'The Hill', isLoaded: false },
      { url: 'https://townhall.com/api/openaccess/news/', title: 'Townhall', isLoaded: false },
      { url: 'https://www.hotair.com/feed', title: 'Hot Air', isLoaded: false },
      { url: 'https://www.realclearpolitics.com/index.xml', title: 'Real Clear Politics', isLoaded: false }
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
        // todo sort by most recent
        // todo format pubDate
        setStories(stories);
      }
      catch (err) {
        console.log(err);
      };
    };
    loadFeeds();

  }, []);
  return (
    <Box sx={{ bgcolor: '#F3F6F9' }}>
      <Box sx={{ width: '100%', maxWidth: 360, marginRight: 'auto', marginLeft: 'auto' }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            {stories.map((story) => {
              return (
                <>
                  <Card sx={{ minWidth: 275, marginTop: '20px', marginBottom: '20px' }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                        {story.title}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {story.link}
                      </Typography>
                      <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                        {story.pubDate}
                      </Typography>
                    </CardContent>
                  </Card>
                </>);
            })}
          </List>
        </nav>
      </Box>
    </Box>
  );
}

export default App;
