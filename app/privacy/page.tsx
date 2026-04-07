export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <header className="surface px-6 py-6 sm:px-10">
          <p className="eyebrow">Legal Documents</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Privacy Policy
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
              content: "This Privacy Policy describes how CREATIVE TECHNOLOGIES collects, uses, stores, and protects your information when you access our Face Yoga website, services, and digital platform. By using our website, you agree to the terms of this Privacy Policy."
            },
            {
              number: "2",
              title: "Information We Collect",
              subsections: [
                {
                  subtitle: "Personal Information",
                  items: [
                    "Full Name",
                    "Email Address",
                    "Phone Number (including WhatsApp)",
                    "Payment Details (processed via secure third-party gateways)",
                    "Login credentials (email & password)"
                  ]
                },
                {
                  subtitle: "Non-Personal Information",
                  items: [
                    "IP Address",
                    "Device type and browser",
                    "Usage behavior (pages visited, time spent, clicks)",
                    "Cookies and tracking data"
                  ]
                }
              ]
            },
            {
              number: "3",
              title: "How We Collect Information",
              content: "We collect data through: Quiz forms and landing pages, Email capture popups, Payment checkout forms, Account registration process, Cookies and analytics tools"
            },
            {
              number: "4",
              title: "Purpose of Data Collection",
              content: "We use your data for: Providing access to Face Yoga video content, Processing payments and transactions, Creating and managing user accounts, Sending login credentials and dashboard access, Sharing updates via email and WhatsApp, Improving website performance and user experience, Marketing and promotional communication"
            },
            {
              number: "5",
              title: "Payment Information",
              content: "All payments are processed securely through third-party payment gateways. We do not store your card or sensitive financial details on our servers. GST invoices may be generated as per applicable Indian tax laws."
            },
            {
              number: "6",
              title: "Data Sharing & Disclosure",
              content: "We do not sell your personal data. We may share data only with: Payment gateway providers, Email/WhatsApp communication services, Analytics tools (for performance tracking), Legal authorities if required by law"
            },
            {
              number: "7",
              title: "Data Storage & Security",
              content: "We implement strong security measures including: Encrypted data transmission (SSL), Secure servers and restricted access, Authentication systems for user accounts. However, no system is 100% secure, and users share information at their own risk."
            },
            {
              number: "8",
              title: "Cookies Policy",
              content: "Our website uses cookies to: Enhance user experience, Track conversions and analytics, Improve marketing performance. You can disable cookies through your browser settings."
            },
            {
              number: "9",
              title: "User Rights",
              content: "You have the right to: Access your personal data, Request correction of incorrect information, Request deletion of your data, Opt out of marketing communications. To exercise these rights, contact us via email."
            },
            {
              number: "10",
              title: "Account & Login",
              content: "After purchase: Users create login credentials, Access is provided via dashboard, Login details are shared via email and/or WhatsApp. Users are responsible for maintaining confidentiality of their login credentials."
            },
            {
              number: "11",
              title: "Data Retention",
              content: "We retain your data: As long as your account is active, As required for legal, tax, or compliance purposes"
            },
            {
              number: "12",
              title: "Third-Party Links",
              content: "Our website may contain links to third-party websites. We are not responsible for their privacy practices."
            },
            {
              number: "13",
              title: "Children's Privacy",
              content: "Our services are not intended for individuals under 18 years of age. We do not knowingly collect data from minors."
            },
            {
              number: "14",
              title: "Policy Updates",
              content: "We may update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date."
            },
            {
              number: "15",
              title: "Contact Information",
              content: "For any privacy-related concerns, contact: CREATIVE TECHNOLOGIES, Legal Name: PRANAV BHANDARI, Address: Hyderabad, Telangana, India – 500027"
            },
            {
              number: "16",
              title: "Consent",
              content: "By using our website, you consent to this Privacy Policy and agree to its terms."
            }
          ].map((section) => (
            <section key={section.number} className="surface px-6 py-8 sm:px-10">
              <h2 className="text-2xl font-semibold text-forest mb-4">
                {section.number}. {section.title}
              </h2>
              {section.content && (
                <p className="text-forest/75 leading-7 whitespace-pre-wrap">{section.content}</p>
              )}
              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((subsection, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-forest mb-3">{subsection.subtitle}</h3>
                      <ul className="space-y-2 text-forest/75 ml-4">
                        {subsection.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex gap-3">
                            <span className="text-ember">-</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
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
