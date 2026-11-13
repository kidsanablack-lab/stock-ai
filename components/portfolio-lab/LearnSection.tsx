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
        <Link href={page.href} className="pl-ln-link">
          {page.label}
          <i className="ti ti-arrow-up-right" aria-hidden="true" />
        </Link>
      );
    }

    if (action.kind === "anchor") {
      return (
        <a href={LEARN_ANCHORS[action.anchor].href} className="pl-ln-link">
          {action.label}
          <i className="ti ti-arrow-down" aria-hidden="true" />
        </a>
      );
    }

    return (
      <button type="button" className="pl-ln-link" onClick={() => openTopic(action.topicId)}>
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
      <li key={topic.id} id={`learn-${topic.id}`} className={`pl-ln-topic${isOpen ? " is-open" : ""}`}>
        <h5 className="pl-ln-topic-heading">
          <button
            id={buttonId}
            type="button"
            className="pl-ln-topic-button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => toggle(topic.id)}
          >
            <span className="pl-ln-topic-text">
              <span className="pl-ln-topic-name">{topic.title}</span>
              <span className="pl-ln-topic-summary">{topic.summary}</span>
            </span>
            <i className="ti ti-chevron-down pl-ln-chevron" aria-hidden="true" />
          </button>
        </h5>

        <div id={panelId} className="pl-ln-topic-body" hidden={!isOpen}>
          {topic.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <p className="pl-ln-keep">
            <i className="ti ti-info-circle" aria-hidden="true" />
            <span>
              <strong>Keep in mind:</strong> {topic.keepInMind}
            </span>
          </p>

          {topic.tryIt && (
            <a href={LEARN_ANCHORS[topic.tryIt.anchor].href} className="pl-ln-link">
              {topic.tryIt.text}
              <i className="ti ti-arrow-down" aria-hidden="true" />
            </a>
          )}
        </div>
      </li>
    );
  }

  return (
    <section id="learn-and-explore" className="pl-section" aria-labelledby="pl-learn-title">
      <p className="pl-eyebrow">Learn and Explore</p>
      <h2 id="pl-learn-title" className="pl-h2">
        The ideas behind a portfolio, in plain language
      </h2>
      <p className="pl-lead">
        Short guides to the words you meet while building a portfolio. Open any
        topic, or follow an example path that connects the rest of Scope to the
        tools on this page.
      </p>

      <p className="pl-ln-note">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <span>
          These guides are general and educational. They describe what things
          are and what can affect them. They do not say what any asset may do in
          future, or which holdings suit any particular person.
        </span>
      </p>

      <div className="pl-ln-block">
        <h3 className="pl-h3">Example paths through Scope</h3>

        <div className="pl-ln-journeys">
          {JOURNEYS.map((journey) => (
            <article key={journey.id} className="pl-ln-journey" aria-labelledby={`journey-${journey.id}`}>
              <h4 id={`journey-${journey.id}`} className="pl-ln-journey-title">
                {journey.title}
              </h4>
              <p className="pl-ln-journey-intro">{journey.intro}</p>

              <ol className="pl-ln-steps">
                {journey.steps.map((step) => (
                  <li key={step.text} className="pl-ln-step">
                    <p>{step.text}</p>
                    {renderAction(step.action)}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>

      <div className="pl-ln-block">
        <div className="pl-ln-topics-head">
          <h3 className="pl-h3">Guides</h3>
          <button
            type="button"
            className="pl-btn pl-btn-ghost"
            onClick={() => setOpen(allOpen ? [] : LEARN_TOPICS.map((topic) => topic.id))}
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        {LEARN_GROUPS.map((group) => (
          <div key={group.id} className="pl-ln-group">
            <h4 className="pl-ln-group-title">{group.title}</h4>
            <p className="pl-ln-group-text">{group.text}</p>

            <ul className="pl-ln-topics">{topicsInGroup(group.id).map(renderTopic)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
