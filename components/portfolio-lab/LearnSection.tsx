"use client";

import Link from "next/link";
import { useState } from "react";
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
import "./portfolio-lab-learn.css";

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
        <Link href={page.href} className="pl-ln2-link">
          {page.label}
          <i className="ti ti-arrow-up-right" aria-hidden="true" />
        </Link>
      );
    }

    if (action.kind === "anchor") {
      return (
        <a href={LEARN_ANCHORS[action.anchor].href} className="pl-ln2-link">
          {action.label}
          <i className="ti ti-arrow-down" aria-hidden="true" />
        </a>
      );
    }

    return (
      <button type="button" className="pl-ln2-link" onClick={() => openTopic(action.topicId)}>
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
      <li key={topic.id} id={`learn-${topic.id}`} className={`pl-ln2-topic${isOpen ? " is-open" : ""}`}>
        <h5 className="pl-ln2-topic-heading">
          <button
            id={buttonId}
            type="button"
            className="pl-ln2-topic-button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => toggle(topic.id)}
          >
            <span className="pl-ln2-topic-text">
              <span className="pl-ln2-topic-name">{topic.title}</span>
              <span className="pl-ln2-topic-summary">{topic.summary}</span>
            </span>
            <i className="ti ti-chevron-down pl-ln2-chevron" aria-hidden="true" />
          </button>
        </h5>

        <div id={panelId} className="pl-ln2-topic-body" hidden={!isOpen}>
          {topic.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <p className="pl-ln2-keep">
            <i className="ti ti-info-circle" aria-hidden="true" />
            <span>
              <strong>Keep in mind:</strong> {topic.keepInMind}
            </span>
          </p>

          {topic.tryIt && (
            <a href={LEARN_ANCHORS[topic.tryIt.anchor].href} className="pl-ln2-link">
              {topic.tryIt.text}
              <i className="ti ti-arrow-down" aria-hidden="true" />
            </a>
          )}
        </div>
      </li>
    );
  }

  return (
    <section id="learn-and-explore" className="pl-section pl-ln2" aria-labelledby="pl-learn-title">
      <h2 id="pl-learn-title" className="pl-ln2-title">
        The ideas behind a portfolio, in plain language
      </h2>
      <p className="pl-ln2-lead">
        Short guides to the words you meet while building a portfolio. Open any
        topic, or follow an example path that connects the rest of Scope to the
        tools on this page.
      </p>

      <p className="pl-ln2-note">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <span>
          These guides are general and educational. They describe what things
          are and what can affect them. They do not say what any asset may do in
          future, or which holdings suit any particular person.
        </span>
      </p>

      <div className="pl-ln2-paths">
        <div className="pl-ln2-band">
          <h3 className="pl-ln2-band-title">Example paths through Scope</h3>
        </div>

        <div className="pl-ln2-journeys">
          {JOURNEYS.map((journey) => (
            <article key={journey.id} className="pl-ln2-journey" aria-labelledby={`journey-${journey.id}`}>
              <h4 id={`journey-${journey.id}`} className="pl-ln2-journey-title">
                {journey.title}
              </h4>
              <p className="pl-ln2-journey-intro">{journey.intro}</p>

              <ol className="pl-ln2-steps">
                {journey.steps.map((step) => (
                  <li key={step.text} className="pl-ln2-step">
                    <p>{step.text}</p>
                    {renderAction(step.action)}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>

      <div className="pl-ln2-block">
        <div className="pl-ln2-topics-head">
          <h3 className="pl-ln2-h3">Guides</h3>
          <button
            type="button"
            className="pl-ln2-btn"
            onClick={() => setOpen(allOpen ? [] : LEARN_TOPICS.map((topic) => topic.id))}
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        {LEARN_GROUPS.map((group) => (
          <section key={group.id} className="pl-ln2-group">
            <div className="pl-ln2-band">
              <h4 className="pl-ln2-group-title">{group.title}</h4>
              <p className="pl-ln2-group-text">{group.text}</p>
            </div>

            <ul className="pl-ln2-topics">{topicsInGroup(group.id).map(renderTopic)}</ul>
          </section>
        ))}
      </div>
    </section>
  );
}