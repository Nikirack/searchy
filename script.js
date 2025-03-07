let bangs = {};

fetch('bangs.json')
  .then(response => response.json())
  .then(data => {
    bangs = data;
    handleQueryString();
  })
  .catch(error => {
    console.error('Error loading bangs.json:', error);
  });

function handleQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');

  if (q) {
    for (const [bang, url] of Object.entries(bangs)) {
      if (q.endsWith(bang)) {
        const query = q.substring(0, q.length - bang.length).trim();
        window.location.href = `${url}${encodeURIComponent(query)}`;
        return;
      }
    }

    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
  }
}