import React from 'react';

// Proper CSS types
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  width?: number | string;
  height?: number | string;
  display?: string;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  bgcolor?: string;
  color?: string;
  border?: string;
  borderRadius?: number | string;
  position?: Position;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  zIndex?: number;
  flex?: number | string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  gap?: number | string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  component?: React.ElementType;
  [key: string]: unknown; // For any other props passed through
}

// Utility function to convert spacing values to pixels
const getSpacing = (value: number | string | undefined): string | undefined => {
  if (value === undefined) return undefined;
  
  if (typeof value === 'number') {
    return `${value * 8}px`; // 8px is the base spacing unit
  }
  
  return value;
};

export const Box: React.FC<BoxProps> = ({
  children,
  className = '',
  style = {},
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  width,
  height,
  display,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  bgcolor,
  color,
  border,
  borderRadius,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  gap,
  onClick,
  component: Component = 'div',
  ...props
}) => {
  // Build the style object from the props
  const boxStyles: React.CSSProperties = {
    // Padding
    padding: getSpacing(p),
    paddingTop: getSpacing(pt) || getSpacing(py),
    paddingRight: getSpacing(pr) || getSpacing(px),
    paddingBottom: getSpacing(pb) || getSpacing(py),
    paddingLeft: getSpacing(pl) || getSpacing(px),
    
    // Margin
    margin: getSpacing(m),
    marginTop: getSpacing(mt) || getSpacing(my),
    marginRight: getSpacing(mr) || getSpacing(mx),
    marginBottom: getSpacing(mb) || getSpacing(my),
    marginLeft: getSpacing(ml) || getSpacing(mx),
    
    // Size
    width,
    height,
    
    // Display and Flex
    display,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    
    // Color
    backgroundColor: bgcolor,
    color,
    
    // Border
    border,
    borderRadius,
    
    // Position
    position,
    top,
    right,
    bottom,
    left,
    zIndex,
    
    // Flex
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    gap: getSpacing(gap),
    
    // Merge with custom styles
    ...style
  };

  // Remove undefined values
  Object.keys(boxStyles).forEach(key => {
    if (boxStyles[key as keyof React.CSSProperties] === undefined) {
      delete boxStyles[key as keyof React.CSSProperties];
    }
  });

  return (
    <Component 
      className={`box ${className}`}
      style={boxStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Box; 