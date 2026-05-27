import { useState } from "react";
import { toast } from "react-toastify";

/* ── inline styles ─────────────────────────────────────────────── */
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
    filter: "blur(7px) brightness(0.4)",
    transform: "scale(1.06)",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg,rgba(10,26,36,0.85) 0%,rgba(13,148,136,0.32) 100%)",
    zIndex: 1,
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "400px",
    margin: "20px",
    background: "rgba(255,255,255,0.97)",
    borderRadius: "22px",
    padding: "40px 36px 34px",
    boxShadow:
      "0 28px 64px rgba(0,0,0,0.38),0 0 0 1px rgba(255,255,255,0.12)",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "28px",
  },
  brandIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#0d9488,#0f766e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
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
    fontSize: "24px",
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: "5px",
    letterSpacing: "-0.4px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "28px",
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
    marginBottom: "16px",
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
    transition: "border-color 0.2s,box-shadow 0.2s,background 0.2s",
  },
  btn: {
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
    transition: "opacity 0.18s,transform 0.18s,box-shadow 0.18s",
    marginTop: "8px",
    fontFamily: "'Inter',sans-serif",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "22px 0 16px",
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: 500,
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },
  outlineBtn: {
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
    transition: "border-color 0.18s,color 0.18s",
    marginTop: 0,
    fontFamily: "'Inter',sans-serif",
  },
  badges: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9",
    flexWrap: "wrap",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: 500,
  },
};

/* ── reusable Field ───────────────────────────────────────────── */
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
            boxShadow: focused ? "0 0 0 3px rgba(13,148,136,0.14)" : "none",
            background: focused ? "#fff" : "#f8fafc",
          }}
        />
      </div>
    </div>
  );
}

/* ── main Login component (logic unchanged) ───────────────────── */
function Login({ setPage, setIsAdmin, setIsLoggedIn }) {
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [primaryHover, setPrimary] = useState(false);
  const [outlineHover, setOutline] = useState(false);

  const handleLogin = () => {
    // ADMIN LOGIN
    if (email === "admin@gmail.com" && password === "admin123") {
      toast.success("✅ Admin Login Successful", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      setIsAdmin(true);
      setIsLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("userName", "Admin");
      setPage("home");
      return;
    }

    // CUSTOMER LOGIN
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      toast.success("🎉 Login Successful", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      setIsAdmin(false);
      setIsLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("userName", savedUser.name);
      setPage("home");
      return;
    }

    // INVALID
    alert("Invalid Email or Password ❌");
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
        {/* blurred product bg */}
        <div style={S.bgImage} />
        <div style={S.overlay} />

        {/* card */}
        <div style={S.card}>

          {/* brand */}
          <div style={S.brandRow}>
            <div style={S.brandIcon}>
              <i className="ti ti-shopping-bag" style={{ fontSize: 18, color: "#fff" }} />
            </div>
            <span style={S.brandName}>⚡ ShopHub</span>
          </div>

          <h1 style={S.title}>Welcome back</h1>
          <p style={S.subtitle}>Sign in to continue to your account</p>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* primary CTA */}
          <button
            onClick={handleLogin}
            onMouseEnter={() => setPrimary(true)}
            onMouseLeave={() => setPrimary(false)}
            style={{
              ...S.btn,
              opacity: primaryHover ? 0.9 : 1,
              transform: primaryHover ? "translateY(-2px)" : "translateY(0)",
              boxShadow: primaryHover
                ? "0 8px 24px rgba(13,148,136,0.44)"
                : "0 2px 8px rgba(13,148,136,0.22)",
            }}
          >
            <i className="ti ti-login" style={{ fontSize: 16 }} />
            Sign In
          </button>

          {/* divider */}
          <div style={S.divider}>
            <div style={S.dividerLine} />
            <span>New to ⚡ ShopHub?</span>
            <div style={S.dividerLine} />
          </div>

          {/* outline register button */}
          <button
            onClick={() => setPage("register")}
            onMouseEnter={() => setOutline(true)}
            onMouseLeave={() => setOutline(false)}
            style={{
              ...S.outlineBtn,
              borderColor: outlineHover ? "#0d9488" : "#e2e8f0",
              color: outlineHover ? "#0d9488" : "#334155",
            }}
          >
            <i className="ti ti-user-plus" style={{ fontSize: 15 }} />
            Create Account
          </button>

          {/* trust strip */}
          <div style={S.badges}>
            <div style={S.badge}>
              <i className="ti ti-shield-check" style={{ color: "#10b981", fontSize: 14 }} />
              Secure Login
            </div>
            <div style={S.badge}>
              <i className="ti ti-lock" style={{ color: "#10b981", fontSize: 14 }} />
              Encrypted
            </div>
            <div style={S.badge}>
              <i className="ti ti-star" style={{ color: "#f59e0b", fontSize: 14 }} />
              Trusted Store
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;