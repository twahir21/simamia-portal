interface EmailTemplateProps {
  otp: string;
  identity: string;
}

export default function EmailTemplate({identity,  otp }: EmailTemplateProps) {
  return (
    <div style={container}>
      <div style={card}>
        {/* Email Preview Text */}
        <div
          style={{
            display: "none",
            overflow: "hidden",
            maxHeight: "0",
            opacity: 0,
          }}
        >
          Your Simamia App code is {otp}. Valid for 2 minutes.
        </div>

        <h2 style={title}>Security Verification</h2>

        <div style={otpBox}>{otp}</div>

        <p style={text}>
          Use this verification code to complete your action on{" "}
          <strong>Simamia App</strong> with <strong>{identity}</strong>. To
          secure your business data, never share this code with anyone.
        </p>

        <hr style={divider} />

        <p style={footer}>Simamia App - Business Management System</p>
      </div>
    </div>
  );
}

// Light Mode Color Palette (Sky & Slate)
const container = {
  backgroundColor: "#f0f9ff", // sky-50
  padding: "40px 12px",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const card = {
  maxWidth: "480px",
  margin: "0 auto",
  backgroundColor: "#ffffff", // white mode
  borderRadius: "16px",
  padding: "32px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
  border: "1px solid #e2e8f0", // slate-200
};


const title = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "16px",
  color: "#0f172a", // slate-900
};

const otpBox = {
  fontSize: "36px",
  letterSpacing: "6px",
  textAlign: "center" as const,
  fontWeight: "bold",
  padding: "20px",
  margin: "24px 0",
  backgroundColor: "#f8fafc", // slate-50
  border: "2px dashed #bae6fd", // sky-200
  borderRadius: "12px",
  color: "#0284c7", // sky-600
};

const text = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#475569", // slate-600
  marginBottom: "16px",
};

const divider = {
  border: "none",
  borderTop: "1px solid #e2e8f0", // slate-200
  margin: "24px 0",
};

const footer = {
  fontSize: "12px",
  color: "#94a3b8", // slate-400
  textAlign: "center" as const,
  fontWeight: "500",
};
