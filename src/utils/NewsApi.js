const apiKey = '80d211590dc64d6888f87999ec5ed6d1';
const pageSize = 100;
const fromDate = () => {
  const dateObj = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
};

export default function searchArticles(query) {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${query}&from=${fromDate()}&pageSize=${pageSize}&apiKey=${apiKey}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((res) => {
      console.log(res);
      return res.articles;
    });
}
