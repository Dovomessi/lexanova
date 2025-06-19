
'use client';

import Link from 'next/link';

export default function CGUPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Conditions Générales d'Utilisation
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Les CGU sont incluses dans nos mentions légales pour une information complète.
        </p>
        <Link
          href="/mentions-legales"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90"
        >
          Consulter les mentions légales et CGU
        </Link>
      </div>
    </div>
  );
}
