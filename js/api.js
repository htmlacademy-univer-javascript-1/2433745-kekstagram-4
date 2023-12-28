const URL = 'https://29.javascript.pages.academy/kekstagram';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const sendRequest = (onSuccess, onFail, route = '', method = Method.GET, body) =>{
  fetch (
    `${URL}${route}`,
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => onFail(err));
};

const loadData = (onSuccess, onFail, route = '/data') => sendRequest(onSuccess, onFail, route);
const uploadData = (onSuccess, onFail, body, route = '', method = Method.POST) => sendRequest(onSuccess, onFail, route, method, body);

export{loadData, uploadData};
