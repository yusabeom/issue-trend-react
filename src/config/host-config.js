const clientHostName = window.location.hostname;

let backEndHostName;

if (clientHostName === 'localhost') {
  backEndHostName = 'http://localhost:8181';
} else if (clientHostName === 'issuetrend.site') {
  backEndHostName = 'https://3.38.47.22';
}

export const API_BASE_URL = backEndHostName;
export const USER = '/issue-trend';
