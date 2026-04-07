export default function RefundPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <header className="surface px-6 py-6 sm:px-10">
          <p className="eyebrow">Legal Documents</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Refund Policy
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
              title: "General Policy",
              content: "At CREATIVE TECHNOLOGIES, we strive to deliver high-quality digital content and services. Due to the intangible and non-returnable nature of digital products, all purchases made on our platform are final and non-refundable."
            },
            {
              number: "2",
              title: "No Refund / No Cancellation",
              items: [
                "Once a purchase is completed, no refunds, cancellations, or reversals will be processed",
                "This applies to all plans, offers, and promotional pricing",
                "Access to content is granted immediately after payment, making the product non-returnable"
              ]
            },
            {
              number: "3",
              title: "Exception (Limited Cases Only)",
              content: "Refunds may be considered only under the following strict conditions:\n\n• Duplicate payment made for the same order\n• Payment deducted but access not provided within a reasonable time (24–48 hours)\n• Technical error from our system resulting in failed service delivery\n\nIn such cases:\n• Users must contact us within 48 hours of the transaction\n• Valid proof of payment must be provided\n• After verification, refunds (if approved) will be processed within 7–10 business days"
            },
            {
              number: "4",
              title: "Non-Refundable Situations",
              content: "Refunds will NOT be provided for:\n\n• Change of mind after purchase\n• Lack of usage or inactivity\n• Dissatisfaction with results or expectations\n• Failure to understand product/service before purchase\n• Incorrect email/phone entered during checkout\n• Account sharing or misuse\n• Delayed response from user side"
            },
            {
              number: "5",
              title: "Chargeback & Dispute Policy",
              content: "Initiating a chargeback without contacting support is considered a violation of these Terms. We reserve the right to:\n\n• Suspend or permanently ban your account\n• Deny future access to services\n• Submit transaction evidence to payment providers\n\nLegal action may be taken in cases of fraudulent disputes."
            },
            {
              number: "6",
              title: "Service Delivery",
              content: "• Access details are shared via email and/or WhatsApp after successful payment\n• Users are responsible for entering correct contact details\n• Any delay caused due to incorrect information provided by the user is not eligible for refund"
            },
            {
              number: "7",
              title: "Contact for Support",
              content: "For refund-related queries (only eligible cases):\n\nCREATIVE TECHNOLOGIES\nLegal Name: PRANAV BHANDARI\nLocation: Hyderabad, Telangana, India – 500027"
            },
            {
              number: "8",
              title: "Policy Acceptance",
              content: "By purchasing from our website, you acknowledge that you have read, understood, and agreed to this Refund Policy."
            }
          ].map((section) => (
            <section key={section.number} className="surface px-6 py-8 sm:px-10">
              <h2 className="text-2xl font-semibold text-forest mb-4">
                {section.number}. {section.title}
              </h2>
              {section.content && (
                <p className="text-forest/75 leading-7 whitespace-pre-wrap">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-2 text-forest/75">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-ember">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
