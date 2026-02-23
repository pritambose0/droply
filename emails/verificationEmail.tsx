import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Section,
    Text,
    Container,
    Hr,
} from "@react-email/components";

interface VerificationEmailProps {
    otp: string;
    expiryMinutes?: number;
}

export default function VerificationEmail({
    otp,
    expiryMinutes = 10,
}: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verify Your Droply Account</title>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>

            <Preview>Your Droply verification code is: {otp}</Preview>

            <Section style={{ backgroundColor: "#f3f4f6", padding: "40px 0" }}>
                <Container
                    style={{
                        maxWidth: "480px",
                        margin: "0 auto",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "32px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        fontFamily: "Inter, Arial, sans-serif",
                    }}
                >
                    {/* Brand */}
                    <Text
                        style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            textAlign: "center",
                            color: "#6366f1",
                            marginBottom: "4px",
                        }}
                    >
                        Droply
                    </Text>

                    <Hr
                        style={{
                            borderColor: "#e5e7eb",
                            margin: "16px 0 24px",
                        }}
                    />

                    <Heading
                        as="h2"
                        style={{
                            fontSize: "22px",
                            fontWeight: "600",
                            marginBottom: "12px",
                            color: "#111827",
                            textAlign: "center",
                        }}
                    >
                        Verify your email 👋
                    </Heading>

                    <Text
                        style={{
                            fontSize: "16px",
                            color: "#4B5563",
                            lineHeight: "1.6",
                            textAlign: "center",
                        }}
                    >
                        Welcome to Droply! Use the verification code below to
                        complete your account setup:
                    </Text>

                    <Section
                        style={{
                            backgroundColor: "#f5f3ff",
                            borderRadius: "8px",
                            padding: "16px",
                            margin: "24px 0",
                            textAlign: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "36px",
                                fontWeight: "700",
                                letterSpacing: "6px",
                                color: "#6366f1",
                                margin: "0",
                            }}
                        >
                            {otp}
                        </Text>
                    </Section>

                    <Text
                        style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            textAlign: "center",
                            marginBottom: "16px",
                        }}
                    >
                        This code is valid for <strong>{expiryMinutes} minutes</strong>.
                    </Text>

                    <Text
                        style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            textAlign: "center",
                        }}
                    >
                        If you didn&apos;t create a Droply account, you can
                        safely ignore this email.
                    </Text>

                    <Hr
                        style={{
                            borderColor: "#e5e7eb",
                            margin: "24px 0 16px",
                        }}
                    />

                    <Text
                        style={{
                            fontSize: "12px",
                            color: "#9CA3AF",
                            textAlign: "center",
                            margin: "0",
                        }}
                    >
                        © {new Date().getFullYear()} Droply. All rights
                        reserved.
                    </Text>
                </Container>
            </Section>
        </Html>
    );
}
