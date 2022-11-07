import React from 'react';
import articles from '../../temp/articleData';

export default function NewsCardList(props) {
  const [fixedArticles, setFixedArticles] = React.useState([]);

  function rearrangeDate(date) {
    const year = date.slice(0, 4);
    const day = Number(date.slice(8, 10));
    const monthNumber = Number(date.slice(5, 7));

    const dateClass = new Date();

    dateClass.setMonth(monthNumber - 1);

    const monthName = dateClass.toLocaleString('en-US', { month: 'long' });

    return `${monthName} ${day}, ${year}`;
  }

  rearrangeDate('2022-11-06');

  React.useEffect(() => {
    if (props.searchResults) {
      const newArticles = props.searchResults.map((article) => {
        let newArticle = {};

        newArticle.image = article.urlToImage;
        newArticle.link = article.url;
        newArticle.date = rearrangeDate(article.publishedAt);
        newArticle.title = article.title;
        newArticle.text = article.content;
        newArticle.source = article.source.name;

        return newArticle;
      });
      setFixedArticles(newArticles);
    }
  }, [props.searchResults]);

  return (
    <ul className='cards-list'>
      {fixedArticles &&
        fixedArticles.map((article, index) => {
          return (
            <li key={index} className='cards-list__card'>
              {React.cloneElement(props.children, {
                key: index,
                article,
              })}
            </li>
          );
        })}
    </ul>
  );
}
