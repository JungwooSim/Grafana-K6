import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 }, // 20명 vuser가 10초 동안 지속적으로 호출 (Ramp-up)
    { duration: '10s', target: 0 }, // 10초 동안 서서히 vuser 가 0 명 되도록 (Ramp-down)
  ]
}


export default function () {
  // 2개 api 호출
  const res1 = http.get('http://localhost:8080/customers')
  check(res1, { 'status was 200': (r) => r.status === 200 })

  const res2 = http.get('http://localhost:8080/customers/2')
  check(res2, { 'status was 200': (r) => r.status === 200 })
};