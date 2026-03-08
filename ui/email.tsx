interface EmailTemplateProps {
  shopName: string
  otp: string
}

export function EmailTemplate({ shopName, otp }: EmailTemplateProps) {
  return (
    <div style={container}>
      
      <div style={card}>

        <h2 style={title}>Simamia Security Verification</h2>

        <p style={text}>
          Hello <strong>{shopName}</strong>,
        </p>

        <p style={text}>
          We received a request to activate <strong>Simamia</strong> on a new Android device.
          To protect your business data, please confirm this change using the verification code below.
        </p>

        <div style={otpBox}>
          {otp}
        </div>

        <p style={smallText}>
          This code will expire in <strong>10 minutes</strong>.
        </p>

        <p style={text}>
          If you did not request this change, please ignore this email and secure your account.
        </p>

        <hr style={divider} />

        <p style={footer}>
          Simamia Business Management System
          <br/>
          Track sales, expenses and profit with confidence.
        </p>

      </div>

    </div>
  )
}

const container = {
  backgroundColor: "#f4f6f8",
  padding: "40px 0",
  fontFamily: "Arial, Helvetica, sans-serif",
}

const card = {
  maxWidth: "520px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}

const title = {
  fontSize: "22px",
  marginBottom: "20px",
  color: "#111",
}

const text = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#333",
  marginBottom: "16px",
}

const otpBox = {
  fontSize: "32px",
  letterSpacing: "8px",
  textAlign: "center" as const,
  fontWeight: "bold",
  padding: "18px",
  margin: "24px 0",
  backgroundColor: "#f1f5f9",
  borderRadius: "8px",
  color: "#111",
}

const smallText = {
  fontSize: "13px",
  color: "#555",
  marginBottom: "20px",
}

const divider = {
  border: "none",
  borderTop: "1px solid #eee",
  margin: "24px 0",
}

const footer = {
  fontSize: "12px",
  color: "#777",
  textAlign: "center" as const,
}