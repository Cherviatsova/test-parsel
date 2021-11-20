const commentList = document.querySelector('.comments');
const loadMoreBtn = document.querySelector('.load-more');

fetchComments().then(comments => renderComments(comments));

loadMoreBtn.addEventListener('click', () =>
  fetchComments().then(comments => renderComments(comments))
);

function fetchComments() {
  const url =
    'https://611560228f38520017a38499.mockapi.io/api/v1/comments?page=1&limit=3';

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw Error('Not found');
  });
}

function renderComments(comments) {
  const markup = comments
    .map(
      ({ author, createdAt, content }) => `
    <article class="comment">
      <header>
        Posted by <b>${author}</b> on
        <time datetime="${createdAt}">${createdAt}</time>
      </header>
      <p>${content}</p>
    </article>`
    )
    .join('');

  commentList.innerHTML = markup;
}
