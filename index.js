// user must be abele to search for a GitHub username
// must return the searched user's GitHub repo's (display repo name and link)
// only show results from current search

function handleUserSearch() {
  $('#dataEntry').on('submit', e => {
    e.preventDefault();
    let userName = $('.inputField').val();
    apiCall(userName);
  });
}

function apiCall(userName) {
  fetch(`https://api.github.com/users/${userName}/repos`)
    .then(response => response.json())
    .then(responseJson => formatResponse(responseJson))
    .catch(error => alert('API Failure'));
}

function formatResponse(data) {
  $('.results').empty();
  data.forEach(i => {
    let { name, html_url, created_at, description } = i;
    let date_created = new Date(created_at);
    $('.results').append(renderResponse(name, html_url, date_created, description));
  });
}

function renderResponse(name, html_url, date_created, description) {
  if (description === null) {
    let template = `
      <h2><i class="fas fa-caret-right"></i><a href="${html_url}">${name}</a></h2>
      <ul>
        <li>No Description for this repo</li>
        <li>
          Date Created: ${date_created.getMonth() + 1}/${date_created.getDate()}/${date_created.getFullYear()}
        </li>
      </ul>
  `;
    return template;
  }
  else {
    let template = `
      <h2><i class="fas fa-caret-right"></i><a href="${html_url}">${name}</a></h2>
      <ul>
        <li>Description: ${description}</li>
        <li>
          Date Created: ${date_created.getMonth() + 1}/${date_created.getDate()}/${date_created.getFullYear()}
        </li>
      </ul>
  `;
    return template;
  }
}

handleUserSearch();
