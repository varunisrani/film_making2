import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fixed?: boolean;
  disableGutters?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const maxWidthValues = {
  xs: '444px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  fixed = false,
  disableGutters = false,
  className = '',
  style = {},
  ...props
}) => {
  const containerStyles: React.CSSProperties = {
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: disableGutters ? 0 : '16px',
    paddingRight: disableGutters ? 0 : '16px',
    ...style
  };

  // Add max-width based on the prop if not false
  if (maxWidth !== false) {
    containerStyles.maxWidth = maxWidthValues[maxWidth];
  }

  // If fixed, use the maxWidth directly instead of as a breakpoint
  if (fixed && maxWidth !== false) {
    containerStyles.width = containerStyles.maxWidth;
  }

  return (
    <div 
      className={`container ${className}`}
      style={containerStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container; 