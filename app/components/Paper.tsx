import React from 'react';

interface PaperProps {
  children?: React.ReactNode;
  elevation?: number;
  square?: boolean;
  variant?: 'elevation' | 'outlined';
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const Paper = ({
  children,
  elevation = 1,
  square = false,
  variant = 'elevation',
  style = {},
  className = '',
  onClick,
  ...rest
}: PaperProps) => {
  const getPaperStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderRadius: square ? '0' : '4px',
      padding: '16px',
      position: 'relative',
      ...style
    };

    if (variant === 'outlined') {
      styles.border = '1px solid rgba(0, 0, 0, 0.12)';
    } else {
      // Apply different shadow based on elevation
      switch (elevation) {
        case 0:
          styles.boxShadow = 'none';
          break;
        case 1:
          styles.boxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';
          break;
        case 2:
          styles.boxShadow = '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)';
          break;
        case 3:
          styles.boxShadow = '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)';
          break;
        case 4:
          styles.boxShadow = '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)';
          break;
        case 5:
          styles.boxShadow = '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)';
          break;
        default:
          styles.boxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';
      }
    }

    return styles;
  };

  return (
    <div
      className={`custom-paper ${className}`}
      style={getPaperStyles()}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Paper; 