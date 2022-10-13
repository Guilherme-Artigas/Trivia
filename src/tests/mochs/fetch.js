import { tokenResponse, invalidTokenResponse } from "./token";
import { questionsResponse, invalidTokenQuestionsResponse } from "./questions";

const mockFetchWithToken = ( {simulateExpiredToken} = {simulateExpiredToken: false}) => {
  return (url) => {
    const urls = {
      "https://opentdb.com/api_token.php?command=request": () => {
        return tokenResponse;
      },
      [`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`]: () => questionsResponse,
    };
  
    return Promise.resolve({
      status: 200,
      ok: Object.keys(urls).includes(url),
      json: () => {
        return Promise.resolve(urls[url]())
      },
    });
  }
}

const mockFetchWithToken2 = ( {simulateExpiredToken} = {simulateExpiredToken: true}) => {
  return (url) => {
    const urls = {
      "https://opentdb.com/api_token.php?command=request": () => {
        return invalidTokenResponse;
      },
      "https://opentdb.com/api.php?amount=5&token=INVALID_TOKEN": () => invalidTokenQuestionsResponse,
    };
  
    return Promise.resolve({
      status: 404,
      ok: Object.keys(urls).includes(url),
      json: () => {
        return Promise.resolve(urls[url]())
      },
    });
  }
}

const fetch = mockFetchWithToken();

const fetchInvalido = mockFetchWithToken2()

export { fetch, fetchInvalido };
