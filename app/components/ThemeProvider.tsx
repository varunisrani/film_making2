import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

interface Theme {
  palette: {
    mode: 'light' | 'dark';
    primary: ThemeColors['primary'];
    secondary: ThemeColors['secondary'];
    error: ThemeColors['error'];
    warning: ThemeColors['warning'];
    info: ThemeColors['info'];
    success: ThemeColors['success'];
    background: ThemeColors['background'];
    text: ThemeColors['text'];
  };
  spacing: (factor: number) => string;
  shape: {
    borderRadius: number;
  };
  shadows: string[];
  typography: {
    fontFamily: string;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    subtitle1: React.CSSProperties;
    subtitle2: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    button: React.CSSProperties;
    caption: React.CSSProperties;
    overline: React.CSSProperties;
  };
  transitions: {
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      sharp: string;
    };
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleColorMode: () => void;
}

// Create a default theme
export const createTheme = (options: { mode?: 'light' | 'dark' } = {}): Theme => {
  const mode = options.mode || 'light';
  
  const lightColors: ThemeColors = {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  };

  const darkColors: ThemeColors = {
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  };

  const colors = mode === 'light' ? lightColors : darkColors;

  return {
    palette: {
      mode,
      ...colors,
    },
    spacing: (factor: number) => `${8 * factor}px`,
    shape: {
      borderRadius: 4,
    },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      // ... more shadows would be defined here
    ],
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: { fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2 },
      h2: { fontSize: '2rem', fontWeight: 300, lineHeight: 1.2 },
      h3: { fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2 },
      h4: { fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.2 },
      h5: { fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.2 },
      h6: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.2 },
      subtitle1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
      subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57 },
      body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.43 },
      button: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.75, textTransform: 'uppercase' },
      caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.66 },
      overline: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 2.66, textTransform: 'uppercase' },
    },
    transitions: {
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
  };
};

// Create theme context
const ThemeContext = createContext<ThemeContextType>({
  theme: createTheme(),
  toggleColorMode: () => {},
});

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark';
}

export const ThemeProvider = ({ children, initialTheme = 'light' }: ThemeProviderProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>(initialTheme);

  // Check if we have a saved preference in local storage
  useEffect(() => {
    const savedMode = localStorage.getItem('color-mode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
  }, []);

  // Update body variables when mode changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty(
      '--background',
      mode === 'light' ? '#ffffff' : '#121212'
    );
    root.style.setProperty(
      '--foreground',
      mode === 'light' ? '#171717' : '#ededed'
    );
    
    // Save preference to local storage
    localStorage.setItem('color-mode', mode);
  }, [mode]);

  const theme = React.useMemo(() => createTheme({ mode }), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 