type HeroProps = {
  query: string;
  setQuery: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Hero({
  query,
  setQuery,
  handleKeyDown,
}: HeroProps) {
  return (
    <div
         style={{
           width: "100%",
           textAlign: "center",
           background: "#eef2e6",
           borderRadius: 20,
           padding: "56px 48px",
           boxSizing: "border-box",
        }}
      >
    <div
          style={{
           width: "100%",
           maxWidth: 1200,
           margin: "0 auto",
          boxSizing: "border-box",
    }}
        >      
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#ffffff",
            borderRadius: 20,
            padding: "8px 16px",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#d97706",
              display: "inline-block",
            }}
          />

          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              letterSpacing: 1.5,
              color: "#374151",
            }}
          >
            AI-POWERED COMPANY RESEARCH
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1.15,
            color: "#1a1a18",
            margin: "0 auto 20px",
            maxWidth: 800,
          }}
        >
          Understand any
          <br />
          company{" "}
          <span
            style={{
              fontStyle: "italic",
              color: "#2f5233",
            }}
          >
            in seconds
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 16,
            color: "#57534e",
            margin: "0 auto 32px",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          What it does, how it makes money, and whether it&apos;s worth your
          attention — explained visually, not buried in filings.
        </p>

        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 10,
            width: "100%",
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          {/* Input */}
          <div
            className="card-surface"
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#ffffff",
              borderRadius: 12,
              padding: "14px 18px",
            }}
          >
            <i
              className="ti ti-search"
              style={{
                fontSize: 18,
                color: "#9ca3af",
                flexShrink: 0,
              }}
            />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Search companies or ticker — try "Apple" or "AAPL"'
              style={{
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#1a1a18",
                width: "100%",
                minWidth: 0,
                background: "transparent",
              }}
            />
          </div>

          {/* Button */}
          <button
            className="button-soft"
            style={{
              flexShrink: 0,
              background: "#2f5233",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              borderRadius: 12,
              padding: "0 24px",
              cursor: "pointer",
            }}
          >
            Scope it out
          </button>
        </div>
      </div>
    </div>
  );
}