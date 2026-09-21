# LinkedIn post — RIDER portfolio agent launch

Publish with: a screenshot of the chat widget (opened, mid-conversation) and one of
the "The Assistant" section showing the guardrail trace. Put the portfolio link in
the FIRST COMMENT (LinkedIn throttles posts with links in the body).

---

I built the AI agent that lives on my portfolio — and it's not a chatbot widget.

It's **RIDER**: a locked-down, retrieval-augmented assistant that answers questions
about me strictly from a knowledge base built from my resume and verified GitHub
facts. If something isn't in the KB, it says "I don't know." No hallucinations allowed.

The part I'm most proud of is the architecture:

**DeepSeek generates. Jev judges.**

Jev is TypeSafe's "System One" model — it doesn't write text. It returns typed
judgments with calibrated probabilities, and my code owns the workflow, thresholds
every probability, and decides what happens next.

The guardrail pipeline around every message:

• Pre-guard — is this a jailbreak attempt? What's the intent: chat, lead, or abuse?
• Post-guard — does the reply contain claims that contradict my KB? Is it safe to show?
• On any failed judgment, code swaps in a safe fallback. The model never gets the
  final word.

And it does real work: when a visitor wants to work with me, RIDER captures the lead —
validated email, straight to my inbox, with a deterministic confirmation. No form
abandonment, no missed messages at 2 a.m.

**Try to break it. I mean that.**

Open it up, prompt-inject it, ask it things it shouldn't know, demand it reveal its
instructions. If it ever says something wrong, that's a bug report I genuinely want —
every failure tightens the rails.

And if you're building — or need — something like this: a guardrailed RAG assistant,
LLM-powered features, or automation around your data, my DMs are open.

#AIEngineering #RAG #TypeSafe #Jev #LLMGuardrails #DataEngineering
#Automation #MachineLearning #BuiltInPublic #KenyaTech

---

## Posting checklist

- [ ] Attach chat screenshot + guardrail trace screenshot
- [ ] Portfolio link in the first comment
- [ ] Tag TypeSafe's page if they have one on LinkedIn
- [ ] Reply to every comment — engagement signals boost reach
