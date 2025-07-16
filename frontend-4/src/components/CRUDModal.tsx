import React, { useState, useEffect } from 'react';
import { Save, Loader } from 'lucide-react';
import Modal from './Modal';
import FormField from './FormField';

interface FormFieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'textarea' | 'select' | 'date' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: { value: string | boolean; label: string }[];
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormFieldConfig[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CrudModal: React.FC<CrudModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  initialData = {},
  onSubmit,
  size = 'lg'
}) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // console.log("formData CRUDModal ; ", formData)
  useEffect(() => {
    if (isOpen) {
      // Initialize form data
      const initData: Record<string, unknown> = {};
      // console.log('initData ; ', initData);
      fields.forEach(field => {
        initData[field.name] = initialData[field.name] || (field.type === 'number' ? 0 : '');
      });
      setFormData(initData);
      setErrors({});
    }
  }, [isOpen]); // <-- Correction ici

  const handleFieldChange = (name: string, value: string | number | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} est requis`;
      }

      // Email validation
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(formData[field.name]))) {
          newErrors[field.name] = 'Format d\'email invalide';
        }
      }

      // Phone validation
      if (field.type === 'tel' && formData[field.name]) {
        const phoneRegex = /^[0-9\s\-+()]+$/;
        if (!phoneRegex.test(String(formData[field.name]))) {
          newErrors[field.name] = 'Format de téléphone invalide';
        }
      }

      // Number validation
      if (
        field.type === 'number' &&
        field.min !== undefined &&
        formData[field.name] !== '' &&
        !isNaN(Number(formData[field.name])) &&
        Number(formData[field.name]) < field.min
      ) {
        newErrors[field.name] = `La valeur doit être supérieure à ${field.min}`;
      }
      
      // File validation

      // if (field.type === 'file' && formData[field.name]) {
      //   const file = formData[field.name] as File;
      //   if (file) setFormData(prev => ({ ...prev, [field.name]: file }));
      // } 
      // else newErrors[field.name] = 'Veuillez sélectionner une image';
    });

    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} size={size}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <FormField
                {...field}
                value={
                  field.type != 'number'
                    ?String(formData[field.name] ?? '')
                    :Number(formData[field.name] ?? 0 )
                }
                onChange={handleFieldChange}
                error={errors[field.name]}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50"
            style={{ backgroundColor: loading ? '#FFB84D' : '#FF8C42' }}
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={16} />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CrudModal;