fetch('http://localhost:4000/posts')
  .then(responce => responce.json())
  .then(console.log);
