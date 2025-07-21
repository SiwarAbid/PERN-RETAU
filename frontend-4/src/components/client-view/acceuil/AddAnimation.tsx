import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react"; // ou une autre icône que tu veux

interface Props {
  show: boolean;
}

const AddToCartAlert = ({ show }: Props) => {
    const [onClose, setOnClose] = useState(false)
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        setOnClose(true);
      }, 2000); // 2 secondes
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 flex items-center gap-2 p-3 rounded-xl text-white shadow-md transition-opacity duration-500 ${
        show ? "opacity-100 bg-green-600" : "opacity-0 pointer-events-none"
      }`}
    >
      <CheckCircle className="w-5 h-5" />
      <span>Produit ajouté au panier</span>
    </div>
  );
};

export default AddToCartAlert;
