const BASE_URL = 'https://611560228f38520017a38499.mockapi.io/api/v1';

let page = 1;
const totalComments = 100;
const pageSize = 4;
const totalPages = totalComments / pageSize;

export function fetchComments() {
  return fetch(`${BASE_URL}/comments?${page}&limit=${pageSize}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error('Not found');
    })
    .then(comments => {
      page += 1;
      return {
        comments,
        hasNextPage: page < totalPages,
      };
    });
}

export default {
  fetchComments,
};
