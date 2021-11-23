// import { fetchComments } from './services/api'; тоже самое
// import HTTPService from './services/api';
// import { LoadMoreBtn } from './services/loadMoreBtn';

const commentList = document.querySelector('.comments');
const loadMoreBtn = document.querySelector('.load-more');
// let page = 1;
// const totalComments = 100;
// const pageSize = 4;
// const totalPages = totalComments / pageSize;

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  className: 'is-hidden',
  // isHidden: true,
  onClick() {
    loadComments();
  },
});

loadComments().then(() => {
  loadMoreBtn.show();
});
// loadMoreBtn.hide();

// setTimeout(() => {
//   loadMoreBtn.show();
// }, 1000);

// loadMoreBtn.classList.add('is-hidden');
// loadComments().then(() => {
//   loadMoreBtn.classList.remove('is-hidden');
// });

// loadMoreBtn.addEventListener('click', () => {
//   loadComments().then(() => {
//     // if (page > totalPages) {
//     //   loadMoreBtn.classList.add('is-hidden');
//     // }
//   });
// });

function loadComments() {
  return HTTPService.fetchComments().then(data => {
    renderComments(data.comments);
    if (!data.hasNextPage) {
      loadMoreBtn.hide();
    }
    // page += 1;
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

  commentList.insertAdjacentHTML = ('beforeend', markup);
}
