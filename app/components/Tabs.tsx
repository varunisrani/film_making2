import React from 'react';

// Tab component
interface TabProps {
  label: string;
  value: number;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent, value: number) => void;
}

export const Tab = ({
  label,
  value,
  disabled = false,
  icon,
  style = {},
  className = '',
  onClick,
  ...rest
}: TabProps) => {
  const handleClick = (event: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick(event, value);
    }
  };

  return (
    <button
      className={`custom-tab ${className}`}
      style={{
        padding: '12px 16px',
        minWidth: '90px',
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        color: 'inherit',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: disabled ? 'none' : 'auto',
        ...style
      }}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <div className="custom-tab-icon" style={{ marginBottom: '4px' }}>{icon}</div>}
      {label}
    </button>
  );
};

// Tabs component
interface TabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  centered?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Tabs = ({
  children,
  value,
  onChange,
  orientation = 'horizontal',
  variant = 'standard',
  centered = false,
  style = {},
  className = '',
  ...rest
}: TabsProps) => {
  const handleTabClick = (event: React.MouseEvent, tabValue: number) => {
    if (onChange) {
      onChange(event, tabValue);
    }
  };

  // Modify children to pass the selected state and click handler
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    
    // Type assertion for child props
    const childProps = child.props as { value: number; className?: string };
    
    // Define specific props type for clarity
    type TabExtraProps = {
      selected: boolean;
      onClick: (event: React.MouseEvent, value: number) => void;
      className: string;
    };
    
    return React.cloneElement(child, {
      selected: childProps.value === value,
      onClick: handleTabClick,
      className: `${childProps.className || ''} ${childProps.value === value ? 'custom-tab-selected' : ''}`
    } as TabExtraProps);
  });

  const getTabStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      position: 'relative',
      ...style
    };

    if (variant === 'fullWidth') {
      baseStyles.width = '100%';
    }

    if (centered && orientation === 'horizontal') {
      baseStyles.justifyContent = 'center';
    }

    return baseStyles;
  };

  return (
    <div 
      className={`custom-tabs ${className}`} 
      style={getTabStyles()}
      {...rest}
    >
      <div 
        className="custom-tabs-scroller" 
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          overflowX: variant === 'scrollable' && orientation === 'horizontal' ? 'auto' : undefined,
          overflowY: variant === 'scrollable' && orientation === 'vertical' ? 'auto' : undefined,
          width: '100%'
        }}
      >
        {enhancedChildren}
      </div>
      <div 
        className="custom-tabs-indicator" 
        style={{
          position: 'absolute',
          backgroundColor: '#1976d2',
          height: orientation === 'horizontal' ? '2px' : undefined,
          width: orientation === 'vertical' ? '2px' : undefined,
          bottom: orientation === 'horizontal' ? 0 : undefined,
          left: orientation === 'vertical' ? 0 : undefined,
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }}
      />
    </div>
  );
};

// TabPanel component
interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  style?: React.CSSProperties;
  className?: string;
}

export const TabPanel = ({
  children,
  value,
  index,
  style = {},
  className = '',
  ...rest
}: TabPanelProps) => {
  const hidden = value !== index;
  
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      className={`custom-tabpanel ${className}`}
      style={{
        padding: '24px',
        ...style
      }}
      {...rest}
    >
      {!hidden && children}
    </div>
  );
};

export default Tabs; 