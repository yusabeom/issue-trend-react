const clientHostName = window.location.hostname;

let backEndHostName;

if (clientHostName === 'localhost') {
  backEndHostName = 'http://localhost:8181';
} else if (clientHostName === 'issuetrend.site') {
  backEndHostName = 'http://15.165.89.176';
}

export const API_BASE_URL = backEndHostName;
export const USER = '/issue-trend';
export const ONLY_IP = '15.165.89.176';
