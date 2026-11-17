import { LESSONS } from "@/lib/valuation-lab/content";

export default function LearningCenter() {
  return (
    <section
      id="learning"
      className="vl-section"
      aria-labelledby="vl-learning-title"
    >
      <h2 id="vl-learning-title" className="vl-h2">
        Eight short lessons explain the ideas behind each tool
      </h2>

      <p className="vl-section-lead">
        Every example uses made-up numbers to show the idea. None of them
        describes a real company.
      </p>

      <div className="vl-lessons">
        {LESSONS.map((lesson, index) => (
          <details key={lesson.id} className="vl-lesson">
            <summary>
              <span className="vl-lesson-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="vl-lesson-title">{lesson.title}</span>
            </summary>

            <div className="vl-lesson-body">
              <p className="vl-text">{lesson.intro}</p>

              {lesson.formulas?.map((formula) => (
                <p key={formula} className="vl-formula vl-formula-lesson">
                  {formula}
                </p>
              ))}

              <div className="vl-example">
                <p className="vl-example-tag">Hypothetical example</p>
                <p className="vl-example-title">{lesson.exampleTitle}</p>
                <ul>
                  {lesson.example.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <h4 className="vl-h4">Limitations</h4>
              <ul className="vl-lesson-list">
                {lesson.limits.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>

              <a href={lesson.link.href} className="vl-lesson-link">
                {lesson.link.label}
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}