export default function TermsPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <header className="surface px-6 py-6 sm:px-10">
          <p className="eyebrow">Legal Documents</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-forest/70">Last Updated: April 8, 2026</p>
        </header>

        {/* Company Info */}
        <section className="surface px-6 py-8 sm:px-10">
          <h2 className="text-2xl font-semibold text-forest mb-4">CREATIVE TECHNOLOGIES</h2>
          <div className="space-y-2 text-forest/75">
            <p><strong>Legal Name:</strong> PRANAV BHANDARI</p>
            <p><strong>GSTIN:</strong> 36IWUPB7980N1ZC</p>
            <p><strong>Category:</strong> Beauty & Personal Care</p>
            <p><strong>Location:</strong> Hyderabad, Telangana, India – 500027</p>
          </div>
        </section>

        {/* Content */}
        <div className="space-y-8">
          {[
            {
              number: "1",
              title: "Introduction",
              content: "These Terms and Conditions govern your use of the website, services, and digital content provided by CREATIVE TECHNOLOGIES. By accessing or purchasing from our Face Yoga platform, you agree to be legally bound by these Terms."
            },
            {
              number: "2",
              title: "Services Overview",
              content: "We provide digital Face Yoga content, including but not limited to: Video-based training programs, Guided routines and tutorials, Educational and wellness-related content. All services are delivered digitally through a user dashboard."
            },
            {
              number: "3",
              title: "Eligibility",
              content: "You must be at least 18 years old to use our services. By using this website, you confirm that all information provided is accurate."
            },
            {
              number: "4",
              title: "Account Registration",
              content: "Users are required to create an account after purchase. You are responsible for maintaining confidentiality of your login credentials. Any activity under your account is your responsibility. We reserve the right to suspend or terminate accounts in case of misuse."
            },
            {
              number: "5",
              title: "Payment Terms",
              content: "All prices are listed in applicable currency and may include GST as per Indian law. Payments are processed through secure third-party gateways. We do not store your sensitive financial data. Failure of payment may result in denial of access to services."
            },
            {
              number: "6",
              title: "No Refund Policy",
              content: "All purchases are final. No refunds, cancellations, or chargebacks will be entertained under any circumstances. Due to the digital nature of the content: Once access is granted, it cannot be revoked. Users are advised to review details before purchasing."
            },
            {
              number: "7",
              title: "Access to Content",
              content: "Users receive access to all available content after successful payment. Access is provided via dashboard login. Content availability may be updated, modified, or expanded over time. We do not guarantee lifetime availability unless explicitly stated."
            },
            {
              number: "8",
              title: "Intellectual Property",
              content: "All content on this platform, including: Videos, Text, Design, Branding is the exclusive property of CREATIVE TECHNOLOGIES.\n\nYou may NOT: Copy, distribute, or reproduce content, Share login credentials, Resell or redistribute content. Violation may result in legal action."
            },
            {
              number: "9",
              title: "User Conduct",
              content: "You agree NOT to: Misuse the platform, Attempt unauthorized access, Share or leak content, Use the service for illegal purposes. We reserve the right to terminate access without notice for violations."
            },
            {
              number: "10",
              title: "Health Disclaimer",
              content: "Face Yoga content is provided for informational and educational purposes only. We do not provide medical advice. Results may vary from person to person. Consult a professional before starting any facial or physical routine. You use the content at your own risk."
            },
            {
              number: "11",
              title: "Limitation of Liability",
              content: "We are not liable for: Any direct or indirect damages, Loss of data or access, Dissatisfaction with results. Use of the platform is at your sole discretion and risk."
            },
            {
              number: "12",
              title: "Third-Party Services",
              content: "We may use third-party tools for: Payments, Analytics, Communication (Email/WhatsApp). We are not responsible for their policies or performance."
            },
            {
              number: "13",
              title: "Communication Consent",
              content: "By using our services, you agree to receive: Emails, WhatsApp messages, Promotional and transactional notifications. You may opt out of marketing communication anytime."
            },
            {
              number: "14",
              title: "Termination",
              content: "We reserve the right to: Suspend or terminate access, Restrict usage, Remove accounts if any misuse or violation is detected."
            },
            {
              number: "15",
              title: "Force Majeure",
              content: "We are not responsible for delays or failure caused by events beyond our control, including: Natural disasters, Technical failures, Government actions."
            },
            {
              number: "16",
              title: "Governing Law",
              content: "These Terms are governed by the laws of India. Jurisdiction shall be exclusively in Hyderabad, Telangana."
            },
            {
              number: "17",
              title: "Modifications",
              content: "We reserve the right to update these Terms at any time. Continued use of the platform constitutes acceptance of updated Terms."
            },
            {
              number: "18",
              title: "Contact Information",
              content: "For any queries: CREATIVE TECHNOLOGIES, Legal Name: PRANAV BHANDARI, Hyderabad, Telangana, India – 500027"
            },
            {
              number: "19",
              title: "Acceptance of Terms",
              content: "By accessing or purchasing from our website, you confirm that you have read, understood, and agreed to these Terms and Conditions."
            }
          ].map((section) => (
            <section key={section.number} className="surface px-6 py-8 sm:px-10">
              <h2 className="text-2xl font-semibold text-forest mb-4">
                {section.number}. {section.title}
              </h2>
              <p className="text-forest/75 leading-7 whitespace-pre-wrap">{section.content}</p>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-t border-forest/10 pt-8 text-center text-sm text-forest/65">
          <p>&copy; 2026 CREATIVE TECHNOLOGIES. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
