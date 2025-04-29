import React from 'react';

interface AlertProps {
  children?: React.ReactNode;
  severity?: 'error' | 'warning' | 'info' | 'success';
  variant?: 'standard' | 'filled' | 'outlined';
  icon?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const Alert = ({
  children,
  severity = 'info',
  variant = 'standard',
  icon,
  onClose,
  style = {},
  className = '',
  ...rest
}: AlertProps) => {
  // Define colors for different severities
  const colors = {
    error: {
      light: '#ffebee',
      main: '#f44336',
      dark: '#c62828',
      contrastText: '#fff'
    },
    warning: {
      light: '#fff8e1',
      main: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff'
    },
    info: {
      light: '#e3f2fd',
      main: '#2196f3',
      dark: '#0d47a1',
      contrastText: '#fff'
    },
    success: {
      light: '#e8f5e9',
      main: '#4caf50',
      dark: '#2e7d32',
      contrastText: '#fff'
    }
  };

  // Choose appropriate icon based on severity if not provided
  const getDefaultIcon = () => {
    return (
      <div style={{
        display: 'flex',
        opacity: 0.9,
        padding: '7px 0',
        fontSize: '22px',
        marginRight: '12px',
        alignItems: 'center',
        color: colors[severity].main
      }}>
        {/* Simplified icon representation - in a real implementation you'd use actual icons */}
        {severity === 'success' && '✓'}
        {severity === 'info' && 'ℹ'}
        {severity === 'warning' && '⚠'}
        {severity === 'error' && '✖'}
      </div>
    );
  };

  const getAlertStyles = (): React.CSSProperties => {
    const color = colors[severity];
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      padding: '6px 16px',
      borderRadius: '4px',
      alignItems: 'center',
      ...style
    };

    // Apply styles based on variant
    switch (variant) {
      case 'filled':
        baseStyles.backgroundColor = color.main;
        baseStyles.color = color.contrastText;
        break;
      case 'outlined':
        baseStyles.color = color.main;
        baseStyles.border = `1px solid ${color.main}`;
        baseStyles.backgroundColor = 'transparent';
        break;
      case 'standard':
      default:
        baseStyles.backgroundColor = color.light;
        baseStyles.color = color.dark;
        break;
    }

    return baseStyles;
  };

  return (
    <div
      className={`custom-alert custom-alert-${severity} custom-alert-${variant} ${className}`}
      style={getAlertStyles()}
      role="alert"
      {...rest}
    >
      <div className="custom-alert-icon">
        {icon !== undefined ? icon : getDefaultIcon()}
      </div>
      <div className="custom-alert-message" style={{ padding: '8px 0', flex: 1 }}>
        {children}
      </div>
      {onClose && (
        <button
          className="custom-alert-close-button"
          onClick={onClose}
          style={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '4px',
            marginLeft: '8px'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert; 