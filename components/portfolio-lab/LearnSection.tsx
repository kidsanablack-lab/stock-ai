"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { actionClass } from "@/components/ui/ActionLink";
import Card from "@/components/ui/Card";
import NoteBox from "@/components/ui/NoteBox";
import {
  JOURNEYS,
  LEARN_ANCHORS,
  LEARN_GROUPS,
  LEARN_TOPICS,
  SCOPE_PAGES,
  topicsInGroup,
  type JourneyAction,
  type LearnTopic,
} from "@/lib/portfolio-lab/learn";
import PlSection from "./PlSection";

export default function LearnSection() {
  // Which topics are open. Journeys can open a topic, so the state lives here.
  const [open, setOpen] = useState<string[]>([]);

  const allOpen = open.length === LEARN_TOPICS.length;

  function toggle(id: string) {
    setOpen((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function openTopic(id: string) {
    setOpen((current) => (current.includes(id) ? current : [...current, id]));

    // Wait for the topic to open, then bring it into view and focus it.
    window.requestAnimationFrame(() => {
      const card = document.getElementById(`learn-${id}`);
      const button = document.getElementById(`learn-${id}-button`);
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      card?.scrollIntoView?.({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      button?.focus({ preventScroll: true });
    });
  }

  function renderAction(action: JourneyAction) {
    if (action.kind === "page") {
      const page = SCOPE_PAGES[action.page];

      return (
        <Link href={page.href} className={actionClass}>
          {page.label}
          <i className="ti ti-arrow-up-right" aria-hidden="true" />
        </Link>
      );
    }

    if (action.kind === "anchor") {
      return (
        <a href={LEARN_ANCHORS[action.anchor].href} className={actionClass}>
          {action.label}
          <i className="ti ti-arrow-down" aria-hidden="true" />
        </a>
      );
    }

    return (
      <button type="button" className={actionClass} onClick={() => openTopic(action.topicId)}>
        {action.label}
        <i className="ti ti-arrow-down" aria-hidden="true" />
      </button>
    );
  }

  function renderTopic(topic: LearnTopic) {
    const isOpen = open.includes(topic.id);
    const buttonId = `learn-${topic.id}-button`;
    const panelId = `learn-${topic.id}-panel`;

    return (
      <li
        key={topic.id}
        id={`learn-${topic.id}`}
        className={`scroll-mt-24 rounded-2xl border bg-white hover:border-primary ${
          isOpen ? "border-primary" : "border-border"
        }`}
      >
        <h5>
          <button
            id={buttonId}
            type="button"
            className="flex w-full items-start justify-between gap-3 rounded-2xl p-4 text-left"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => toggle(topic.id)}
          >
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-body font-semibold text-ink">{topic.title}</span>
              <span className="text-note text-ink-muted">{topic.summary}</span>
            </span>
            <i
              className={`ti ti-chevron-down mt-0.5 shrink-0 text-lg text-ink-muted transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </h5>

        <div id={panelId} className="space-y-3 px-4 pb-4 text-note text-ink" hidden={!isOpen}>
          {topic.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <NoteBox>
            <p>
              <strong className="font-semibold">Keep in mind:</strong> {topic.keepInMind}
            </p>
          </NoteBox>

          {topic.tryIt && (
            <a href={LEARN_ANCHORS[topic.tryIt.anchor].href} className={actionClass}>
              {topic.tryIt.text}
              <i className="ti ti-arrow-down" aria-hidden="true" />
            </a>
          )}
        </div>
      </li>
    );
  }

  return (
    <PlSection
      id="learn-and-explore"
      titleId="pl-learn-title"
      title="The ideas behind a portfolio, in plain language"
      lead="Short guides to the words you meet while building a portfolio. Open any topic, or follow an example path that connects the rest of Scope to the tools on this page."
    >
      <NoteBox>
        <p>
          These guides are general and educational. They describe what things are and what can
          affect them. They do not say what any asset may do in future, or which holdings suit any
          particular person.
        </p>
      </NoteBox>

      <div>
        <h3 className="font-serif text-h3 font-normal text-ink">Example paths through Scope</h3>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {JOURNEYS.map((journey) => (
            <Card as="article" key={journey.id} aria-labelledby={`journey-${journey.id}`}>
              <h4 id={`journey-${journey.id}`} className="font-serif text-h4 font-normal text-ink">
                {journey.title}
              </h4>
              <p className="mt-2 text-note text-ink-muted">{journey.intro}</p>

              <ol className="mt-5">
                {journey.steps.map((step, index) => {
                  const last = index === journey.steps.length - 1;

                  return (
                    <li key={step.text} className="relative pb-5 pl-11 last:pb-0">
                      <span
                        className={`absolute left-0 top-0 grid size-8 place-items-center rounded-full text-small font-semibold ${
                          last ? "bg-primary text-white" : "bg-primary-soft text-primary-ink"
                        }`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      {!last && (
                        <span
                          className="absolute left-4 top-9 bottom-1 -ml-px w-0.5 bg-primary/30"
                          aria-hidden="true"
                        />
                      )}

                      <p className="pt-1 text-note text-ink">{step.text}</p>
                      {renderAction(step.action)}
                    </li>
                  );
                })}
              </ol>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-h3 font-normal text-ink">Guides</h3>
          <Button
            variant="secondary"
            onClick={() => setOpen(allOpen ? [] : LEARN_TOPICS.map((topic) => topic.id))}
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </Button>
        </div>

        <div className="mt-5 space-y-8">
          {LEARN_GROUPS.map((group) => (
            <div key={group.id}>
              <h4 className="text-body font-semibold text-ink">{group.title}</h4>
              <p className="mt-1 text-note text-ink-muted">{group.text}</p>

              <ul className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                {topicsInGroup(group.id).map(renderTopic)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PlSection>
  );
}
