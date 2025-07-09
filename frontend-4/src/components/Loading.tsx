import React from 'react';
import { RefreshCw, AlertCircle, Database, Wifi } from 'lucide-react';

interface DataLoadingStateProps {
  isLoading: boolean;
  hasError: boolean;
  isEmpty: boolean;
  onRetry?: () => void;
  retryCount?: number;
  maxRetries?: number;
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  className?: string;
}

const DataLoadingState: React.FC<DataLoadingStateProps> = ({
  isLoading,
  hasError,
  isEmpty,
  onRetry,
  retryCount = 0,
  maxRetries = 3,
  loadingMessage = "Chargement des données...",
  errorMessage = "Erreur lors du chargement des données",
  emptyMessage = "Aucune donnée disponible",
  className = ""
}) => {
  if (isLoading) {
    return (
      <div className={`data-loading-container ${className}`}>
        <div className="data-loading-content">
          <div className="loading-spinner-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
          </div>
          
          <div className="loading-text">
            <h3 className="loading-title">{loadingMessage}</h3>
            <p className="loading-subtitle">Veuillez patienter...</p>
          </div>

          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`data-error-container ${className}`}>
        <div className="data-error-content">
          <div className="error-icon">
            <AlertCircle className="icon-xl" />
          </div>
          
          <div className="error-text">
            <h3 className="error-title">{errorMessage}</h3>
            <p className="error-subtitle">
              Une erreur s'est produite lors du chargement. 
              {retryCount > 0 && ` Tentative ${retryCount}/${maxRetries}`}
            </p>
          </div>

          {onRetry && retryCount < maxRetries && (
            <button onClick={onRetry} className="retry-btn">
              <RefreshCw className="btn-icon" />
              <span>Réessayer</span>
            </button>
          )}

          {retryCount >= maxRetries && (
            <div className="max-retry-message">
              <Wifi className="icon" />
              <span>Vérifiez votre connexion internet</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`data-empty-container ${className}`}>
        <div className="data-empty-content">
          <div className="empty-icon">
            <Database className="icon-xl" />
          </div>
          
          <div className="empty-text">
            <h3 className="empty-title">{emptyMessage}</h3>
            <p className="empty-subtitle">
              Il n'y a actuellement aucune donnée à afficher.
            </p>
          </div>

          {onRetry && (
            <button onClick={onRetry} className="refresh-btn">
              <RefreshCw className="btn-icon" />
              <span>Actualiser</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default DataLoadingState;