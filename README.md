# K6 n8n Webhook Workflow Test (`script.js`)

This script uses K6 to test an n8n webhook workflow by sending JSON `POST` requests to a single webhook endpoint and printing status and response time for each request.

## Prerequisites

- [k6](https://k6.io/docs/get-started/installation/) installed
- Internet access to `https://flow.lumeniq.cloud/webhook/seng533`

## Run

```bash
k6 run script.js
```

## Script Configuration

The script currently defines:

- `vus`: number of virtual users
- `duration`: total test time (used in benchmark mode)
- `iterations` (commented): alternative run control for real mode
- `workload`: `small` | `medium` | `large`
- `mode`: `real` | `benchmark`
- Disable flags:
  - `disableLLM`
  - `disableDB`
  - `disablehashtagscraper`
  - `disableprofilescraper`

## Parameter Details

- `workload`
  - `small`: light request workload
  - `medium`: moderate request workload
  - `large`: heavy request workload
- `mode`
  - `real`: full workflow behavior, typically slower and more expensive
  - `benchmark`: performance-oriented mode for load testing
- Disable flags (`true` disables the component)
  - `disableLLM`: disable LLM processing
  - `disableDB`: disable database operations
  - `disablehashtagscraper`: disable hashtag scraping
  - `disableprofilescraper`: disable profile scraping

For isolation tests, enable only one disable flag at a time.

## Notes / Warnings

- Do not use `iterations` and `duration` together in the same run configuration.
- High `vus` can overload the target system.
- Prefer `benchmark` mode for high-load tests.
- `real` mode is slower and more expensive.

## Output

Each request logs:

- `status`: HTTP response status code
- `duration`: request latency in milliseconds (`res.timings.duration`)

What to monitor:

- Increasing latency as `vus` rises
- Error rates (`4xx`/`5xx`) under load
- Stability of latency across the full run
