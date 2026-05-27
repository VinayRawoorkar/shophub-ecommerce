import { useState } from "react";

/* ── styles (mirrors Login.jsx exactly) ────────────────────────── */
const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
  },
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(7px) brightness(0.38)",
    transform: "scale(1.06)",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg,rgba(10,26,36,0.86) 0%,rgba(13,148,136,0.3) 100%)",
    zIndex: 1,
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "390px",
    margin: "20px",
    background: "rgba(255,255,255,0.97)",
    borderRadius: "22px",
    padding: "38px 34px 32px",
    boxShadow:
      "0 28px 64px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.1)",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "26px",
  },
  brandIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    flexShrink: 0,
    background: "linear-gradient(135deg,#0d9488,#0f766e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
    fontSize: "20px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.4px",
  },
  title: {
    fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
    fontSize: "23px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.4px",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "26px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    color: "#334155",
    marginBottom: "6px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },
  fieldWrap: {
    position: "relative",
    marginBottom: "15px",
  },
  iconStyle: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    lineHeight: 1,
    pointerEvents: "none",
    transition: "color 0.18s",
  },
  input: {
    width: "100%",
    padding: "11px 14px 11px 38px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    background: "#f8fafc",
    fontSize: "14px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Inter',sans-serif",
    transition: "border-color 0.2s,box-shadow 0.2s,background 0.2s",
  },
  btnPrimary: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#0d9488,#0f766e)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxSizing: "border-box",
    fontFamily: "'Inter',sans-serif",
    marginTop: "8px",
    transition: "opacity 0.18s,transform 0.18s,box-shadow 0.18s",
    boxShadow: "0 2px 8px rgba(13,148,136,0.22)",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0 15px",
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 500,
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },
  btnOutline: {
    width: "100%",
    padding: "12px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    background: "transparent",
    color: "#334155",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxSizing: "border-box",
    fontFamily: "'Inter',sans-serif",
    transition: "border-color 0.18s,color 0.18s",
  },
  trust: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "18px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: 500,
  },
};

/* ── reusable Field (identical to Login) ──────────────────────── */
function Field({ label, iconClass, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={S.label}>{label}</label>
      <div style={S.fieldWrap}>
        <i
          className={iconClass}
          style={{
            ...S.iconStyle,
            color: focused ? "#0d9488" : "#94a3b8",
          }}
        />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...S.input,
            borderColor: focused ? "#0d9488" : "#e2e8f0",
            boxShadow: focused
              ? "0 0 0 3px rgba(13,148,136,0.14)"
              : "none",
            background: focused ? "#fff" : "#f8fafc",
          }}
        />
      </div>
    </div>
  );
}

/* ── main Register component (logic unchanged) ────────────────── */
function Register({ setPage }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [primaryHover, setPrimary] = useState(false);
  const [outlineHover, setOutline] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Save user in localStorage
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful ✅");
    setPage("login");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css"
      />

      <div style={S.page}>
        {/* blurred shop background */}
        <div style={S.bgImage} />
        <div style={S.overlay} />

        {/* card */}
        <div style={S.card}>

          {/* brand strip */}
          <div style={S.brandRow}>
            <div style={S.brandIcon}>
              <i className="ti ti-shopping-bag" style={{ fontSize: 18, color: "#fff" }} />
            </div>
            <span style={S.brandName}>⚡ ShopHub</span>
          </div>

          <h1 style={S.title}>Create account</h1>
          <p style={S.subtitle}>Join us — it's free and takes under a minute</p>

          <Field
            label="Full name"
            iconClass="ti ti-user"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Field
            label="Email address"
            iconClass="ti ti-mail"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Field
            label="Password"
            iconClass="ti ti-lock"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* primary CTA */}
          <button
            onClick={handleRegister}
            onMouseEnter={() => setPrimary(true)}
            onMouseLeave={() => setPrimary(false)}
            style={{
              ...S.btnPrimary,
              opacity: primaryHover ? 0.9 : 1,
              transform: primaryHover ? "translateY(-2px)" : "translateY(0)",
              boxShadow: primaryHover
                ? "0 8px 24px rgba(13,148,136,0.44)"
                : "0 2px 8px rgba(13,148,136,0.22)",
            }}
          >
            <i className="ti ti-user-plus" style={{ fontSize: 16 }} />
            Create Account
          </button>

          {/* divider */}
          <div style={S.divider}>
            <div style={S.dividerLine} />
            <span>Already have an account?</span>
            <div style={S.dividerLine} />
          </div>

          {/* outline back-to-login button */}
          <button
            onClick={() => setPage("login")}
            onMouseEnter={() => setOutline(true)}
            onMouseLeave={() => setOutline(false)}
            style={{
              ...S.btnOutline,
              borderColor: outlineHover ? "#0d9488" : "#e2e8f0",
              color: outlineHover ? "#0d9488" : "#334155",
            }}
          >
            <i className="ti ti-login" style={{ fontSize: 15 }} />
            Sign In Instead
          </button>

          {/* trust strip */}
          <div style={S.trust}>
            <div style={S.trustItem}>
              <i className="ti ti-shield-check" style={{ color: "#10b981", fontSize: 13 }} />
              Secure & Private
            </div>
            <div style={S.trustItem}>
              <i className="ti ti-lock" style={{ color: "#10b981", fontSize: 13 }} />
              Encrypted
            </div>
            <div style={S.trustItem}>
              <i className="ti ti-star" style={{ color: "#f59e0b", fontSize: 13 }} />
              Trusted Store
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Register;