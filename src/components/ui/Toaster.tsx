import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToasterContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};

export const ToasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col space-y-2">
        {toasts.map((toast) => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary-500" />;
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-success-50 border-success-500';
      case 'error':
        return 'bg-error-50 border-error-500';
      case 'info':
        return 'bg-primary-50 border-primary-500';
    }
  };

  return (
    <div className={`rounded-lg p-4 shadow-md border-l-4 flex items-start max-w-sm animate-slide-up ${getBgColor()}`}>
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="flex-1 pr-2">
        <p className="text-gray-800 text-sm">{toast.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col space-y-2">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`rounded-lg p-4 shadow-md border-l-4 flex items-start max-w-sm animate-slide-up ${
            toast.type === 'success' ? 'bg-success-50 border-success-500' :
            toast.type === 'error' ? 'bg-error-50 border-error-500' :
            'bg-primary-50 border-primary-500'
          }`}
        >
          <div className="flex-shrink-0 mr-3">
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-success-500" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-error-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-primary-500" />}
          </div>
          <div className="flex-1 pr-2">
            <p className="text-gray-800 text-sm">{toast.message}</p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};