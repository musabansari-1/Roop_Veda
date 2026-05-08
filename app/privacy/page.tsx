import {
  ThemeCard,
  ThemePageShell
} from "@/components/marketing/theme-page-shell";

const sections = [
  {
    number: "1",
    title: "Introduction",
    content:
      "This Privacy Policy describes how Creative Technologies collects, uses, stores, and protects your information when you access our Face Yoga website, services, and digital platform."
  },
  {
    number: "2",
    title: "Information We Collect",
    content:
      "We may collect personal information like name, email, phone number, payment details handled by secure providers, login credentials, and non-personal information like IP address, device type, browser, usage behavior, cookies, and tracking data."
  },
  {
    number: "3",
    title: "How We Collect Information",
    content:
      "We collect data through quiz forms, landing pages, email capture forms, payment checkout, account registration, cookies, and analytics tools."
  },
  {
    number: "4",
    title: "Purpose of Data Collection",
    content:
      "We use your data to provide access to content, process payments, manage accounts, send access details, share updates through email or WhatsApp, improve performance, and support marketing communication."
  },
  {
    number: "5",
    title: "Data Sharing & Security",
    content:
      "We do not sell your personal data. We may share information only with payment providers, communication tools, analytics providers, or authorities when required by law. We use encrypted transmission and restricted-access systems to help protect your data."
  },
  {
    number: "6",
    title: "User Rights",
    content:
      "You may request access, correction, deletion, or opt out of marketing communication by contacting us via email."
  },
  {
    number: "7",
    title: "Policy Updates",
    content:
      "We may update this policy from time to time. Changes will be reflected on this page with an updated effective date."
  }
];

export default function PrivacyPage() {
  return (
    <ThemePageShell
      eyebrow="Legal Documents"
      title="Privacy Policy"
      subtitle="Last updated April 8, 2026."
    >
      {/* <ThemeCard title="Company Information" accent="pink">
        <div className="space-y-2 leading-8 text-[#5a4a6a]">
          <p>
            <span className="font-semibold text-[#2d1b35]">Legal Name:</span>{" "}
            Pranav Bhandari
          </p>
          <p>
            <span className="font-semibold text-[#2d1b35]">GSTIN:</span>{" "}
            36IWUPB7980N1ZC
          </p>
          <p>
            <span className="font-semibold text-[#2d1b35]">Category:</span>{" "}
            Beauty &amp; Personal Care
          </p>
          <p>
            <span className="font-semibold text-[#2d1b35]">Location:</span>{" "}
            Hyderabad, Telangana, India - 500027
          </p>
        </div>
      </ThemeCard> */}

      <ThemeCard title="Company Information" accent="pink">
  <div className="space-y-2 leading-8 text-[#5a4a6a]">
    <p>
      <span className="font-semibold text-[#2d1b35]">Legal Name:</span>{" "}
      Pranav Bhandari
    </p>
    <p>
      <span className="font-semibold text-[#2d1b35]">GSTIN:</span>{" "}
      36IWUPB7980N1ZC
    </p>
    <p>
      <span className="font-semibold text-[#2d1b35]">Category:</span>{" "}
      Beauty &amp; Personal Care
    </p>
    <p>
      <span className="font-semibold text-[#2d1b35]">Registered Address:</span>{" "}
      3-4-526/3, Flat No. 503, Doctor Residency, Barkatpura, Narayanguda,
      Near Bank of Baroda, Hyderabad, Telangana - 500027, India
    </p>
  </div>
</ThemeCard>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <ThemeCard
            key={section.number}
            title={`${section.number}. ${section.title}`}
            accent={index % 2 === 0 ? "white" : "soft"}
          >
            <p className="leading-8 text-[#5a4a6a]">{section.content}</p>
          </ThemeCard>
        ))}
      </div>
    </ThemePageShell>
  );
}
