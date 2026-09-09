# Contact form

## How it works

The form posts to **Formspree** when configured; otherwise it gracefully falls back to
opening the visitor's mail client with a pre-filled message to
`gershonayieko3@gmail.com`. Nothing is ever stored on this site.

## 1. Create the Formspree form

1. Go to https://formspree.io and sign up.
2. Create a new form for `gershonayieko3@gmail.com`.
3. Copy the form ID from the "Integration" tab, e.g. `https://formspree.io/f/mqkrznab`.

## 2. Store the endpoint

Create `.env` from the template:

```bash
Copy-Item .env.example .env
```

Then edit `.env`:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mqkrznab
```

Restart the dev server. The form hint text updates automatically when configured.
`.env` is git-ignored — secrets are never committed.

## 3. Change it

Edit `.env`, rebuild (`npm run build`). The endpoint is injected at build time via
`import.meta.env`.

## 4. Test it

1. `npm run dev`, fill and submit the form.
2. Confirm the success toast and the Formspree dashboard shows the submission.
3. Test the failure path by pointing the endpoint at a bogus form ID — the site
   should show an error toast and fall back to the mail client.

## 5. How submissions are handled

Formspree receives the POST (`name`, `email`, `topic`, `message`) and forwards it to
the form's registered email. Spam and rate limits are handled by Formspree.

## 6. Troubleshooting

| Symptom | Fix |
|---|---|
| Form always opens mail client | `.env` missing / wrong var name / dev server not restarted |
| Error toast on submit | Wrong form ID, or Formspree form not activated (check email confirmation) |
| Success toast but no email | Check Formspree dashboard → form settings → destination email |
| No toast at all | Open DevTools console — `Accept: application/json` is required by Formspree |
