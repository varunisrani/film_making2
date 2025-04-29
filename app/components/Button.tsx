import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  variant = 'text',
  color = 'primary',
  size = 'medium',
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  onClick,
  style = {},
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) => {
  // Define base colors
  const colors = {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
      border: '#1976d2',
      hover: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      contrastText: '#fff',
      border: '#9c27b0',
      hover: '#7b1fa2',
    },
    error: {
      main: '#d32f2f',
      contrastText: '#fff',
      border: '#d32f2f',
      hover: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      contrastText: '#fff',
      border: '#ed6c02',
      hover: '#e65100',
    },
    info: {
      main: '#0288d1',
      contrastText: '#fff',
      border: '#0288d1',
      hover: '#01579b',
    },
    success: {
      main: '#2e7d32',
      contrastText: '#fff',
      border: '#2e7d32',
      hover: '#1b5e20',
    },
    inherit: {
      main: 'inherit',
      contrastText: 'inherit',
      border: 'currentColor',
      hover: 'rgba(0, 0, 0, 0.04)',
    },
  };

  const selectedColor = colors[color];

  const getButtonStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: size === 'small' ? '0.8125rem' : size === 'large' ? '0.9375rem' : '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
      minWidth: '64px',
      padding: size === 'small' ? '4px 10px' : size === 'large' ? '8px 22px' : '6px 16px',
      borderRadius: '4px',
      border: '1px solid transparent',
      cursor: disabled ? 'default' : 'pointer',
      userSelect: 'none',
      verticalAlign: 'middle',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxSizing: 'border-box',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.5 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      ...style
    };

    // Apply styles based on variant
    switch (variant) {
      case 'contained':
        baseStyles.backgroundColor = selectedColor.main;
        baseStyles.color = selectedColor.contrastText;
        baseStyles.boxShadow = '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)';
        baseStyles.border = '1px solid transparent';
        break;
      case 'outlined':
        baseStyles.backgroundColor = 'transparent';
        baseStyles.color = selectedColor.main;
        baseStyles.border = `1px solid ${selectedColor.border}`;
        break;
      case 'text':
      default:
        baseStyles.backgroundColor = 'transparent';
        baseStyles.color = selectedColor.main;
        baseStyles.border = '1px solid transparent';
        break;
    }

    return baseStyles;
  };

  return (
    <button
      type={type}
      className={`custom-button custom-button-${variant} custom-button-${color} ${className}`}
      style={getButtonStyles()}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {startIcon && <span className="button-start-icon" style={{ marginRight: '8px', display: 'inherit' }}>{startIcon}</span>}
      {children}
      {endIcon && <span className="button-end-icon" style={{ marginLeft: '8px', display: 'inherit' }}>{endIcon}</span>}
    </button>
  );
};

export default Button; 