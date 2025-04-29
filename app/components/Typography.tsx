import React from 'react';

interface TypographyProps {
  children?: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
  component?: React.ElementType;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  color?: 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
  display?: 'initial' | 'block' | 'inline';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  fontWeight?: 300 | 400 | 500 | 600 | 700 | 'light' | 'regular' | 'medium' | 'bold';
  style?: React.CSSProperties;
  className?: string;
}

const Typography = ({
  children,
  variant = 'body1',
  component,
  align = 'inherit',
  color = 'initial',
  display = 'initial',
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  fontWeight,
  style = {},
  className = '',
  ...rest
}: TypographyProps) => {
  // Define color mapping
  const colors: Record<string, string> = {
    initial: 'inherit',
    inherit: 'inherit',
    primary: '#1976d2',
    secondary: '#9c27b0',
    textPrimary: 'var(--foreground)',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    error: '#d32f2f',
  };

  // Define variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    h1: { fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.01562em' },
    h2: { fontSize: '2rem', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.00833em' },
    h3: { fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, letterSpacing: '0em' },
    h4: { fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.2, letterSpacing: '0.00735em' },
    h5: { fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.2, letterSpacing: '0em' },
    h6: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.2, letterSpacing: '0.0075em' },
    subtitle1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.00938em' },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57, letterSpacing: '0.00714em' },
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.00938em' },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.43, letterSpacing: '0.01071em' },
    caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.66, letterSpacing: '0.03333em' },
    button: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.75, letterSpacing: '0.02857em', textTransform: 'uppercase' },
    overline: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 2.66, letterSpacing: '0.08333em', textTransform: 'uppercase' },
  };

  // Resolve component based on variant or explicitly provided component
  const Component = component || (paragraph ? 'p' : ({
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    button: 'span',
    overline: 'span',
  }[variant]));

  const getTypographyStyles = (): React.CSSProperties => {
    const variantStyle = variantStyles[variant];
    
    const styles: React.CSSProperties = {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      margin: 0,
      ...variantStyle,
      color: colors[color] || color,
      textAlign: align,
      display,
      marginBottom: gutterBottom ? '0.35em' : paragraph ? '16px' : undefined,
      whiteSpace: noWrap ? 'nowrap' : undefined,
      overflow: noWrap ? 'hidden' : undefined,
      textOverflow: noWrap ? 'ellipsis' : undefined,
      ...style,
    };

    // Apply custom font weight if provided
    if (fontWeight !== undefined) {
      styles.fontWeight = fontWeight;
    }

    return styles;
  };

  return (
    <Component
      className={`custom-typography custom-typography-${variant} ${className}`}
      style={getTypographyStyles()}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Typography; 