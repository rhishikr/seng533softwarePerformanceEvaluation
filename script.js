import http from 'k6/http';

export const options = {
  vus: 300,          // user count
  duration: '1m',    // used in benchmark mode
  //iterations: 3,   //used in real mode instead of duration
};

export default function () {
  const url = 'https://flow.lumeniq.cloud/webhook/seng533';

  const payload = JSON.stringify({
    workload: 'small',      // small | medium | large
    mode: 'benchmark',      // real | benchmark

    disableLLM: false,
    disableDB: false,
    disablehashtagscraper: false,
    disableprofilescraper: false
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '240s'
  };

  const res = http.post(url, payload, params);

  console.log(`status=${res.status} duration=${res.timings.duration}ms`);
}
