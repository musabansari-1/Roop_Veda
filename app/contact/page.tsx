import Link from "next/link";
import { Mail, MapPin, Clock, AlertCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        {/* Header */}
        <header className="surface px-6 py-6 sm:px-10">
          <p className="eyebrow">Get In Touch</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-forest/70">We're here to help and answer any question you might have.</p>
        </header>

        {/* Company Info */}
        <section className="surface px-6 py-8 sm:px-10">
          <h2 className="text-2xl font-semibold text-forest mb-6">Business Details</h2>
          <div className="space-y-4 text-forest/75">
            <div className="flex gap-4">
              <div className="font-semibold text-forest min-w-fit">Company Name:</div>
              <div>CREATIVE TECHNOLOGIES</div>
            </div>
            <div className="flex gap-4">
              <div className="font-semibold text-forest min-w-fit">Legal Name:</div>
              <div>PRANAV BHANDARI</div>
            </div>
            <div className="flex gap-4">
              <div className="font-semibold text-forest min-w-fit">GSTIN:</div>
              <div>36IWUPB7980N1ZC</div>
            </div>
            <div className="flex gap-4 items-start">
              <MapPin className="h-5 w-5 text-ember mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-forest mb-2">Registered Address:</p>
                <p>Building No./Flat No.: 3-4-526/3</p>
                <p>Name Of Premises/Building: Doctor Residency</p>
                <p>Road/Street: Barkatpura Narayanguda</p>
                <p>Nearby Landmark: Bank Of Baroda</p>
                <p>Locality/Sub Locality: Barkatpura</p>
                <p>City/Town/Village: Hyderabad</p>
                <p>District: Hyderabad</p>
                <p>State: Telangana</p>
                <p>PIN Code: 500027</p>
                <p>Country: India</p>
              </div>
            </div>
          </div>
        </section>

        {/* Email Support */}
        <section className="surface bg-gradient-to-br from-ember/5 to-amber-100/20 px-6 py-8 sm:px-10">
          <div className="flex gap-4 items-start">
            <Mail className="h-6 w-6 text-ember mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-forest mb-3">Email Support</h3>
              <p className="text-forest/75 mb-4">Have questions or need assistance? Reach out to us via email.</p>
              <a
                href="mailto:Ameerlunera@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-white font-semibold shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
              >
                <Mail className="h-4 w-4" />
                Ameerlunera@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* Support Hours */}
        <section className="surface px-6 py-8 sm:px-10">
          <div className="flex gap-4 items-start mb-6">
            <Clock className="h-6 w-6 text-ember mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-forest mb-4">Support Hours</h3>
              <div className="space-y-3 text-forest/75">
                <p className="flex justify-between">
                  <span>Monday to Saturday:</span>
                  <span className="font-semibold text-forest">10:00 AM – 7:00 PM IST</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold text-forest">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="surface px-6 py-8 sm:px-10">
          <h3 className="text-2xl font-semibold text-forest mb-4">Response Time</h3>
          <div className="space-y-3 text-forest/75">
            <p className="flex items-start gap-3">
              <span className="text-ember font-bold mt-1">→</span>
              <span>Emails are typically responded to within <strong className="text-forest">24–48 business hours</strong></span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-ember font-bold mt-1">→</span>
              <span>Response time may vary during high volume periods</span>
            </p>
          </div>
        </section>

        {/* Important Note */}
        <section className="surface px-6 py-8 sm:px-10 border border-amber-200 bg-amber-50">
          <div className="flex gap-4 items-start">
            <AlertCircle className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold text-amber-900 mb-3">Important Note</h4>
              <ul className="space-y-2 text-amber-900/75">
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Please ensure you provide correct details while contacting us for faster resolution</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>For order-related queries, include your registered email and transaction details</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="surface px-6 py-8 sm:px-10">
          <h3 className="text-2xl font-semibold text-forest mb-6">Common Questions</h3>
          <div className="space-y-6">
            {[
              {
                question: "How do I get access after purchase?",
                answer: "After successful payment, access details are shared via email and/or WhatsApp within 24-48 hours. You'll receive your login credentials and can immediately access all video content through your dashboard."
              },
              {
                question: "Can I get a refund?",
                answer: "Due to the digital nature of our content, all purchases are final and non-refundable. However, refunds may be considered in limited cases such as duplicate payments or technical errors. Please contact us within 48 hours if you believe you qualify."
              },
              {
                question: "What if I have issues accessing my account?",
                answer: "If you're experiencing access issues, please reach out to us via email with your registered email address and transaction details. Our support team will assist you within 24-48 hours."
              },
              {
                question: "Can I share my login with others?",
                answer: "No, sharing login credentials is prohibited and violates our Terms & Conditions. Each account is meant for individual use only. Sharing may result in account suspension."
              },
              {
                question: "Do you offer customer support on weekends?",
                answer: "We're available Monday to Saturday from 10:00 AM to 7:00 PM IST. We are closed on Sundays. For inquiries received on Sunday, we'll respond on the next business day."
              }
            ].map((faq, idx) => (
              <div key={idx} className="pb-6 border-b border-forest/10 last:border-b-0 last:pb-0">
                <h4 className="text-lg font-semibold text-forest mb-2">{faq.question}</h4>
                <p className="text-forest/75 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="surface bg-hero-radial px-6 py-10 sm:px-10">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="font-display text-3xl leading-tight text-forest">
              Ready to Get Started?
            </h2>
            <p className="max-w-2xl text-forest/75">
              Have all your questions answered? Begin your face yoga journey with our personalized quiz.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forest text-white font-semibold shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
            >
              Start Quiz
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-forest/10 pt-8 text-center text-sm text-forest/65">
          <p>&copy; 2026 CREATIVE TECHNOLOGIES. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
