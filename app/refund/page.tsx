import {
  ThemeCard,
  ThemePageShell
} from "@/components/marketing/theme-page-shell";

const sections = [
  {
    number: "1",
    title: "General Policy",
    content:
      "Due to the intangible and non-returnable nature of digital products, all purchases made on our platform are final and non-refundable."
  },
  {
    number: "2",
    title: "No Refund / No Cancellation",
    content:
      "Once a purchase is completed, no refunds, cancellations, or reversals will be processed. This applies to all plans, offers, and promotional pricing."
  },
  {
    number: "3",
    title: "Limited Exceptions",
    content:
      "Refunds may be considered only in duplicate-payment cases, access not being provided within a reasonable time, or technical errors from our system affecting delivery."
  },
  {
    number: "4",
    title: "Non-Refundable Situations",
    content:
      "Refunds are not provided for change of mind, lack of usage, dissatisfaction with results, incorrect details entered during checkout, account sharing, misuse, or delayed user response."
  },
  {
    number: "5",
    title: "Chargeback & Dispute Policy",
    content:
      "Initiating a chargeback without contacting support is considered a violation of our terms and may lead to suspended access or further action."
  },
  {
    number: "6",
    title: "Support Contact",
    content:
      "For eligible refund-related queries, please contact Creative Technologies with valid proof of payment and transaction details."
  }
];

export default function RefundPage() {
  return (
    <ThemePageShell
      eyebrow="Legal Documents"
      title="Refund Policy"
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
