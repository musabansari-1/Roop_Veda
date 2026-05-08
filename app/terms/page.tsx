import {
  ThemeCard,
  ThemePageShell
} from "@/components/marketing/theme-page-shell";

const sections = [
  {
    number: "1",
    title: "Introduction",
    content:
      "These Terms and Conditions govern your use of the website, services, and digital content provided by Creative Technologies."
  },
  {
    number: "2",
    title: "Services Overview",
    content:
      "We provide digital Face Yoga content, including video-based training programs, guided routines, tutorials, and educational wellness content delivered digitally."
  },
  {
    number: "3",
    title: "Eligibility",
    content:
      "You must be at least 18 years old to use our services and confirm that all information provided is accurate."
  },
  {
    number: "4",
    title: "Account Registration",
    content:
      "Users are required to create an account after purchase and are responsible for maintaining confidentiality of login credentials."
  },
  {
    number: "5",
    title: "Payment Terms",
    content:
      "All prices are listed in applicable currency and may include GST. Payments are processed through secure third-party gateways."
  },
  {
    number: "6",
    title: "Refund Policy",
    content:
      "All purchases are final. Due to the digital nature of the content, refunds, cancellations, or chargebacks are not entertained except in limited technical or duplicate-payment cases."
  },
  {
    number: "7",
    title: "Health Disclaimer",
    content:
      "Face Yoga content is provided for informational and educational purposes only. We do not provide medical advice, and results may vary from person to person."
  },
  {
    number: "8",
    title: "Governing Law",
    content:
      "These Terms are governed by the laws of India, with jurisdiction in Hyderabad, Telangana."
  }
];

export default function TermsPage() {
  return (
    <ThemePageShell
      eyebrow="Legal Documents"
      title="Terms & Conditions"
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
            <p className="whitespace-pre-wrap leading-8 text-[#5a4a6a]">
              {section.content}
            </p>
          </ThemeCard>
        ))}
      </div>
    </ThemePageShell>
  );
}
