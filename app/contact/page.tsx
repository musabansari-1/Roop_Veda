import Link from "next/link";
import { AlertCircle, Clock, Mail, MapPin } from "lucide-react";

import {
  ThemeCard,
  ThemePageShell
} from "@/components/marketing/theme-page-shell";

const faqs = [
  {
    question: "How do I get access after purchase?",
    answer:
      "After successful payment, access details are shared via email and/or WhatsApp within 24 to 48 hours."
  },
  {
    question: "Can I get a refund?",
    answer:
      "Due to the digital nature of our content, all purchases are final and non-refundable except in limited technical or duplicate-payment cases."
  },
  {
    question: "What if I have issues accessing my account?",
    answer:
      "Reach out with your registered email and transaction details, and our support team will assist you."
  }
];

export default function ContactPage() {
  return (
    <ThemePageShell
      eyebrow="Get In Touch"
      title="Contact Us"
      subtitle="We’re here to help and answer any question you might have."
    >
      <ThemeCard title="Business Details">
  <div className="space-y-4 text-[#5a4a6a]">
    <p>
      <span className="font-semibold text-[#2d1b35]">Company Name:</span>{" "}
      Creative Technlogies
    </p>
    <p>
      <span className="font-semibold text-[#2d1b35]">Legal Name:</span>{" "}
      Pranav Bhandari
    </p>
    <p>
      <span className="font-semibold text-[#2d1b35]">GSTIN:</span>{" "}
      36IWUPB7980N1ZC
    </p>

    <div className="flex gap-4 pt-2">
      <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#e91e8c]" />
      <div className="space-y-1 leading-7">
        <p className="font-semibold text-[#2d1b35]">Registered Address</p>
        <p>3-4-526/3, Flat No. 503</p>
        <p>Doctor Residency</p>
        <p>Barkatpura, Narayanguda</p>
        <p>Near Bank of Baroda</p>
        <p>Hyderabad, Telangana 500027</p>
        <p>India</p>
      </div>
    </div>
  </div>
</ThemeCard>
          

      <div className="grid gap-8 lg:grid-cols-2">
        <ThemeCard title="Email Support" accent="pink">
          <div className="flex gap-4">
            <Mail className="mt-1 h-6 w-6 shrink-0 text-[#e91e8c]" />
            <div className="space-y-4">
              <p className="leading-8 text-[#5a4a6a]">
                Have questions or need assistance? Reach out to us via email.
              </p>
              <a
                href="mailto:Ameerlunera@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#e91e8c] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(233,30,140,0.22)] transition hover:bg-[#c4177a]"
              >
                <Mail className="h-4 w-4" />
                Ameerlunera@gmail.com
              </a>
            </div>
          </div>
        </ThemeCard>

        <ThemeCard title="Support Hours" accent="soft">
          <div className="flex gap-4">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-[#e91e8c]" />
            <div className="w-full space-y-3 text-[#5a4a6a]">
              <p className="flex justify-between gap-4">
                <span>Monday to Saturday</span>
                <span className="font-semibold text-[#2d1b35]">
                  10:00 AM - 7:00 PM IST
                </span>
              </p>
              <p className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="font-semibold text-[#2d1b35]">Closed</span>
              </p>
            </div>
          </div>
        </ThemeCard>
      </div>

      <ThemeCard title="Response Time">
        <div className="space-y-3 text-[#5a4a6a]">
          <p>Emails are typically answered within 24 to 48 business hours.</p>
          <p>Response time may vary during high-volume periods.</p>
        </div>
      </ThemeCard>

      <ThemeCard title="Important Note" accent="pink">
        <div className="flex gap-4">
          <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-[#e91e8c]" />
          <div className="space-y-3 text-[#5a4a6a]">
            <p>Please provide correct details for faster resolution.</p>
            <p>
              For order-related queries, include your registered email and
              transaction details.
            </p>
          </div>
        </div>
      </ThemeCard>

      <ThemeCard title="Common Questions" accent="soft">
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-[#f8b4d4] pb-6 last:border-b-0 last:pb-0">
              <h3 className="mb-2 text-lg font-semibold text-[#2d1b35]">
                {faq.question}
              </h3>
              <p className="leading-7 text-[#5a4a6a]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </ThemeCard>

      <ThemeCard title="Ready to Get Started?" accent="soft">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="max-w-2xl leading-8 text-[#5a4a6a]">
            Have all your questions answered? Begin your face yoga journey with
            our personalized quiz.
          </p>
          <Link
            href="/quiz"
            className="rounded-full bg-[#e91e8c] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(233,30,140,0.22)] transition hover:bg-[#c4177a]"
          >
            Start Quiz
          </Link>
        </div>
      </ThemeCard>
    </ThemePageShell>
  );
}
