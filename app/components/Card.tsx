import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  variant?: 'elevation' | 'outlined';
  raised?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const Card = ({
  children,
  variant = 'elevation',
  raised = false,
  style = {},
  className = '',
  onClick,
  ...rest
}: CardProps) => {
  const getCardStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderRadius: '4px',
      position: 'relative',
      overflow: 'hidden',
      ...style
    };

    if (variant === 'outlined') {
      styles.border = '1px solid rgba(0, 0, 0, 0.12)';
    } else {
      // Apply shadow based on raised prop
      if (raised) {
        styles.boxShadow = '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)';
      } else {
        styles.boxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';
      }
    }

    return styles;
  };

  return (
    <div
      className={`custom-card ${className}`}
      style={getCardStyles()}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

// Also create CardContent component
export const CardContent = ({ 
  children, 
  style = {}, 
  className = '',
  ...rest 
}: { 
  children?: React.ReactNode, 
  style?: React.CSSProperties, 
  className?: string 
}) => {
  const cardContentStyles: React.CSSProperties = {
    padding: '16px',
    ...style
  };

  return (
    <div 
      className={`custom-card-content ${className}`} 
      style={cardContentStyles}
      {...rest}
    >
      {children}
    </div>
  );
};

// CardHeader component
export interface CardHeaderProps {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const CardHeader = ({
  title,
  subheader,
  avatar,
  action,
  style = {},
  className = '',
  ...rest
}: CardHeaderProps) => {
  const cardHeaderStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    ...style
  };

  const contentStyles: React.CSSProperties = {
    flex: '1 1 auto'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    margin: 0
  };

  const subheaderStyles: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.6)',
    lineHeight: 1.43,
    marginTop: '4px'
  };

  return (
    <div 
      className={`custom-card-header ${className}`} 
      style={cardHeaderStyles}
      {...rest}
    >
      {avatar && (
        <div className="custom-card-header-avatar" style={{ marginRight: '16px' }}>
          {avatar}
        </div>
      )}
      
      <div className="custom-card-header-content" style={contentStyles}>
        {title && (
          <div className="custom-card-header-title" style={titleStyles}>
            {title}
          </div>
        )}
        {subheader && (
          <div className="custom-card-header-subheader" style={subheaderStyles}>
            {subheader}
          </div>
        )}
      </div>
      
      {action && (
        <div className="custom-card-header-action">
          {action}
        </div>
      )}
    </div>
  );
}; 