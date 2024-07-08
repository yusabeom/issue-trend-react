const clientHostName = window.location.hostname;

let backEndHostName;

if (clientHostName === 'localhost') {
  backEndHostName = 'http://3.38.47.22';
} else if (clientHostName === 'issuetrend.site') {
  backEndHostName = 'http://3.38.47.22';
}

export const API_BASE_URL = backEndHostName;
export const USER = '/issue-trend';
