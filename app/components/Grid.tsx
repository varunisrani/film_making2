import React from 'react';

interface GridProps {
  children?: React.ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: number | boolean;
  sm?: number | boolean;
  md?: number | boolean;
  lg?: number | boolean;
  xl?: number | boolean;
  spacing?: number;
  style?: React.CSSProperties;
  className?: string;
}

const Grid = ({
  children,
  container = false,
  item = false,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing = 0,
  style = {},
  className = '',
  ...rest
}: GridProps) => {
  const getGridStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      ...style
    };

    if (container) {
      styles.display = 'flex';
      styles.flexWrap = 'wrap';
      styles.width = '100%';
      styles.boxSizing = 'border-box';
      
      // Handle spacing
      if (spacing > 0) {
        styles.margin = `calc(-${spacing * 4}px / 2)`;
      }
    }

    if (item) {
      styles.boxSizing = 'border-box';
      
      // Handle spacing
      if (spacing > 0) {
        styles.padding = `calc(${spacing * 4}px / 2)`;
      }

      // Handle responsive widths
      if (xs !== undefined) {
        styles.flexBasis = typeof xs === 'boolean' ? 'auto' : `${(xs / 12) * 100}%`;
        styles.flexGrow = xs === true ? 1 : 0;
        styles.maxWidth = typeof xs === 'boolean' ? 'none' : `${(xs / 12) * 100}%`;
      }

      // Handle all breakpoints for responsive layout
      if (sm !== undefined) {
        // In a real implementation, these would be media queries
        // This is a simplified example
        styles.flexBasis = typeof sm === 'boolean' ? 'auto' : `${(sm / 12) * 100}%`;
        styles.flexGrow = sm === true ? 1 : 0;
        styles.maxWidth = typeof sm === 'boolean' ? 'none' : `${(sm / 12) * 100}%`;
      }

      if (md !== undefined) {
        styles.flexBasis = typeof md === 'boolean' ? 'auto' : `${(md / 12) * 100}%`;
        styles.flexGrow = md === true ? 1 : 0;
        styles.maxWidth = typeof md === 'boolean' ? 'none' : `${(md / 12) * 100}%`;
      }

      if (lg !== undefined) {
        styles.flexBasis = typeof lg === 'boolean' ? 'auto' : `${(lg / 12) * 100}%`;
        styles.flexGrow = lg === true ? 1 : 0;
        styles.maxWidth = typeof lg === 'boolean' ? 'none' : `${(lg / 12) * 100}%`;
      }

      if (xl !== undefined) {
        styles.flexBasis = typeof xl === 'boolean' ? 'auto' : `${(xl / 12) * 100}%`;
        styles.flexGrow = xl === true ? 1 : 0;
        styles.maxWidth = typeof xl === 'boolean' ? 'none' : `${(xl / 12) * 100}%`;
      }
    }

    return styles;
  };

  const combinedClassName = `custom-grid ${className} ${container ? 'grid-container' : ''} ${item ? 'grid-item' : ''}`.trim();

  return (
    <div 
      className={combinedClassName}
      style={getGridStyles()}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Grid; 