import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            href="/terms-and-conditions"
            className="text-sm font-medium text-valuto-green-700 hover:text-valuto-green-800 underline"
          >
            Terms and Conditions
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Effective date: February 16, 2026
          </p>

          <div className="space-y-6 text-gray-700 leading-7">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. What we collect
              </h2>
              <p>
                We collect account details (name, email), profile information you provide,
                and learning activity data (progress, quiz results, time spent) so we can
                run the platform and show your progress.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. How we use your data
              </h2>
              <p>
                We use your data to authenticate your account, deliver learning content,
                track progress, improve product performance, and provide support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. Payments
              </h2>
              <p>
                Subscription payments are processed by Stripe. We do not store full card
                details on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                4. Sharing data
              </h2>
              <p>
                We do not sell your personal data. We only share data with service providers
                required to operate the product, such as authentication, hosting, and billing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                5. Data retention
              </h2>
              <p>
                We keep account and learning records while your account is active. When an
                account is deleted/deactivated, data is retained only as needed for legal,
                security, and operational requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                6. Your rights
              </h2>
              <p>
                You can request access, correction, or deletion of your personal data by
                contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                7. Contact
              </h2>
              <p>
                For privacy questions, contact{" "}
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
