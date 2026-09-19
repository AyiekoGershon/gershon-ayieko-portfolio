# RIDER — portfolio assistant (RAG + guardrails)

A floating chat assistant on the portfolio that answers strictly from Gershon's
knowledge base and captures leads. It is itself the demo: locked persona, strict
RAG, input/output guardrails.

## Architecture

```
Browser widget ──POST /api/chat──▶ Vercel serverless (api/chat.js)
                                      │ input guardrails (sanitize, abuse patterns)
                                      │ per-IP rate limit
                                      ▼
                              DeepSeek chat (temp 0.2, JSON schema)
                                      │ output guardrails (parse + validate)
                                      ▼
                              { reply, intent, lead } ──▶ page
                              intent:lead + valid email ──▶ FORMSPREE_ENDPOINT
```

- The knowledge base (`src/data/knowledge-base.js`) is the ONLY allowed context.
- The model must answer from the KB, cite sections, and say "I don't know"
  outside it. JSON-only output is enforced via `response_format: json_object`.
- Keys live only in server env vars — never in the client bundle.

## Setup

### 1. Vercel

Project → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `DEEPSEEK_API_KEY` | your DeepSeek key (https://platform.deepseek.com) |
| `DEEPSEEK_MODEL` | `deepseek-chat` |
| `ASSISTANT_TEMPERATURE` | `0.2` (lower = stricter persona) |
| `ASSISTANT_MAX_MESSAGES_PER_HOUR` | `20` (per visitor, per instance) |
| `TYPESAFE_API_KEY` | optional — enables the Jev guardrail layer |
| `FORMSPREE_ENDPOINT` | Formspree form URL for leads (server-side, no `VITE_`) |

Redeploy after saving. No code changes needed — `api/` is auto-detected.

### 2. Local development

```bash
Copy-Item .env.example .env   # then fill values (or leave blank for mock mode)
npm run dev
```

Without `DEEPSEEK_API_KEY`, the assistant runs in **mock mode** with canned
replies so you can develop the UI for free. The dev server bridges `/api/chat`
through Vite (`devApiPlugin` in `vite.config.js`).

## Changing the model

`api/chat.js` → `MODEL` default. DeepSeek uses the OpenAI-compatible endpoint,
so switching to OpenAI/Gemini is a matter of changing base URL, key, and
`response_format` payload shape.

## Lead capture

When the visitor expresses service intent, the agent asks for an email,
validates it (`EMAIL_RE`), and POSTs `{source, email, phone, topic, message}`
to `FORMSPREE_ENDPOINT`. If the endpoint is missing, the reply tells the
visitor to email directly. Leaks are never stored by the site itself.

## Guardrails — current (Phase 1)

| Layer | What it does |
|---|---|
| Persona lock | system contract + temperature 0.2 + JSON schema |
| Input | control-char strip, 2000-char cap, injection-pattern refusal |
| **Jev pre-guard** | one batched System One call: `is_jailbreak` (noul) + `intent` (choice: chat/lead/abuse/off_topic). Blocks jailbreaks ≥ 0.6 and abuse with confidence ≥ 0.5 |
| **Jev post-guard** | one batched call over `{reply, knowledge_base}`: `kb_supported` + `is_safe` (nouls). Unverified or unsafe replies are replaced with a safe fallback |
| Output | JSON validation, 900-char reply cap, graceful fallback message |
| Rate limit | per-IP, 20 msg/hour, in-memory (per serverless instance) |
| Abuse | "ignore instructions" style inputs are refused without an LLM call |

### Jev (TypeSafe System One)

`api/jev.js` wraps `POST https://api.typesafe.ai/v1/systemone` with model
`jev-latest`. Enable by setting `TYPESAFE_API_KEY`; when unset, the pipeline
skips Jev gracefully and the regex/JSON guards still run. Jev supplies
calibrated probabilities — thresholds live in code, per the TypeSafe
philosophy: the model judges, code decides. Docs: https://docs.typesafe.ai/api.md

## Upgrading to NeMo Guardrails (Phase 2)

1. Stand up a small Python service (Render / Fly / Railway) running
   `nemoguardrails` with a config defining the same persona, KB-only facts,
   and input/output rails.
2. Change `api/chat.js` `callDeepSeek()` to POST to that service instead of
   calling DeepSeek directly.
3. Keep the serverless function as the rate limiter + lead layer.

## Cost & abuse notes

- DeepSeek pricing is low, but public endpoints attract spam: keep the rate
  limit and consider Vercel KV for cross-instance limits at higher traffic.
- Budget guard: monitor DeepSeek dashboard; add a hard daily cap if needed.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Widget replies with mock text on Vercel | `DEEPSEEK_API_KEY` missing → add in Vercel env, redeploy |
| 429 Too many requests | rate limit hit; raise `ASSISTANT_MAX_MESSAGES_PER_HOUR` |
| Reply says lead capture offline | `FORMSPREE_ENDPOINT` missing or wrong |
| `llm_http_401` in function logs | invalid key |
| Widget works locally but not on Vercel | check build output env; `api/` must be in repo root |
