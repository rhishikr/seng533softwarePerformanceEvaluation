# K6 n8n Webhook Load Test (`script.js`)

This script runs a K6 load test against an n8n webhook endpoint by sending JSON `POST` requests and logging response status and request duration.

## Prerequisites

- [k6](https://k6.io/docs/get-started/installation/) installed
- Internet access to: `https://flow.lumeniq.cloud/webhook/seng533`

## Run the Test

```bash
k6 run script.js
```

## Script Configuration

The script exposes the following configurable fields:

- `vus`: number of concurrent virtual users
- `duration`: total test runtime
- `workload`: request workload profile (`small`, `medium`, `large`)
- `mode`: execution mode (`real`, `benchmark`)
- Disable flags:
  - `disableLLM`
  - `disableDB`
  - `disablehashtagscraper`
  - `disableprofilescraper`

## Parameters

- `workload`
  - `small`: light workload
  - `medium`: moderate workload
  - `large`: heavy workload
- `mode`
  - `real`: full/realistic path, slower and more expensive
  - `benchmark`: performance-focused mode, preferred for high load
- Disable flags (set to `true` to disable that component):
  - `disableLLM`: disables LLM-related processing
  - `disableDB`: disables database interaction
  - `disablehashtagscraper`: disables hashtag scraper
  - `disableprofilescraper`: disables profile scraper

For isolation tests, enable only one disable flag at a time.


## Notes / Warnings

- Do not mix iteration-based execution with duration-based execution in the same test design.
- High `vus` values can overload the target system.
- Use `benchmark` mode for high-load testing.
- `real` mode is slower and typically more expensive.

## Output

Each request logs:

- `status`: HTTP response status code
- `duration`: request time in milliseconds (`res.timings.duration`)

What to look for:

- Rising duration as `vus` increases
- Error statuses (`4xx`/`5xx`) under load
- Stability/consistency of response time across runs
