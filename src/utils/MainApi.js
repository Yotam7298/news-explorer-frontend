class MainApi {
  constructor(options) {
    this._options = options;
  }

  _verifyResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  reportError(err) {
    if (err.constructor === Response) {
      err
        .json()
        .then((data) => console.log(`Error ${err.status} - ${data.message}`));
    } else {
      console.log(err);
    }
  }

  _logInfo(res) {
    console.log('Request was successful:');
    console.log(res);
  }

  _request(endPoint, method, body) {
    return fetch(`${this._options.baseUrl + endPoint}`, {
      method: method,
      headers: {
        ...this._options.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(body),
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }

  signUp({ email, password, username }) {
    return this._request('/signup', 'POST', {
      email,
      password,
      name: username,
    });
  }

  signIn({ email, password }) {
    return this._request('/signin', 'POST', { email, password });
  }

  getSelf() {
    return this._request('/users/me', 'GET');
  }

  getArticles() {
    return this._request('/articles', 'GET');
  }

  saveArticle(article) {
    return this._request('articles', 'POST', article);
  }

  removeArticle(articleId) {
    return this._request(`articles/${articleId}`, 'DELETE');
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.yotamfinal.students.nomoredomainssbs.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
