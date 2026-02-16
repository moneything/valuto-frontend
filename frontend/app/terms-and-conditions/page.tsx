import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-valuto-green-700 hover:text-valuto-green-800"
          >
            ← Back to home
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm font-medium text-valuto-green-700 hover:text-valuto-green-800 underline"
          >
            Privacy Policy
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Effective date: February 16, 2026
          </p>

          <div className="space-y-6 text-gray-700 leading-7">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. Acceptance of terms
              </h2>
              <p>
                By using Valuto, you agree to these Terms and Conditions and our
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. Eligibility and accounts
              </h2>
              <p>
                You are responsible for providing accurate account details and for
                keeping your login credentials secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. Acceptable use
              </h2>
              <p>
                You agree not to misuse the platform, interfere with service operation,
                attempt unauthorized access, or submit harmful content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                4. Subscriptions and billing
              </h2>
              <p>
                Paid features require an active subscription. Billing is processed by
                Stripe and renewals/cancellations follow your Stripe subscription settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                5. Intellectual property
              </h2>
              <p>
                Platform content, branding, and materials are owned by Valuto or its
                licensors and may not be copied or redistributed without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                6. Service availability
              </h2>
              <p>
                We may update, suspend, or discontinue parts of the service at any time.
                We do not guarantee uninterrupted availability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                7. Limitation of liability
              </h2>
              <p>
                Valuto is an educational platform and does not provide regulated financial
                advice. Use of the service is at your own risk, to the fullest extent
                permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                8. Contact
              </h2>
              <p>
                For terms-related questions, contact{" "}
                <a
                  href="mailto:Jakebpb1@gmail.com"
                  className="text-valuto-green-700 hover:text-valuto-green-800 underline"
                >
                  Jakebpb1@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
