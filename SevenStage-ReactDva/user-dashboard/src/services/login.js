import request from '../utils/request';

let postData = {username: "tom002", password: "passw0rd"};
export default function query() {
  return request('http://10.9.31.171:8080/admin/api/login?password=passw0rd&username=tom001', {
    method: 'POST', mode: "cors",
    credentials: 'include', headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }});
}
