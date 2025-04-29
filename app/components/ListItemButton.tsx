import { ListItemButton as MuiListItemButton, ListItemButtonProps as MuiListItemButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from './ThemeProvider';

export interface ListItemButtonProps extends MuiListItemButtonProps {
  glassEffect?: boolean;
}

const StyledListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== 'glassEffect',
})<ListItemButtonProps>(({ theme, glassEffect }) => ({
  borderRadius: '2px',
  marginBottom: '8px',
  transition: 'all 0.2s ease',
  padding: '8px 16px',
  color: theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.7)'
    : 'rgba(0,0,0,0.7)',
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(115, 139, 255, 0.15)'
      : 'rgba(67, 97, 238, 0.08)',
    color: theme.palette.mode === 'dark'
      ? '#738bff'
      : '#4361ee',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(115, 139, 255, 0.2)'
        : 'rgba(67, 97, 238, 0.12)',
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(115, 139, 255, 0.1)'
      : 'rgba(67, 97, 238, 0.05)',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    color: theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.3)'
      : 'rgba(0,0,0,0.3)',
  },
  ...(glassEffect && {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(19, 47, 76, 0.5)'
      : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.05)'}`,
  }),
}));

export default function ListItemButton({ glassEffect = false, children, ...props }: ListItemButtonProps) {
  const { theme } = useTheme();
  
  return (
    <StyledListItemButton
      glassEffect={glassEffect}
      {...props}
    >
      {children}
    </StyledListItemButton>
  );
} 