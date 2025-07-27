import React from 'react'
import { CreditCard } from 'lucide-react'
import { EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { EmbeddedCheckout } from '@stripe/react-stripe-js'
import type { Stripe } from '@stripe/stripe-js'

interface PaymentFormProps {
    clientSecret?: string;
    stripePromise: Promise<Stripe>;
}
const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret, stripePromise }) => {
  return (
        <div className="mt-4">
            <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Détails de la carte
            </h4>
            <div className="space-y-2">
            {clientSecret ? (
                // Si le clientSecret est disponible, afficher le formulaire de paiement embarqué
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
                ) : (
                // Afficher un indicateur de chargement pendant la récupération du clientSecret
                <div className="text-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Chargement du paiement...</p>
                </div>
            )}
            </div>
        </div>
  )
}

export default PaymentForm