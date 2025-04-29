'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CssBaseline,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  Alert,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Theme, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { 
  UploadFile, 
  Delete, 
  Refresh,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Movie as MovieIcon,
  CalendarMonth,
  ViewList,
  LocationOn,
  People,
  Settings,
  CameraAlt,
  Theaters,
  ExpandMore,
  Edit,
  Save,
  Add,
  Image,
  ViewModule,
  Slideshow,
  ArrowBack,
  ArrowForward,
  AttachMoney,
  BarChart,
  Timeline,
  Tune,
  Download,
  CloudUpload,
  Description,
  TextFields,
  ContentCopy,
  Code
} from '@mui/icons-material';

import { useDropzone } from 'react-dropzone';
import { format, addDays, parseISO } from 'date-fns';
import { ResponsivePie } from '@nivo/pie';

// Define a modern theme
const baseTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4361ee',
      light: '#738bff',
      dark: '#2c41bb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f72585',
      light: '#ff5eb1',
      dark: '#c30f67',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f8fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(67, 97, 238, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px 0 rgba(0,0,0,0.05)',
          borderRadius: 20,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 40px 0 rgba(0,0,0,0.09)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const darkThemeSettings = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#738bff',
      light: '#a4b8ff',
      dark: '#4361ee',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff5eb1',
      light: '#ff90d1',
      dark: '#f72585',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a1929',
      paper: '#132f4c',
    },
    text: {
      primary: '#e6f1ff',
      secondary: '#b0bec5',
    },
  },
});

// API endpoint
const API_URL = 'http://localhost:8000/api';

// Tab interface
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Home() {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkThemeSettings : baseTheme;
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Data states
  const [scriptData, setScriptData] = useState<any>(null);
  const [oneLinerData, setOneLinerData] = useState<any>(null);
  const [characterData, setCharacterData] = useState<any>(null);
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);
  const [storyboardData, setStoryboardData] = useState<any>(null);
  
  // Form states
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [locationConstraints, setLocationConstraints] = useState({
    preferred_locations: [],
    avoid_weather: ["Rain", "Snow", "High Winds"]
  });
  const [scheduleConstraints, setScheduleConstraints] = useState({
    max_hours_per_day: 12,
    meal_break_duration: 60,
    company_moves_per_day: 2
  });
  
  // Script input states
  const [scriptText, setScriptText] = useState('');
  const [inputMethod, setInputMethod] = useState<'file' | 'text'>('file');
  
  // Script analysis states
  const [scriptAnalysisTab, setScriptAnalysisTab] = useState(0);
  
  // Character breakdown states
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [characterProfileTab, setCharacterProfileTab] = useState(0);
  
  // Schedule states
  const [scheduleView, setScheduleView] = useState<'calendar' | 'list' | 'location' | 'crew' | 'equipment' | 'department' | 'callsheet' | 'raw'>('calendar');
  
  // Note: handleDateChange and clearAllData are defined later in the file
  
  // Budget states
  const [budgetView, setBudgetView] = useState<'overview' | 'location' | 'equipment' | 'logistics' | 'vendor' | 'cashflow' | 'scenario'>('overview');
  const [budgetQualityLevel, setBudgetQualityLevel] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [equipmentPreference, setEquipmentPreference] = useState<'Premium' | 'Standard' | 'Budget'>('Standard');
  const [crewSize, setCrewSize] = useState<'Large' | 'Medium' | 'Small'>('Medium');
  const [targetBudget, setTargetBudget] = useState<number>(0);
  
  // Storyboard states
  const [storyboardView, setStoryboardView] = useState<'grid' | 'slideshow'>('grid');
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [storyboardSettings, setStoryboardSettings] = useState({
    shot_settings: {
      default_shot_type: 'MS',
      style: 'realistic',
      mood: 'neutral',
      camera_angle: 'eye_level',
      scene_settings: {}
    },
    layout: {
      panels_per_row: 3,
      panel_size: 'medium',
      show_captions: true,
      show_technical: true
    },
    image: {
      quality: 'standard',
      aspect_ratio: '16:9',
      color_mode: 'color',
      border: 'thin'
    }
  });
  
  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  // File upload handling
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('validation_level', 'lenient');
      
      const response = await fetch(`${API_URL}/script/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setScriptData(result.data);
      setSuccess('Script uploaded and analyzed successfully!');
      setCurrentTab(1); // Move to Script Analysis tab
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
    },
    multiple: false,
  });
  
  // API calls
  const generateOneLiner = async () => {
    if (!scriptData) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/one-liner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scriptData),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      setOneLinerData(result.data);
      setSuccess('One-liner generated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const analyzeCharacters = async () => {
    if (!scriptData) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/characters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script_data: scriptData
          // Removed focus_characters parameter as it's not supported by the coordinator
        }),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      console.log('Character data received:', result.data);
      setCharacterData(result.data);
      setSuccess('Character analysis completed!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const createSchedule = async () => {
    if (!scriptData || !characterData || !startDate) return;
    
    setLoading(true);
    try {
      // Format date as string in YYYY-MM-DD format
      const formattedDate = startDate ? format(startDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
      
      const response = await fetch(`${API_URL}/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script_results: scriptData,
          character_results: characterData,
          start_date: formattedDate,
          location_constraints: locationConstraints,
          schedule_constraints: scheduleConstraints,
        }),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      setScheduleData(result.data);
      setSuccess('Schedule created successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const createBudget = async () => {
    if (!scriptData || !scheduleData) return;
    
    setLoading(true);
    try {
      // Prepare production data
      const productionData = {
        script_metadata: scriptData.metadata || {},
        scene_count: scriptData.parsed_data?.scenes?.length || 0,
        character_count: characterData?.characters ? Object.keys(characterData.characters).length : 0,
        schedule_days: scheduleData?.schedule?.length || 0,
        quality_level: budgetQualityLevel
      };
      
      // Prepare location data
      const locationData = {
        locations: scheduleData?.schedule?.flatMap((day: any) => 
          day.scenes.map((scene: any) => scene.location_id)
        ) || []
      };
      
      // Prepare crew data
      const crewData = {
        size: crewSize,
        equipment_level: equipmentPreference,
        departments: ["Production", "Camera", "Lighting", "Sound", "Art", "Makeup", "Wardrobe"]
      };
      
      // Prepare constraints
      const constraints = {
        quality_level: budgetQualityLevel,
        equipment_preference: equipmentPreference,
        crew_size: crewSize,
        schedule_days: scheduleData?.schedule?.length || 0,
        total_scenes: scriptData.parsed_data?.scenes?.length || 0,
        total_characters: characterData?.characters ? Object.keys(characterData.characters).length : 0
      };
      
      const response = await fetch(`${API_URL}/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script_results: scriptData,
          schedule_results: scheduleData,
          production_data: productionData,
          location_data: locationData,
          crew_data: crewData,
          target_budget: targetBudget > 0 ? targetBudget : undefined,
          constraints: constraints
        }),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      setBudgetData(result.data);
      setSuccess('Budget created successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const optimizeBudget = async (scenario: string) => {
    if (!budgetData) return;
    
    setLoading(true);
    try {
      // Prepare scenario constraints
      const scenarioConstraints = {
        quality_impact_tolerance: 0.5, // 50%
        timeline_flexibility: 5, // 5 days
        risk_tolerance: "medium",
        original_constraints: {
          quality_level: budgetQualityLevel,
          equipment_preference: equipmentPreference,
          crew_size: crewSize
        }
      };
      
      const response = await fetch(`${API_URL}/budget/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario_constraints: scenarioConstraints,
          scenario: scenario
        }),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      // Update budget data with scenario results
      setBudgetData({
        ...budgetData,
        scenario_results: result.data
      });
      
      setSuccess('Budget scenario analysis completed!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const generateStoryboard = async (sceneId: string, description: string, stylePrompt?: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/storyboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scene_id: sceneId,
          scene_description: description,
          style_prompt: stylePrompt,
          shot_type: storyboardSettings.shot_settings.default_shot_type,
          mood: storyboardSettings.shot_settings.mood,
          camera_angle: storyboardSettings.shot_settings.camera_angle
        }),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      // If we already have storyboard data, update it
      if (storyboardData && storyboardData.scenes) {
        const updatedScenes = [...storyboardData.scenes];
        const sceneIndex = updatedScenes.findIndex(scene => scene.scene_id === sceneId);
        
        if (sceneIndex >= 0) {
          updatedScenes[sceneIndex] = result.data;
        } else {
          updatedScenes.push(result.data);
        }
        
        setStoryboardData({
          ...storyboardData,
          scenes: updatedScenes
        });
      } else {
        // Otherwise create new storyboard data
        setStoryboardData({
          scenes: [result.data]
        });
      }
      
      setSuccess('Storyboard generated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const generateFullStoryboard = async () => {
    if (!scriptData) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/storyboard/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script_results: scriptData,
          shot_settings: storyboardSettings.shot_settings
        }),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      setStoryboardData(result.data);
      setSuccess('Full storyboard generated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const clearAllData = async () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      try {
        await fetch(`${API_URL}/storage`, { method: 'DELETE' });
        setScriptData(null);
        setOneLinerData(null);
        setCharacterData(null);
        setScheduleData(null);
        setBudgetData(null);
        setStoryboardData(null);
        setCurrentTab(0);
        setSuccess('All data cleared successfully!');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  // Add type for newValue in DatePicker
  const handleDateChange = (newValue: Date | null) => {
    setStartDate(newValue);
  };

  // Add new function to handle text submission
  const handleTextSubmit = async () => {
    if (!scriptText.trim()) {
      setError('Please enter your script text');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/script/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          script: scriptText,
          validation_level: 'lenient'
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setScriptData(result.data);
      setSuccess('Script analyzed successfully!');
      setCurrentTab(1); // Move to Script Analysis tab
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to load data from storage
  const loadStoredData = async () => {
    setLoading(true);
    try {
      // Load script data
      const scriptResponse = await fetch(`${API_URL}/storage/script_ingestion_results.json`);
      const scriptResult = await scriptResponse.json();
      if (scriptResult.success) {
        setScriptData(scriptResult.data);
      }
      
      // Load one-liner data
      const oneLinerResponse = await fetch(`${API_URL}/storage/one_liner_results.json`);
      const oneLinerResult = await oneLinerResponse.json();
      if (oneLinerResult.success) {
        setOneLinerData(oneLinerResult.data);
      }
      
      // Load character data
      const characterResponse = await fetch(`${API_URL}/storage/character_breakdown_results.json`);
      const characterResult = await characterResponse.json();
      if (characterResult.success) {
        setCharacterData(characterResult.data);
      }
      
      // Load schedule data
      const scheduleResponse = await fetch(`${API_URL}/storage/schedule_results.json`);
      const scheduleResult = await scheduleResponse.json();
      if (scheduleResult.success) {
        setScheduleData(scheduleResult.data);
      }
      
      // Load budget data
      const budgetResponse = await fetch(`${API_URL}/storage/budget_results.json`);
      const budgetResult = await budgetResponse.json();
      if (budgetResult.success) {
        setBudgetData(budgetResult.data);
      }
      
      // Load storyboard data
      const storyboardResponse = await fetch(`${API_URL}/storage/storyboard_results.json`);
      const storyboardResult = await storyboardResponse.json();
      if (storyboardResult.success) {
        setStoryboardData(storyboardResult.data);
      }
      
      // Set appropriate tab based on loaded data
      if (scriptData) {
        setCurrentTab(1); // Script Analysis
        if (characterData) {
          setCurrentTab(2); // Character Breakdown
          if (scheduleData) {
            setCurrentTab(3); // Schedule
            if (budgetData) {
              setCurrentTab(4); // Budget
              if (storyboardData) {
                setCurrentTab(5); // Storyboard
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Error loading stored data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Load stored data on component mount
  useEffect(() => {
    loadStoredData();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar
          position="fixed" 
          elevation={0}
          sx={{
            zIndex: 1201, // drawer + 1
            backdropFilter: 'blur(8px)',
            backgroundColor: darkMode
              ? 'rgba(19, 47, 76, 0.9)'
              : 'rgba(255, 255, 255, 0.9)',
            borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: 'flex',
                
                alignItems: 'center',
                background: darkMode
                  ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                borderRadius: '50%',
                p: 1,
                mr: 2,
              }}
            >
              <MovieIcon sx={{ color: '#fff' }} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                background: darkMode
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Think AI
            </Typography>
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{
            width: 280,
            flexShrink: 0,
            bgcolor: darkMode
              ? 'rgba(19, 47, 76, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            backdropFilter: 'blur(8px)',
            pt: 8,
            height: '100vh',
            position: 'sticky',
            top: 0,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <List sx={{ p: 2 }}>
            {/* Navigation items with icons */}
            <ListItemButton 
              selected={currentTab === 0} 
              onClick={() => setCurrentTab(0)}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <CloudUpload sx={{ mr: 2, color: '#4361ee' }} />
              <ListItemText 
                primary="Upload Script"
                primaryTypographyProps={{
                  fontWeight: currentTab === 0 ? 600 : 400,
                }}
              />
            </ListItemButton>
            
            <ListItemButton 
              selected={currentTab === 1} 
              onClick={() => setCurrentTab(1)} 
              disabled={!scriptData}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <Description sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="Script Analysis"
                primaryTypographyProps={{
                  fontWeight: currentTab === 1 ? 600 : 400,
                }}
              />
              {scriptData && <Chip 
                size="small" 
                label="✓" 
                color="success" 
                variant="outlined" 
                sx={{ ml: 1, height: 20, minWidth: 20 }} 
              />}
            </ListItemButton>
            
            <ListItemButton 
              selected={currentTab === 2} 
              onClick={() => setCurrentTab(2)} 
              disabled={!scriptData}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <TextFields sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="One-Liner"
                primaryTypographyProps={{
                  fontWeight: currentTab === 2 ? 600 : 400,
                }}
              />
              {oneLinerData && <Chip 
                size="small" 
                label="✓" 
                color="success" 
                variant="outlined" 
                sx={{ ml: 1, height: 20, minWidth: 20 }} 
              />}
            </ListItemButton>
            
            <ListItemButton 
              selected={currentTab === 3} 
              onClick={() => setCurrentTab(3)} 
              disabled={!scriptData}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <People sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="Character Breakdown"
                primaryTypographyProps={{
                  fontWeight: currentTab === 3 ? 600 : 400,
                }}
              />
              {characterData && <Chip 
                size="small" 
                label="✓" 
                color="success" 
                variant="outlined" 
                sx={{ ml: 1, height: 20, minWidth: 20 }} 
              />}
            </ListItemButton>
            
            <ListItemButton 
              selected={currentTab === 4} 
              onClick={() => setCurrentTab(4)} 
              disabled={!scriptData || !characterData}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <CalendarMonth sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="Schedule"
                primaryTypographyProps={{
                  fontWeight: currentTab === 4 ? 600 : 400,
                }}
              />
              {scheduleData && <Chip 
                size="small" 
                label="✓" 
                color="success" 
                variant="outlined" 
                sx={{ ml: 1, height: 20, minWidth: 20 }} 
              />}
            </ListItemButton>
            
            <ListItemButton 
              selected={currentTab === 5} 
              onClick={() => setCurrentTab(5)} 
              disabled={!scheduleData}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <AttachMoney sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="Budget"
                primaryTypographyProps={{
                  fontWeight: currentTab === 5 ? 600 : 400,
                }}
              />
              {budgetData && <Chip 
                size="small" 
                label="✓" 
                color="success" 
                variant="outlined" 
                sx={{ ml: 1, height: 20, minWidth: 20 }} 
              />}
            </ListItemButton>
            
            <ListItemButton 
              selected={currentTab === 6} 
              onClick={() => setCurrentTab(6)} 
              disabled={!scriptData}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <Image sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="Storyboard"
                primaryTypographyProps={{
                  fontWeight: currentTab === 6 ? 600 : 400,
                }}
              />
              {storyboardData && <Chip 
                size="small" 
                label="✓" 
                color="success" 
                variant="outlined" 
                sx={{ ml: 1, height: 20, minWidth: 20 }} 
              />}
            </ListItemButton>
            
            <Divider sx={{ my: 2 }} />
            
            <ListItemButton 
              selected={currentTab === 7} 
              onClick={() => setCurrentTab(7)}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  bgcolor: darkMode
                    ? 'rgba(115, 139, 255, 0.15)'
                    : 'rgba(67, 97, 238, 0.08)',
                  '&:hover': {
                    bgcolor: darkMode
                      ? 'rgba(115, 139, 255, 0.2)'
                      : 'rgba(67, 97, 238, 0.12)',
                  },
                },
              }}
            >
              <BarChart sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="Project Overview"
                primaryTypographyProps={{
                  fontWeight: currentTab === 7 ? 600 : 400,
                }}
              />
            </ListItemButton>
            
            <ListItemButton 
              onClick={() => window.open(`${API_URL}/logs`, '_blank')}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.2s ease',
              }}
            >
              <Timeline sx={{ mr: 2, color: darkMode ? '#738bff' : '#4361ee' }} />
              <ListItemText 
                primary="API Logs"
                primaryTypographyProps={{
                  fontWeight: 400,
                }}
              />
            </ListItemButton>
          </List>
          
          <Box sx={{ p: 2, mt: 'auto' }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={clearAllData}
              fullWidth
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Reset All Data
            </Button>
          </Box>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 10,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)'
              : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            minHeight: '100vh',
          }}
        >
          {/* Status messages */}
          {error && (
            <Alert 
              severity="error" 
              onClose={() => setError(null)}
              sx={{
                mb: 2,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem',
                },
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert 
              severity="success"
              onClose={() => setSuccess(null)}
              sx={{
                mb: 2,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem',
                },
              }}
            >
              {success}
            </Alert>
          )}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Tab Panels */}
          <TabPanel value={currentTab} index={0}>
            {/* Upload Script Tab */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 1200, mx: 'auto' }}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(19, 47, 76, 0.5)'
                    : 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 4,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                    : 'linear-gradient(90deg, #4361ee, #f72585)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4
                }}>
                  Add Your Script
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Button
                    variant={inputMethod === 'file' ? 'contained' : 'outlined'}
                    onClick={() => setInputMethod('file')}
                    sx={{ mr: 2 }}
                  >
                    Upload File
                  </Button>
                  <Button
                    variant={inputMethod === 'text' ? 'contained' : 'outlined'}
                    onClick={() => setInputMethod('text')}
                  >
                    Enter Text
                  </Button>
                </Box>

                {inputMethod === 'file' ? (
                  <Paper
                    {...getRootProps()}
                    sx={{
                      p: 6,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(19, 47, 76, 0.3)'
                        : 'rgba(255, 255, 255, 0.5)',
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 8px 25px rgba(115, 139, 255, 0.2)'
                          : '0 8px 25px rgba(67, 97, 238, 0.15)',
                      },
                    }}
                  >
                    <input {...getInputProps()} />
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: theme.palette.mode === 'dark'
                          ? 'rgba(115, 139, 255, 0.1)'
                          : 'rgba(67, 97, 238, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <UploadFile sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      Drag and drop your script file here
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                      or click to select a file
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<UploadFile />}
                      sx={{
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                          : 'linear-gradient(90deg, #4361ee, #f72585)',
                        '&:hover': {
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, #5a6ecc, #cc4a8e)'
                            : 'linear-gradient(90deg, #354db8, #c51e6a)',
                        },
                      }}
                    >
                      Choose File
                    </Button>
                  </Paper>
                ) : (
                  <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                    <TextField
                      multiline
                      rows={12}
                      fullWidth
                      value={scriptText}
                      onChange={(e) => setScriptText(e.target.value)}
                      placeholder="Paste or type your script here..."
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(19, 47, 76, 0.3)'
                            : 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(10px)',
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleTextSubmit}
                      disabled={loading || !scriptText.trim()}
                      sx={{
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                          : 'linear-gradient(90deg, #4361ee, #f72585)',
                        '&:hover': {
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, #5a6ecc, #cc4a8e)'
                            : 'linear-gradient(90deg, #354db8, #c51e6a)',
                        },
                      }}
                    >
                      Analyze Script
                    </Button>
                  </Box>
                )}
              </Paper>

              {/* Quick Tips Section */}
              <Paper sx={{
                p: 4,
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(19, 47, 76, 0.5)'
                  : 'rgba(255, 255, 255, 0.8)',
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
              }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Quick Tips
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ flex: '1 1 300px', p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      File Format
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Upload your script as a .txt file or paste directly in the text area
                    </Typography>
                  </Box>
                  <Box sx={{ flex: '1 1 300px', p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Script Structure
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Include scene headings, action, dialogue, and character names
                    </Typography>
                  </Box>
                  <Box sx={{ flex: '1 1 300px', p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Best Practices
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Follow standard screenplay formatting for best results
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            {/* Script Analysis Tab */}
            <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)' }}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Script Analysis
              </Typography>
              {scriptData ? (
                <Box>
                  {/* Tabs for different analysis views */}
                  <Tabs
                    value={scriptAnalysisTab}
                    onChange={(e, newValue) => setScriptAnalysisTab(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
                  >
                    <Tab label="Timeline" icon={<Timeline />} iconPosition="start" />
                    <Tab label="Scene Analysis" icon={<ViewList />} iconPosition="start" />
                    <Tab label="Technical Requirements" icon={<Tune />} iconPosition="start" />
                    <Tab label="Department Analysis" icon={<BarChart />} iconPosition="start" />
                    <Tab label="Raw Data" icon={<Description />} iconPosition="start" />
                  </Tabs>

                  {/* Timeline Tab */}
                  {scriptAnalysisTab === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Script Timeline
                      </Typography>
                      {scriptData.parsed_data?.timeline ? (
                        <>
                          <TableContainer component={Paper} sx={{ mb: 3 }}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Scene</TableCell>
                                  <TableCell>Start Time</TableCell>
                                  <TableCell>End Time</TableCell>
                                  <TableCell>Location</TableCell>
                                  <TableCell>Characters</TableCell>
                                  <TableCell>Technical Complexity</TableCell>
                                  <TableCell>Setup Time</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {scriptData.parsed_data.timeline.scene_breakdown.map((scene: any) => (
                                  <TableRow key={scene.scene_number}>
                                    <TableCell>Scene {scene.scene_number}</TableCell>
                                    <TableCell>{scene.start_time}</TableCell>
                                    <TableCell>{scene.end_time}</TableCell>
                                    <TableCell>{scene.location}</TableCell>
                                    <TableCell>{scene.characters.join(', ')}</TableCell>
                                    <TableCell>{scene.technical_complexity}</TableCell>
                                    <TableCell>{scene.setup_time} minutes</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                            <Box sx={{ flex: 1 }}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    Total Duration
                                  </Typography>
                                  <Typography variant="h4">
                                    {scriptData.parsed_data.timeline.total_duration}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    Average Scene Duration
                                  </Typography>
                                  <Typography variant="h4">
                                    {scriptData.parsed_data.timeline.average_scene_duration} min
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    Total Scenes
                                  </Typography>
                                  <Typography variant="h4">
                                    {scriptData.parsed_data.timeline.scene_breakdown.length}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <Typography variant="body1" color="textSecondary">
                          Timeline data not available.
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* Scene Analysis Tab */}
                  {scriptAnalysisTab === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Scene Analysis
                      </Typography>
                      {scriptData.parsed_data?.scenes ? (
                        <Box>
                          {scriptData.parsed_data.scenes.map((scene: any) => (
                            <Accordion key={scene.scene_number} sx={{ mb: 2 }}>
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography>
                                  Scene {scene.scene_number} - {scene.location?.place} ({scene.time})
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                  <Box sx={{ flex: '1 1 50%' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Description:</Typography>
                                    <Typography paragraph>{scene.description}</Typography>
                                    
                                    <Typography variant="subtitle1" fontWeight="bold">Main Characters:</Typography>
                                    <Typography paragraph>{scene.main_characters?.join(', ')}</Typography>
                                    
                                    <Typography variant="subtitle1" fontWeight="bold">Complexity Score:</Typography>
                                    <Typography paragraph>
                                      {(scene.technical_cues?.length || 0) + 
                                       (scene.main_characters?.length || 0) + 
                                       Object.values(scene.department_notes || {}).reduce((sum: number, notes: any) => 
                                         sum + (notes?.length || 0), 0)}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ flex: '1 1 50%' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Technical Cues:</Typography>
                                    <List dense>
                                      {scene.technical_cues?.map((cue: string, index: number) => (
                                        <ListItem key={index}>
                                          <ListItemText primary={cue} />
                                        </ListItem>
                                      ))}
                                    </List>
                                    
                                    <Typography variant="subtitle1" fontWeight="bold">Department Notes:</Typography>
                                    {Object.entries(scene.department_notes || {}).map(([dept, notes]: [string, any]) => (
                                      <Box key={dept} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" fontStyle="italic">{dept.charAt(0).toUpperCase() + dept.slice(1)}:</Typography>
                                        <List dense>
                                          {notes.map((note: string, index: number) => (
                                            <ListItem key={index}>
                                              <ListItemText primary={note} />
                                            </ListItem>
                                          ))}
                                        </List>
                                      </Box>
                                    ))}
                                  </Box>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body1" color="textSecondary">
                          Scene analysis data not available.
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* Technical Requirements Tab */}
                  {scriptAnalysisTab === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Technical Requirements
                      </Typography>
                      {scriptData.metadata ? (
                        <Box>
                          <Card sx={{ mb: 3 }}>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>Global Requirements</Typography>
                              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" fontWeight="bold">Equipment:</Typography>
                                  <List dense>
                                    {scriptData.metadata.global_requirements?.equipment?.map((item: string, index: number) => (
                                      <ListItem key={index}>
                                        <ListItemText primary={item} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" fontWeight="bold">Props:</Typography>
                                  <List dense>
                                    {scriptData.metadata.global_requirements?.props?.map((item: string, index: number) => (
                                      <ListItem key={index}>
                                        <ListItemText primary={item} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" fontWeight="bold">Special Effects:</Typography>
                                  <List dense>
                                    {scriptData.metadata.global_requirements?.special_effects?.map((item: string, index: number) => (
                                      <ListItem key={index}>
                                        <ListItemText primary={item} />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>

                          <Typography variant="h6" gutterBottom>Technical Requirements by Scene</Typography>
                          {scriptData.metadata.scene_metadata?.map((sceneMeta: any) => (
                            <Accordion key={sceneMeta.scene_number} sx={{ mb: 2 }}>
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography>
                                  Scene {sceneMeta.scene_number} Technical Details
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                  <Box sx={{ flex: '1 1 50%' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Lighting:</Typography>
                                    <Typography>Type: {sceneMeta.lighting?.type}</Typography>
                                    <List dense>
                                      {sceneMeta.lighting?.requirements?.map((req: string, index: number) => (
                                        <ListItem key={index}>
                                          <ListItemText primary={req} />
                                        </ListItem>
                                      ))}
                                    </List>

                                    <Typography variant="subtitle1" fontWeight="bold">Props:</Typography>
                                    {Object.entries(sceneMeta.props || {}).map(([category, items]: [string, any]) => (
                                      items && items.length > 0 ? (
                                        <Box key={category} sx={{ mb: 2 }}>
                                          <Typography variant="subtitle2" fontStyle="italic">{category}:</Typography>
                                          <List dense>
                                            {items.map((item: string, index: number) => (
                                              <ListItem key={index}>
                                                <ListItemText primary={item} />
                                              </ListItem>
                                            ))}
                                          </List>
                                        </Box>
                                      ) : null
                                    ))}
                                  </Box>
                                  <Box sx={{ flex: '1 1 50%' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Technical:</Typography>
                                    {Object.entries(sceneMeta.technical || {}).map(([category, items]: [string, any]) => (
                                      items && items.length > 0 ? (
                                        <Box key={category} sx={{ mb: 2 }}>
                                          <Typography variant="subtitle2" fontStyle="italic">{category}:</Typography>
                                          <List dense>
                                            {items.map((item: string, index: number) => (
                                              <ListItem key={index}>
                                                <ListItemText primary={item} />
                                              </ListItem>
                                            ))}
                                          </List>
                                        </Box>
                                      ) : null
                                    ))}
                                  </Box>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body1" color="textSecondary">
                          Technical requirements data not available.
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* Department Analysis Tab */}
                  {scriptAnalysisTab === 3 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Department Analysis
                      </Typography>
                      {scriptData.metadata?.scene_metadata ? (
                        <Box>
                          {/* Department workload visualization would go here */}
                          <Card sx={{ mb: 3, p: 2 }}>
                            <CardContent>
                              <Typography variant="subtitle1" gutterBottom>Department Workload Analysis</Typography>
                              <Typography variant="body2" color="textSecondary" paragraph>
                                This section would display a chart showing department workload distribution.
                                In a production environment, this would be implemented with a charting library.
                              </Typography>
                            </CardContent>
                          </Card>

                          {/* Department details */}
                          <Typography variant="h6" gutterBottom>Department Details</Typography>
                          {(() => {
                            // Calculate department data
                            const departmentData: Record<string, {total_tasks: number, scenes: string[]}> = {};
                            
                            scriptData.metadata.scene_metadata.forEach((sceneMeta: any) => {
                              Object.entries(sceneMeta.department_notes || {}).forEach(([dept, notes]: [string, any]) => {
                                if (!departmentData[dept]) {
                                  departmentData[dept] = { total_tasks: 0, scenes: [] };
                                }
                                departmentData[dept].total_tasks += notes.length;
                                departmentData[dept].scenes.push(sceneMeta.scene_number);
                              });
                            });

                            return Object.entries(departmentData).map(([dept, data]: [string, any]) => (
                              <Accordion key={dept} sx={{ mb: 2 }}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                  <Typography>
                                    {dept.charAt(0).toUpperCase() + dept.slice(1)} Department
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography variant="body1">
                                    <strong>Total Tasks:</strong> {data.total_tasks}
                                  </Typography>
                                  <Typography variant="body1">
                                    <strong>Scenes Involved:</strong> {data.scenes.join(', ')}
                                  </Typography>
                                  
                                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
                                    Notes by Scene:
                                  </Typography>
                                  
                                  {scriptData.metadata.scene_metadata.map((sceneMeta: any) => (
                                    sceneMeta.department_notes && sceneMeta.department_notes[dept] ? (
                                      <Box key={sceneMeta.scene_number} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" fontStyle="italic">
                                          Scene {sceneMeta.scene_number}:
                                        </Typography>
                                        <List dense>
                                          {sceneMeta.department_notes[dept].map((note: string, index: number) => (
                                            <ListItem key={index}>
                                              <ListItemText primary={note} />
                                            </ListItem>
                                          ))}
                                        </List>
                                      </Box>
                                    ) : null
                                  ))}
                                </AccordionDetails>
                              </Accordion>
                            ));
                          })()}
                        </Box>
                      ) : (
                        <Typography variant="body1" color="textSecondary">
                          Department analysis data not available.
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* Raw Data Tab */}
                  {scriptAnalysisTab === 4 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Raw Data
                      </Typography>
                      
                      <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography>Parsed Data</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ 
                            p: 2, 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                            borderRadius: 2,
                            maxHeight: '400px',
                            overflow: 'auto'
                          }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                              {JSON.stringify(scriptData.parsed_data, null, 2)}
                            </pre>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography>Metadata</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ 
                            p: 2, 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                            borderRadius: 2,
                            maxHeight: '400px',
                            overflow: 'auto'
                          }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                              {JSON.stringify(scriptData.metadata, null, 2)}
                            </pre>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  )}

                  {/* Navigation buttons */}
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      startIcon={<ArrowBack />}
                      onClick={() => setCurrentTab(0)}
                    >
                      Back to Upload
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => {
                        if (!oneLinerData) {
                          generateOneLiner();
                        }
                        setCurrentTab(2);
                      }}
                    >
                      Continue to One-Liner
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Please upload or enter a script first to see the analysis.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => setCurrentTab(0)}
                  >
                    Go to Upload
                  </Button>
                </Box>
              )}
            </Paper>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            {/* One-Liner Tab */}
            <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)' }}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                One-Liner Creation Module
              </Typography>
              {scriptData ? (
                <Box>
                  {!oneLinerData ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                      <Button
                        variant="contained"
                        onClick={generateOneLiner}
                        disabled={loading}
                        startIcon={<TextFields />}
                        size="large"
                        sx={{
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                            : 'linear-gradient(90deg, #4361ee, #f72585)',
                          px: 4,
                          py: 1.5
                        }}
                      >
                        Generate One-Liners
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: '1 1 66%' }}>
                          <Typography variant="h6" gutterBottom>
                            Scene Summaries
                          </Typography>
                          
                          {oneLinerData && oneLinerData.scenes && oneLinerData.scenes.length > 0 ? (
                            oneLinerData.scenes
                              .sort((a: any, b: any) => (a.scene_number || 0) - (b.scene_number || 0))
                              .map((scene: any) => (
                                <Card key={scene.scene_number} sx={{ mb: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                                  <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                      Scene {scene.scene_number || '?'}
                                    </Typography>
                                    <Typography variant="body1">
                                      {scene.one_liner || 'No summary available'}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No scene summaries available.
                            </Typography>
                          )}
                        </Box>
                        
                        <Box sx={{ flex: '1 1 33%' }}>
                          <Card sx={{ mb: 3 }}>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                Export Options
                              </Typography>
                              
                              <Button
                                variant="contained"
                                startIcon={<Refresh />}
                                fullWidth
                                onClick={generateOneLiner}
                                disabled={loading}
                                sx={{ mb: 2 }}
                              >
                                Regenerate One-Liners
                              </Button>
                              
                              <Divider sx={{ my: 2 }} />
                              
                              <Button
                                variant="outlined"
                                startIcon={<Download />}
                                fullWidth
                                sx={{ mb: 2 }}
                                onClick={() => {
                                  // Create a download link for the JSON
                                  const jsonStr = JSON.stringify(oneLinerData, null, 2);
                                  const blob = new Blob([jsonStr], { type: 'application/json' });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = 'one_liners.json';
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                  URL.revokeObjectURL(url);
                                }}
                              >
                                Download One-Liners (JSON)
                              </Button>
                              
                              <Button
                                variant="outlined"
                                startIcon={<ContentCopy />}
                                fullWidth
                                onClick={() => {
                                  if (oneLinerData && oneLinerData.scenes) {
                                    // Format the text for clipboard
                                    const clipboardText = oneLinerData.scenes
                                      .sort((a: any, b: any) => (a.scene_number || 0) - (b.scene_number || 0))
                                      .map((scene: any) => 
                                        `Scene ${scene.scene_number || '?'}:\n${scene.one_liner || 'No summary available'}`
                                      )
                                      .join('\n\n');
                                    
                                    // Copy to clipboard
                                    navigator.clipboard.writeText(clipboardText)
                                      .then(() => {
                                        setSuccess('Text copied to clipboard!');
                                        setTimeout(() => setSuccess(null), 3000);
                                      })
                                      .catch(() => {
                                        setError('Failed to copy to clipboard');
                                        setTimeout(() => setError(null), 3000);
                                      });
                                  }
                                }}
                              >
                                Copy All to Clipboard
                              </Button>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                Overall Summary
                              </Typography>
                              <Typography variant="body1">
                                {oneLinerData && (oneLinerData.overall_summary || oneLinerData.one_liner || 'No overall summary available.')}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Box>
                      
                      {/* Navigation buttons */}
                      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          variant="outlined"
                          startIcon={<ArrowBack />}
                          onClick={() => setCurrentTab(1)}
                        >
                          Back to Script Analysis
                        </Button>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForward />}
                          onClick={() => {
                            if (!characterData) {
                              analyzeCharacters();
                            }
                            setCurrentTab(3);
                          }}
                        >
                          Continue to Character Breakdown
                        </Button>
                      </Box>
                      
                      {/* Success/Error messages */}
                      {success && (
                        <Alert 
                          severity="success" 
                          sx={{ mt: 2 }}
                          onClose={() => setSuccess(null)}
                        >
                          {success}
                        </Alert>
                      )}
                      
                      {error && (
                        <Alert 
                          severity="error" 
                          sx={{ mt: 2 }}
                          onClose={() => setError(null)}
                        >
                          {error}
                        </Alert>
                      )}
                    </Box>
                  )}
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Please upload or enter a script first to generate one-liners.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => setCurrentTab(0)}
                  >
                    Go to Upload
                  </Button>
                </Box>
              )}
            </Paper>
          </TabPanel>

          <TabPanel value={currentTab} index={3}>
            {/* Character Breakdown Tab */}
            <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)' }}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Character Breakdown
              </Typography>
              {scriptData ? (
                <Box>
                  {!characterData ? (
                    <Button
                      variant="contained"
                      onClick={analyzeCharacters}
                      disabled={loading}
                      sx={{
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                          : 'linear-gradient(90deg, #4361ee, #f72585)',
                      }}
                    >
                      Analyze Characters
                    </Button>
                  ) : (
                    <Box>
                      {/* Character Profiles Tabs */}
                      <Tabs 
                        value={characterProfileTab} 
                        onChange={(e, newValue) => setCharacterProfileTab(newValue)}
                        sx={{ mb: 3 }}
                      >
                        <Tab label="Character Profiles" />
                        <Tab label="Arc & Relationships" />
                        <Tab label="Scene Matrix" />
                        <Tab label="Statistics" />
                        <Tab label="Raw Data" />
                      </Tabs>

                      {/* Character Profiles Tab */}
                      <TabPanel value={characterProfileTab} index={0}>
                        {selectedCharacter ? (
                          // Detailed Character Profile View
                          <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                              <Typography variant="h5" fontWeight="bold">
                                {selectedCharacter}
                              </Typography>
                              <Button 
                                variant="outlined" 
                                startIcon={<ArrowBack />}
                                onClick={() => setSelectedCharacter('')}
                              >
                                Back to Characters
                              </Button>
                            </Box>

                            {/* Character Profile Tabs */}
                            <Tabs 
                              value={0} 
                              onChange={(e, newValue) => {}}
                              sx={{ mb: 3 }}
                            >
                              <Tab label="Overview" />
                              <Tab label="Dialogue & Actions" />
                              <Tab label="Emotional Journey" />
                              <Tab label="Technical Details" />
                            </Tabs>

                            {/* Character Overview */}
                            <Box>
                              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
                                <Box sx={{ flex: 1 }}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6" gutterBottom>Character Overview</Typography>
                                      {characterData.characters[selectedCharacter].objectives && (
                                        <Typography variant="body1">
                                          <strong>Main Objective:</strong> {characterData.characters[selectedCharacter].objectives.main_objective || 'N/A'}
                                        </Typography>
                                      )}
                                    </CardContent>
                                  </Card>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6" gutterBottom>Dialogue Stats</Typography>
                                      {characterData.characters[selectedCharacter].dialogue_analysis && (
                                        <Box>
                                          <Typography variant="body1">
                                            <strong>Total Lines:</strong> {characterData.characters[selectedCharacter].dialogue_analysis.total_lines || 0}
                                          </Typography>
                                          <Typography variant="body1">
                                            <strong>Total Words:</strong> {characterData.characters[selectedCharacter].dialogue_analysis.total_words || 0}
                                          </Typography>
                                          <Typography variant="body1">
                                            <strong>Avg. Line Length:</strong> {characterData.characters[selectedCharacter].dialogue_analysis.average_line_length?.toFixed(1) || '0.0'}
                                          </Typography>
                                          <Typography variant="body1">
                                            <strong>Vocabulary Complexity:</strong> {characterData.characters[selectedCharacter].dialogue_analysis.vocabulary_complexity?.toFixed(2) || '0.00'}
                                          </Typography>
                                        </Box>
                                      )}
                                    </CardContent>
                                  </Card>
                                </Box>
                              </Box>

                              {/* Scene Objectives */}
                              {characterData.characters[selectedCharacter].objectives && 
                               characterData.characters[selectedCharacter].objectives.scene_objectives && (
                                <Box sx={{ mb: 3 }}>
                                  <Typography variant="h6" gutterBottom>Scene Objectives</Typography>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {characterData.characters[selectedCharacter].objectives.scene_objectives.map((obj: any, index: number) => (
                                      <Card key={index} sx={{ borderLeft: '4px solid', borderColor: 'primary.main' }}>
                                        <CardContent>
                                          <Typography variant="subtitle1" fontWeight="bold">
                                            Scene {obj.scene || 'N/A'}
                                          </Typography>
                                          <Typography variant="body1">
                                            <strong>Objective:</strong> {obj.objective || 'N/A'}
                                          </Typography>
                                          <Typography variant="body1">
                                            <strong>Obstacles:</strong>
                                          </Typography>
                                          <List dense>
                                            {obj.obstacles?.map((obstacle: string, i: number) => (
                                              <ListItem key={i}>
                                                <ListItemText primary={obstacle} />
                                              </ListItem>
                                            ))}
                                          </List>
                                          <Typography variant="body1">
                                            <strong>Outcome:</strong> {obj.outcome || 'N/A'}
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </Box>
                                </Box>
                              )}

                              {/* Emotional Range */}
                              {characterData.characters[selectedCharacter].emotional_range && (
                                <Box sx={{ mb: 3 }}>
                                  <Typography variant="h6" gutterBottom>Emotional Profile</Typography>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="body1">
                                        <strong>Primary Emotion:</strong> {characterData.characters[selectedCharacter].emotional_range.primary_emotion || 'N/A'}
                                      </Typography>
                                      <Typography variant="body1">
                                        <strong>Emotional Spectrum:</strong>
                                      </Typography>
                                      <List dense>
                                        {characterData.characters[selectedCharacter].emotional_range.emotional_spectrum?.map((emotion: string, i: number) => (
                                          <ListItem key={i}>
                                            <ListItemText primary={emotion} />
                                          </ListItem>
                                        ))}
                                      </List>
                                    </CardContent>
                                  </Card>
                                </Box>
                              )}

                              {/* Technical Details */}
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" gutterBottom>Technical Details</Typography>
                                <Tabs value={0} onChange={(e, newValue) => {}}>
                                  <Tab label="Props" />
                                  <Tab label="Costumes" />
                                  <Tab label="Makeup" />
                                </Tabs>
                                <Box sx={{ mt: 2 }}>
                                  {/* Props */}
                                  {characterData.characters[selectedCharacter].props && (
                                    <Box>
                                      <Typography variant="subtitle1" fontWeight="bold">Base Props:</Typography>
                                      <List dense>
                                        {characterData.characters[selectedCharacter].props.base?.map((prop: string, i: number) => (
                                          <ListItem key={i}>
                                            <ListItemText primary={prop} />
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          // Character List View
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            {Object.entries(characterData.characters || {}).map(([name, data]: [string, any]) => (
                              <Box key={name} sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' } }}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                      {name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Scenes: {data.scene_presence ? data.scene_presence.length : 0}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Lines: {data.dialogue_analysis?.total_lines || 0}
                                    </Typography>
                                    {data.emotional_range && (
                                      <Typography variant="body2" color="textSecondary">
                                        Primary Emotion: {data.emotional_range.primary_emotion || 'N/A'}
                                      </Typography>
                                    )}
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() => setSelectedCharacter(name)}
                                      sx={{ mt: 2 }}
                                    >
                                      View Profile
                                    </Button>
                                  </CardContent>
                                </Card>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </TabPanel>

                      {/* Arc & Relationships Tab */}
                      <TabPanel value={characterProfileTab} index={1}>
                        {characterData.relationships && (
                          <Box>
                            <Typography variant="h6" gutterBottom>Character Relationships</Typography>
                            <Box sx={{ mb: 3 }}>
                              {Object.entries(characterData.relationships || {}).map(([relKey, relData]: [string, any]) => (
                                <Accordion key={relKey}>
                                  <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography>Relationship: {relKey}</Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Typography variant="body1">
                                      <strong>Type:</strong> {relData.type || 'N/A'}
                                    </Typography>
                                    
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                      <strong>Dynamics:</strong>
                                    </Typography>
                                    <List dense>
                                      {relData.dynamics?.map((dynamic: string, i: number) => (
                                        <ListItem key={i}>
                                          <ListItemText primary={dynamic} />
                                        </ListItem>
                                      ))}
                                    </List>
                                    
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                      <strong>Evolution:</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                      {relData.evolution?.map((evolution: any, i: number) => (
                                        <Card key={i} variant="outlined">
                                          <CardContent>
                                            <Typography variant="subtitle2">
                                              Scene {evolution.scene || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2">
                                              <strong>Change:</strong> {evolution.dynamic_change || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2">
                                              <strong>Trigger:</strong> {evolution.trigger || 'N/A'}
                                            </Typography>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </Box>
                                  </AccordionDetails>
                                </Accordion>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </TabPanel>

                      {/* Scene Matrix Tab */}
                      <TabPanel value={characterProfileTab} index={2}>
                        {characterData.scene_matrix && Object.keys(characterData.scene_matrix).length > 0 ? (
                          <Box>
                            <Typography variant="h6" gutterBottom>Scene Matrix</Typography>
                            
                            {/* Scene Selector */}
                            <Box sx={{ mb: 3 }}>
                              <FormControl fullWidth>
                                <InputLabel id="scene-select-label">Select Scene</InputLabel>
                                <Select
                                  labelId="scene-select-label"
                                  value={Object.keys(characterData.scene_matrix)[0] || ''}
                                  label="Select Scene"
                                  onChange={(e) => {}}
                                >
                                  {Object.keys(characterData.scene_matrix)
                                    .sort((a, b) => parseInt(a) - parseInt(b))
                                    .map((scene) => (
                                      <MenuItem key={scene} value={scene}>Scene {scene}</MenuItem>
                                    ))}
                                </Select>
                              </FormControl>
                            </Box>
                            
                            {/* Scene Details */}
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                              <Box sx={{ flex: 1 }}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold">Present Characters:</Typography>
                                    <List dense>
                                      {characterData.scene_matrix[Object.keys(characterData.scene_matrix)[0]]?.present_characters?.map((char: string, i: number) => (
                                        <ListItem key={i}>
                                          <ListItemText primary={char} />
                                        </ListItem>
                                      ))}
                                    </List>
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                      <strong>Emotional Atmosphere:</strong> {characterData.scene_matrix[Object.keys(characterData.scene_matrix)[0]]?.emotional_atmosphere || 'N/A'}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold">Key Developments:</Typography>
                                    <List dense>
                                      {characterData.scene_matrix[Object.keys(characterData.scene_matrix)[0]]?.key_developments?.map((dev: string, i: number) => (
                                        <ListItem key={i}>
                                          <ListItemText primary={dev} />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </CardContent>
                                </Card>
                              </Box>
                            </Box>
                            
                            {/* Interactions */}
                            <Box sx={{ mt: 3 }}>
                              <Typography variant="h6" gutterBottom>Interactions</Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {characterData.scene_matrix[Object.keys(characterData.scene_matrix)[0]]?.interactions?.map((interaction: any, index: number) => (
                                  <Card key={index} variant="outlined">
                                    <CardContent>
                                      <Typography variant="subtitle1">
                                        <strong>Characters:</strong> {interaction.characters ? interaction.characters.join(', ') : 'N/A'}
                                      </Typography>
                                      <Typography variant="body1">
                                        <strong>Type:</strong> {interaction.type || 'N/A'}
                                      </Typography>
                                      <Typography variant="body1">
                                        <strong>Significance:</strong> {interaction.significance ? interaction.significance.toFixed(2) : '0.00'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                ))}
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body1" color="textSecondary">
                              No scene matrix data available. This could be because:
                            </Typography>
                            <List>
                              <ListItem>
                                <ListItemText primary="The character analysis is still in progress" />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="The script doesn't have enough scene information" />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="There was an error during scene matrix generation" />
                              </ListItem>
                            </List>
                            <Button 
                              variant="outlined" 
                              onClick={() => {
                                console.log('Character Data:', characterData);
                                setSuccess('Character data logged to console. Press F12 to view.');
                              }}
                              sx={{ mt: 2 }}
                            >
                              Debug Character Data
                            </Button>
                          </Box>
                        )}
                      </TabPanel>

                      {/* Statistics Tab */}
                      <TabPanel value={characterProfileTab} index={3}>
                        {characterData.statistics ? (
                          <Box>
                            <Typography variant="h6" gutterBottom>Overall Statistics</Typography>
                            
                            {/* Scene Statistics */}
                            {characterData.statistics.scene_stats && (
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Scene Statistics</Typography>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
                                  <Box sx={{ flex: 1 }}>
                                    <Card>
                                      <CardContent>
                                        <Typography variant="h6">Total Scenes</Typography>
                                        <Typography variant="h4">{characterData.statistics.scene_stats.total_scenes || 0}</Typography>
                                      </CardContent>
                                    </Card>
                                  </Box>
                                  <Box sx={{ flex: 1 }}>
                                    <Card>
                                      <CardContent>
                                        <Typography variant="h6">Avg Characters/Scene</Typography>
                                        <Typography variant="h4">{characterData.statistics.scene_stats.average_characters_per_scene?.toFixed(1) || '0.0'}</Typography>
                                      </CardContent>
                                    </Card>
                                  </Box>
                                  <Box sx={{ flex: 1 }}>
                                    <Card>
                                      <CardContent>
                                        <Typography variant="h6">Total Interactions</Typography>
                                        <Typography variant="h4">{characterData.statistics.scene_stats.total_interactions || 0}</Typography>
                                      </CardContent>
                                    </Card>
                                  </Box>
                                </Box>
                              </Box>
                            )}
                            
                            {/* Dialogue Statistics */}
                            {characterData.statistics.dialogue_stats && Object.keys(characterData.statistics.dialogue_stats).length > 0 ? (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Dialogue Statistics</Typography>
                                <TableContainer component={Paper}>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Character</TableCell>
                                        <TableCell>Total Lines</TableCell>
                                        <TableCell>Total Words</TableCell>
                                        <TableCell>Avg Line Length</TableCell>
                                        <TableCell>Vocabulary Complexity</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {Object.entries(characterData.statistics.dialogue_stats).map(([char, stats]: [string, any]) => (
                                        <TableRow key={char}>
                                          <TableCell>{char}</TableCell>
                                          <TableCell>{stats.total_lines || 0}</TableCell>
                                          <TableCell>{stats.total_words || 0}</TableCell>
                                          <TableCell>{stats.average_line_length?.toFixed(1) || '0.0'}</TableCell>
                                          <TableCell>{stats.vocabulary_complexity?.toFixed(2) || '0.00'}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            ) : (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Dialogue Statistics</Typography>
                                <Typography variant="body1" color="textSecondary">No dialogue statistics available.</Typography>
                              </Box>
                            )}
                            
                            {/* Emotional Statistics */}
                            {characterData.statistics.emotional_stats && Object.keys(characterData.statistics.emotional_stats).length > 0 ? (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Emotional Statistics</Typography>
                                <TableContainer component={Paper}>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Character</TableCell>
                                        <TableCell>Primary Emotion</TableCell>
                                        <TableCell>Emotional Variety</TableCell>
                                        <TableCell>Average Intensity</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {Object.entries(characterData.statistics.emotional_stats).map(([char, stats]: [string, any]) => (
                                        <TableRow key={char}>
                                          <TableCell>{char}</TableCell>
                                          <TableCell>{stats.primary_emotion || 'N/A'}</TableCell>
                                          <TableCell>{stats.emotional_variety || 0}</TableCell>
                                          <TableCell>{stats.average_intensity?.toFixed(2) || '0.00'}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            ) : (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Emotional Statistics</Typography>
                                <Typography variant="body1" color="textSecondary">No emotional statistics available.</Typography>
                              </Box>
                            )}
                            
                            {/* Technical Statistics */}
                            {characterData.statistics.technical_stats && Object.keys(characterData.statistics.technical_stats).length > 0 ? (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Technical Statistics</Typography>
                                
                                {/* Costume Changes */}
                                {characterData.statistics.technical_stats.costume_changes && Object.keys(characterData.statistics.technical_stats.costume_changes).length > 0 && (
                                  <Box sx={{ mb: 3 }}>
                                    <Typography variant="body1" fontWeight="bold" gutterBottom>Costume Changes</Typography>
                                    <TableContainer component={Paper}>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Character</TableCell>
                                            <TableCell>Total Changes</TableCell>
                                            <TableCell>Unique Costumes</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {Object.entries(characterData.statistics.technical_stats.costume_changes).map(([char, stats]: [string, any]) => (
                                            <TableRow key={char}>
                                              <TableCell>{char}</TableCell>
                                              <TableCell>{stats.total_changes || 0}</TableCell>
                                              <TableCell>{stats.unique_costumes || 0}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Box>
                                )}
                                
                                {/* Prop Usage */}
                                {characterData.statistics.technical_stats.prop_usage && Object.keys(characterData.statistics.technical_stats.prop_usage).length > 0 && (
                                  <Box sx={{ mb: 3 }}>
                                    <Typography variant="body1" fontWeight="bold" gutterBottom>Prop Usage</Typography>
                                    <TableContainer component={Paper}>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Character</TableCell>
                                            <TableCell>Total Props</TableCell>
                                            <TableCell>Unique Props</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {Object.entries(characterData.statistics.technical_stats.prop_usage).map(([char, stats]: [string, any]) => (
                                            <TableRow key={char}>
                                              <TableCell>{char}</TableCell>
                                              <TableCell>{stats.total_props || 0}</TableCell>
                                              <TableCell>{stats.unique_props || 0}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Box>
                                )}
                                
                                {/* Makeup Changes */}
                                {characterData.statistics.technical_stats.makeup_changes && Object.keys(characterData.statistics.technical_stats.makeup_changes).length > 0 && (
                                  <Box>
                                    <Typography variant="body1" fontWeight="bold" gutterBottom>Makeup Changes</Typography>
                                    <TableContainer component={Paper}>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Character</TableCell>
                                            <TableCell>Total Changes</TableCell>
                                            <TableCell>Unique Looks</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {Object.entries(characterData.statistics.technical_stats.makeup_changes).map(([char, stats]: [string, any]) => (
                                            <TableRow key={char}>
                                              <TableCell>{char}</TableCell>
                                              <TableCell>{stats.total_changes || 0}</TableCell>
                                              <TableCell>{stats.unique_looks || 0}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Box>
                                )}
                              </Box>
                            ) : (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Technical Statistics</Typography>
                                <Typography variant="body1" color="textSecondary">No technical statistics available.</Typography>
                              </Box>
                            )}
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body1" color="textSecondary">
                              No statistics data available. This could be because:
                            </Typography>
                            <List>
                              <ListItem>
                                <ListItemText primary="The character analysis is still in progress" />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="The script doesn't have enough information for statistics" />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary="There was an error during statistics generation" />
                              </ListItem>
                            </List>
                            <Button 
                              variant="outlined" 
                              onClick={() => {
                                console.log('Character Data:', characterData);
                                setSuccess('Character data logged to console. Press F12 to view.');
                              }}
                              sx={{ mt: 2 }}
                            >
                              Debug Character Data
                            </Button>
                          </Box>
                        )}
                      </TabPanel>

                      {/* Raw Data Tab */}
                      <TabPanel value={characterProfileTab} index={4}>
                        <Box>
                          <Typography variant="h6" gutterBottom>Raw Character Data</Typography>
                          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                            <Button
                              variant="outlined"
                              startIcon={<Download />}
                              onClick={() => {
                                const jsonStr = JSON.stringify(characterData, null, 2);
                                const blob = new Blob([jsonStr], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'character_breakdown.json';
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              }}
                            >
                              Download Full Analysis
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                console.log('Character Data Structure:', characterData);
                                if (characterData.characters) {
                                  const firstCharacter = Object.keys(characterData.characters)[0];
                                  console.log('First Character Data:', characterData.characters[firstCharacter]);
                                }
                                if (characterData.relationships) {
                                  console.log('Relationships Data:', characterData.relationships);
                                }
                                if (characterData.scene_matrix) {
                                  console.log('Scene Matrix Data:', characterData.scene_matrix);
                                }
                                if (characterData.statistics) {
                                  console.log('Statistics Data:', characterData.statistics);
                                }
                                setSuccess('Data structure logged to console. Press F12 to view.');
                              }}
                            >
                              Debug Data Structure
                            </Button>
                          </Box>
                          <Paper sx={{ p: 2, maxHeight: '500px', overflow: 'auto' }}>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                              {JSON.stringify(characterData, null, 2)}
                            </pre>
                          </Paper>
                        </Box>
                      </TabPanel>
                    </Box>
                  )}
                  
                  {/* Navigation buttons */}
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      startIcon={<ArrowBack />}
                      onClick={() => setCurrentTab(2)}
                    >
                      Back to One-Liner
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => {
                        if (!scheduleData && characterData) {
                          createSchedule();
                        }
                        setCurrentTab(4);
                      }}
                    >
                      Continue to Schedule
                    </Button>
                  </Box>
                  
                  {/* Success/Error messages */}
                  {success && (
                    <Alert 
                      severity="success" 
                      sx={{ mt: 2 }}
                      onClose={() => setSuccess(null)}
                    >
                      {success}
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert 
                      severity="error" 
                      sx={{ mt: 2 }}
                      onClose={() => setError(null)}
                    >
                      {error}
                    </Alert>
                  )}
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Please upload or enter a script first to analyze characters.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => setCurrentTab(0)}
                  >
                    Go to Upload
                  </Button>
                </Box>
              )}
            </Paper>
          </TabPanel>

          <TabPanel value={currentTab} index={4}>
            {/* Schedule Tab */}
            <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)' }}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Schedule Creation
              </Typography>
              {scriptData && characterData ? (
                <Box>
                  {!scheduleData ? (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Configure Schedule Parameters
                      </Typography>
                      
                      <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Basic Settings
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={handleDateChange}
                                sx={{ mb: 3, width: '100%' }}
                              />
                            </LocalizationProvider>
                            
                            <FormControl fullWidth sx={{ mb: 2 }}>
                              <InputLabel>Max Hours Per Day</InputLabel>
                              <Select
                                value={scheduleConstraints.max_hours_per_day}
                                label="Max Hours Per Day"
                                onChange={(e) => setScheduleConstraints({
                                  ...scheduleConstraints,
                                  max_hours_per_day: Number(e.target.value)
                                })}
                              >
                                <MenuItem value={8}>8 Hours</MenuItem>
                                <MenuItem value={10}>10 Hours</MenuItem>
                                <MenuItem value={12}>12 Hours</MenuItem>
                                <MenuItem value={14}>14 Hours</MenuItem>
                              </Select>
                            </FormControl>
                            
                            <FormControl fullWidth sx={{ mb: 2 }}>
                              <InputLabel>Meal Break Duration (minutes)</InputLabel>
                              <Select
                                value={scheduleConstraints.meal_break_duration}
                                label="Meal Break Duration (minutes)"
                                onChange={(e) => setScheduleConstraints({
                                  ...scheduleConstraints,
                                  meal_break_duration: Number(e.target.value)
                                })}
                              >
                                <MenuItem value={30}>30 Minutes</MenuItem>
                                <MenuItem value={45}>45 Minutes</MenuItem>
                                <MenuItem value={60}>60 Minutes</MenuItem>
                                <MenuItem value={90}>90 Minutes</MenuItem>
                              </Select>
                            </FormControl>
                            
                            <FormControl fullWidth>
                              <InputLabel>Company Moves Per Day</InputLabel>
                              <Select
                                value={scheduleConstraints.company_moves_per_day}
                                label="Company Moves Per Day"
                                onChange={(e) => setScheduleConstraints({
                                  ...scheduleConstraints,
                                  company_moves_per_day: Number(e.target.value)
                                })}
                              >
                                <MenuItem value={1}>1 Move</MenuItem>
                                <MenuItem value={2}>2 Moves</MenuItem>
                                <MenuItem value={3}>3 Moves</MenuItem>
                                <MenuItem value={4}>4 Moves</MenuItem>
                              </Select>
                            </FormControl>
                          </Paper>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Weather Constraints
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                              Select weather conditions to avoid during shooting
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                              {["Rain", "Snow", "High Winds", "Extreme Heat", "Fog", "Thunderstorms"].map((weather) => (
                                <Chip
                                  key={weather}
                                  label={weather}
                                  color={locationConstraints.avoid_weather.includes(weather) ? "primary" : "default"}
                                  onClick={() => {
                                    const newAvoidWeather = locationConstraints.avoid_weather.includes(weather)
                                      ? locationConstraints.avoid_weather.filter(w => w !== weather)
                                      : [...locationConstraints.avoid_weather, weather];
                                    
                                    setLocationConstraints({
                                      ...locationConstraints,
                                      avoid_weather: newAvoidWeather
                                    });
                                  }}
                                  sx={{ m: 0.5 }}
                                />
                              ))}
                            </Box>
                            
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Preferred Locations
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                              Add any preferred locations for shooting
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <TextField
                                label="Add Location"
                                variant="outlined"
                                size="small"
                                fullWidth
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && (e.currentTarget as HTMLInputElement).value) {
                                    setLocationConstraints({
                                      ...locationConstraints,
                                      preferred_locations: [
                                        ...locationConstraints.preferred_locations,
                                        (e.currentTarget as HTMLInputElement).value
                                      ]
                                    });
                                    (e.target as HTMLInputElement).value = '';
                                  }
                                }}
                              />
                              <IconButton 
                                color="primary"
                                onClick={(e) => {
                                  const input = e.currentTarget.previousSibling as HTMLInputElement;
                                  if (input && input.value) {
                                    const newLocation = input.value;
                                    setLocationConstraints({
                                      ...locationConstraints,
                                      preferred_locations: [
                                        ...locationConstraints.preferred_locations,
                                        newLocation
                                      ]
                                    });
                                    input.value = '';
                                  }
                                }}
                              >
                                <Add />
                              </IconButton>
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {locationConstraints.preferred_locations.map((location, index) => (
                                <Chip
                                  key={index}
                                  label={location}
                                  onDelete={() => {
                                    setLocationConstraints({
                                      ...locationConstraints,
                                      preferred_locations: locationConstraints.preferred_locations.filter((_, i) => i !== index)
                                    });
                                  }}
                                  sx={{ m: 0.5 }}
                                />
                              ))}
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                      
                      <Button
                        variant="contained"
                        onClick={createSchedule}
                        disabled={loading}
                        size="large"
                        startIcon={<CalendarMonth />}
                        color="primary"
                        sx={{
                          py: 1.5,
                          px: 4
                        }}
                      >
                        Generate Production Schedule
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {/* Schedule View Tabs */}
                      <Tabs
                        value={scheduleView}
                        onChange={(e, newValue) => setScheduleView(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
                      >
                        <Tab label="Calendar View" value="calendar" icon={<CalendarMonth />} iconPosition="start" />
                        <Tab label="Schedule List" value="list" icon={<ViewList />} iconPosition="start" />
                        <Tab label="Location Plan" value="location" icon={<LocationOn />} iconPosition="start" />
                        <Tab label="Crew Allocation" value="crew" icon={<People />} iconPosition="start" />
                        <Tab label="Equipment" value="equipment" icon={<CameraAlt />} iconPosition="start" />
                        <Tab label="Department" value="department" icon={<Settings />} iconPosition="start" />
                        <Tab label="Call Sheets" value="callsheet" icon={<Description />} iconPosition="start" />
                        <Tab label="Raw Data" value="raw" icon={<Code />} iconPosition="start" />
                      </Tabs>
                      
                      {/* Calendar View */}
                      {scheduleView === 'calendar' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Calendar View</Typography>
                          <Grid container spacing={3}>
                            {scheduleData.schedule?.map((day: any, index: number) => (
                              <Grid item xs={12} key={index}>
                                <Card sx={{ mb: 2 }}>
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                      Day {day.day} - {format(new Date(day.date), 'MMMM d, yyyy')}
                                    </Typography>
                                    
                                    {day.scenes.map((scene: any, sceneIndex: number) => (
                                      <Paper 
                                        key={sceneIndex} 
                                        sx={{ 
                                          p: 2, 
                                          mb: 2, 
                                          borderLeft: '4px solid', 
                                          borderColor: 'primary.main' 
                                        }}
                                      >
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} md={4}>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                              Scene {scene.scene_id}
                                            </Typography>
                                            <Typography variant="body2">
                                              Location: {scene.location_id}
                                            </Typography>
                                            <Typography variant="body2">
                                              Time: {scene.start_time} - {scene.end_time}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={4}>
                                            <Typography variant="body2">
                                              Setup: {scene.setup_time}
                                            </Typography>
                                            <Typography variant="body2">
                                              Wrap: {scene.wrap_time}
                                            </Typography>
                                            {scene.breaks && scene.breaks.length > 0 && (
                                              <Typography variant="body2">
                                                Breaks: {scene.breaks.map((b: any) => b.type).join(', ')}
                                              </Typography>
                                            )}
                                          </Grid>
                                          <Grid item xs={12} md={4}>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                              {scene.crew_ids?.slice(0, 3).map((crew: string, i: number) => (
                                                <Chip key={i} label={crew} size="small" variant="outlined" />
                                              ))}
                                              {scene.crew_ids?.length > 3 && (
                                                <Chip 
                                                  label={`+${scene.crew_ids.length - 3} more`} 
                                                  size="small" 
                                                  variant="outlined" 
                                                />
                                              )}
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      </Paper>
                                    ))}
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      )}
                      
                      {/* Schedule List */}
                      {scheduleView === 'list' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Schedule List</Typography>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Day</TableCell>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Scene</TableCell>
                                  <TableCell>Location</TableCell>
                                  <TableCell>Start Time</TableCell>
                                  <TableCell>End Time</TableCell>
                                  <TableCell>Duration</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {scheduleData.schedule?.map((day: any) => (
                                  day.scenes.map((scene: any, sceneIndex: number) => (
                                    <TableRow key={`${day.day}-${sceneIndex}`}>
                                      <TableCell>{day.day}</TableCell>
                                      <TableCell>{format(new Date(day.date), 'MM/dd/yyyy')}</TableCell>
                                      <TableCell>Scene {scene.scene_id}</TableCell>
                                      <TableCell>{scene.location_id}</TableCell>
                                      <TableCell>{scene.start_time}</TableCell>
                                      <TableCell>{scene.end_time}</TableCell>
                                      <TableCell>
                                        {scene.duration_minutes ? `${scene.duration_minutes} min` : 'N/A'}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                      
                      {/* Location Plan */}
                      {scheduleView === 'location' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Location Plan</Typography>
                          {scheduleData.location_plan?.locations ? (
                            <Grid container spacing={3}>
                              {scheduleData.location_plan.locations.map((location: any, index: number) => (
                                <Grid item xs={12} md={6} key={index}>
                                  <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                      <Typography variant="subtitle1" fontWeight="bold">
                                        {location.name} ({location.id})
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Typography variant="body2" paragraph>
                                        <strong>Address:</strong> {location.address}
                                      </Typography>
                                      <Typography variant="body2" paragraph>
                                        <strong>Scenes:</strong> {location.scenes.join(', ')}
                                      </Typography>
                                      <Typography variant="body2" paragraph>
                                        <strong>Setup Time:</strong> {location.setup_time_minutes} minutes
                                      </Typography>
                                      <Typography variant="body2" paragraph>
                                        <strong>Wrap Time:</strong> {location.wrap_time_minutes} minutes
                                      </Typography>
                                      
                                      <Typography variant="subtitle2" gutterBottom>Requirements:</Typography>
                                      <List dense>
                                        {location.requirements.map((req: string, i: number) => (
                                          <ListItem key={i}>
                                            <ListItemText primary={req} />
                                          </ListItem>
                                        ))}
                                      </List>
                                      
                                      {scheduleData.location_plan.weather_dependencies?.[location.id] && (
                                        <Box sx={{ mt: 2 }}>
                                          <Typography variant="subtitle2" gutterBottom>Weather Requirements:</Typography>
                                          <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                              <Typography variant="body2" gutterBottom>Preferred Conditions:</Typography>
                                              <List dense>
                                                {scheduleData.location_plan.weather_dependencies[location.id].preferred_conditions.map((cond: string, i: number) => (
                                                  <ListItem key={i}>
                                                    <ListItemText primary={cond} />
                                                  </ListItem>
                                                ))}
                                              </List>
                                            </Grid>
                                            <Grid item xs={6}>
                                              <Typography variant="body2" gutterBottom>Avoid Conditions:</Typography>
                                              <List dense>
                                                {scheduleData.location_plan.weather_dependencies[location.id].avoid_conditions.map((cond: string, i: number) => (
                                                  <ListItem key={i}>
                                                    <ListItemText primary={cond} />
                                                  </ListItem>
                                                ))}
                                              </List>
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No location plan data available.
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {/* Crew Allocation */}
                      {scheduleView === 'crew' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Crew Allocation</Typography>
                          {scheduleData.crew_allocation?.crew_assignments ? (
                            <Grid container spacing={3}>
                              {scheduleData.crew_allocation.crew_assignments.map((crew: any, index: number) => (
                                <Grid item xs={12} md={6} lg={4} key={index}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        {crew.crew_member}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {crew.role}
                                      </Typography>
                                      <Divider sx={{ my: 1 }} />
                                      <Typography variant="body2">
                                        <strong>Assigned Scenes:</strong> {crew.assigned_scenes.join(', ')}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Work Hours:</strong> {crew.work_hours}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Turnaround Hours:</strong> {crew.turnaround_hours}
                                      </Typography>
                                      <Typography variant="body2">
                                        <strong>Meal Break Interval:</strong> {crew.meal_break_interval} hours
                                      </Typography>
                                      
                                      {crew.equipment_assigned && crew.equipment_assigned.length > 0 && (
                                        <Box sx={{ mt: 1 }}>
                                          <Typography variant="body2" gutterBottom>
                                            <strong>Equipment Assigned:</strong>
                                          </Typography>
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {crew.equipment_assigned.map((equip: string, i: number) => (
                                              <Chip key={i} label={equip} size="small" />
                                            ))}
                                          </Box>
                                        </Box>
                                      )}
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No crew allocation data available.
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {/* Equipment */}
                      {scheduleView === 'equipment' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Equipment</Typography>
                          {scheduleData.crew_allocation?.equipment_assignments ? (
                            <TableContainer component={Paper}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Equipment ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Setup Time</TableCell>
                                    <TableCell>Assigned Scenes</TableCell>
                                    <TableCell>Assigned Crew</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {scheduleData.crew_allocation.equipment_assignments.map((equipment: any, index: number) => (
                                    <TableRow key={index}>
                                      <TableCell>{equipment.equipment_id}</TableCell>
                                      <TableCell>{equipment.type}</TableCell>
                                      <TableCell>{equipment.setup_time_minutes} minutes</TableCell>
                                      <TableCell>{equipment.assigned_scenes.join(', ')}</TableCell>
                                      <TableCell>{equipment.assigned_crew.join(', ')}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No equipment data available.
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {/* Department Schedules */}
                      {scheduleView === 'department' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Department Schedules</Typography>
                          {scheduleData.crew_allocation?.department_schedules ? (
                            <Grid container spacing={3}>
                              {Object.entries(scheduleData.crew_allocation.department_schedules).map(([deptName, deptInfo]: [string, any], index: number) => (
                                <Grid item xs={12} md={6} key={index}>
                                  <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                      <Typography variant="subtitle1" fontWeight="bold">
                                        {deptName.charAt(0).toUpperCase() + deptName.slice(1)}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                          <Typography variant="subtitle2" gutterBottom>Crew:</Typography>
                                          <List dense>
                                            {deptInfo.crew.map((crew: string, i: number) => (
                                              <ListItem key={i}>
                                                <ListItemText primary={crew} />
                                              </ListItem>
                                            ))}
                                          </List>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <Typography variant="subtitle2" gutterBottom>Equipment:</Typography>
                                          <List dense>
                                            {deptInfo.equipment.map((equip: string, i: number) => (
                                              <ListItem key={i}>
                                                <ListItemText primary={equip} />
                                              </ListItem>
                                            ))}
                                          </List>
                                        </Grid>
                                      </Grid>
                                      
                                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Notes:</Typography>
                                      <List dense>
                                        {deptInfo.notes.map((note: string, i: number) => (
                                          <ListItem key={i}>
                                            <ListItemText primary={note} />
                                          </ListItem>
                                        ))}
                                      </List>
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No department schedule data available.
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {/* Call Sheets */}
                      {scheduleView === 'callsheet' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Call Sheets</Typography>
                          {scheduleData.schedule ? (
                            <Accordion>
                              {scheduleData.schedule.map((day: any, dayIndex: number) => (
                                <Accordion key={dayIndex}>
                                  <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      Day {day.day} - {format(new Date(day.date), 'MMMM d, yyyy')}
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    {day.scenes.map((scene: any, sceneIndex: number) => (
                                      <Paper key={sceneIndex} sx={{ p: 2, mb: 2 }}>
                                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                          Scene {scene.scene_id}
                                        </Typography>
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} md={4}>
                                            <Typography variant="body2">
                                              <strong>Location:</strong> {scene.location_id}
                                            </Typography>
                                            <Typography variant="body2">
                                              <strong>Time:</strong> {scene.start_time} - {scene.end_time}
                                            </Typography>
                                            <Typography variant="body2">
                                              <strong>Setup:</strong> {scene.setup_time}
                                            </Typography>
                                            <Typography variant="body2">
                                              <strong>Wrap:</strong> {scene.wrap_time}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={4}>
                                            <Typography variant="body2" gutterBottom>
                                              <strong>Crew:</strong>
                                            </Typography>
                                            <List dense>
                                              {scene.crew_ids?.map((crew: string, i: number) => (
                                                <ListItem key={i} disablePadding>
                                                  <ListItemText primary={crew} />
                                                </ListItem>
                                              ))}
                                            </List>
                                          </Grid>
                                          <Grid item xs={12} md={4}>
                                            <Typography variant="body2" gutterBottom>
                                              <strong>Equipment:</strong>
                                            </Typography>
                                            <List dense>
                                              {scene.equipment_ids?.map((equip: string, i: number) => (
                                                <ListItem key={i} disablePadding>
                                                  <ListItemText primary={equip} />
                                                </ListItem>
                                              ))}
                                            </List>
                                          </Grid>
                                        </Grid>
                                      </Paper>
                                    ))}
                                  </AccordionDetails>
                                </Accordion>
                              ))}
                            </Accordion>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No call sheet data available.
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {/* Raw Data */}
                      {scheduleView === 'raw' && (
                        <Box>
                          <Typography variant="h6" gutterBottom>Raw Schedule Data</Typography>
                          <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                            <Button
                              variant="outlined"
                              startIcon={<Download />}
                              onClick={() => {
                                const jsonStr = JSON.stringify(scheduleData, null, 2);
                                const blob = new Blob([jsonStr], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'schedule_data.json';
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              }}
                            >
                              Download Schedule Data
                            </Button>
                          </Box>
                          <Paper sx={{ p: 2, maxHeight: '500px', overflow: 'auto' }}>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                              {JSON.stringify(scheduleData, null, 2)}
                            </pre>
                          </Paper>
                        </Box>
                      )}
                      
                      {/* Generate Budget Button */}
                      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          startIcon={<AttachMoney />}
                          onClick={() => setCurrentTab(5)}
                          sx={{ py: 1.5, px: 4 }}
                        >
                          Continue to Budget Creation
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  {/* Navigation buttons */}
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      startIcon={<ArrowBack />}
                      onClick={() => setCurrentTab(3)}
                    >
                      Back to Character Breakdown
                    </Button>
                    {scheduleData && (
                      <Button
                        variant="contained"
                        endIcon={<ArrowForward />}
                        onClick={() => setCurrentTab(5)}
                      >
                        Continue to Budget
                      </Button>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Please complete script analysis and character breakdown first.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => setCurrentTab(0)}
                  >
                    Go to Upload
                  </Button>
                </Box>
              )}
            </Paper>
          </TabPanel>

          <TabPanel value={currentTab} index={5}>
            {/* Budget Tab */}
            <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)' }}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Budget Creation
              </Typography>
              {scheduleData ? (
                <Box>
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Production Constraints</Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                              <InputLabel>Production Quality Level</InputLabel>
                              <Select
                                value={budgetQualityLevel}
                                onChange={(e) => setBudgetQualityLevel(e.target.value as 'High' | 'Medium' | 'Low')}
                              >
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                              <InputLabel>Equipment Preference</InputLabel>
                              <Select
                                value={equipmentPreference}
                                onChange={(e) => setEquipmentPreference(e.target.value as 'Premium' | 'Standard' | 'Budget')}
                              >
                                <MenuItem value="Premium">Premium</MenuItem>
                                <MenuItem value="Standard">Standard</MenuItem>
                                <MenuItem value="Budget">Budget</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                              <InputLabel>Crew Size</InputLabel>
                              <Select
                                value={crewSize}
                                onChange={(e) => setCrewSize(e.target.value as 'Large' | 'Medium' | 'Small')}
                              >
                                <MenuItem value="Large">Large</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Small">Small</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Target Budget (Optional)</Typography>
                        <TextField
                          type="number"
                          value={targetBudget}
                          onChange={(e) => setTargetBudget(Number(e.target.value))}
                          InputProps={{
                            startAdornment: <AttachMoney />,
                          }}
                          sx={{ width: 300 }}
                        />
                      </Box>
                      
                      <Button
                        variant="contained"
                        onClick={createBudget}
                        disabled={loading}
                        size="large"
                        sx={{
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                            : 'linear-gradient(90deg, #4361ee, #f72585)',
                          py: 1.5,
                          px: 4,
                        }}
                      >
                        Generate Budget
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {/* Budget Tabs */}
                      <Box sx={{ mb: 4 }}>
                        <Tabs
                          value={budgetView}
                          onChange={(e, newValue) => setBudgetView(newValue)}
                          variant="scrollable"
                          scrollButtons="auto"
                          sx={{
                            mb: 3,
                            '& .MuiTab-root': {
                              minWidth: 'auto',
                              px: 3,
                              py: 1.5,
                              borderRadius: 2,
                              mr: 1,
                              fontWeight: 600,
                            },
                          }}
                        >
                          <Tab value="overview" label="Budget Overview" />
                          <Tab value="location" label="Location Details" />
                          <Tab value="equipment" label="Equipment & Personnel" />
                          <Tab value="logistics" label="Logistics & Insurance" />
                          <Tab value="vendor" label="Vendor Analysis" />
                          <Tab value="cashflow" label="Cash Flow" />
                          <Tab value="scenario" label="Scenario Analysis" />
                        </Tabs>
                      </Box>

                      {/* Budget Overview */}
                      {budgetView === 'overview' && (
                        <Box>
                          {/* Budget Summary */}
                          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            💰 Total Budget: ${budgetData.total_estimates?.grand_total?.toLocaleString() || budgetData.total_budget?.toLocaleString()}
                          </Typography>
                          
                          <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6">Location Costs</Typography>
                                  <Typography variant="h4" color="primary">
                                    ${budgetData.total_estimates?.total_location_costs?.toLocaleString() || 'N/A'}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6">Equipment Costs</Typography>
                                  <Typography variant="h4" color="primary">
                                    ${budgetData.total_estimates?.total_equipment_costs?.toLocaleString() || 'N/A'}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6">Personnel Costs</Typography>
                                  <Typography variant="h4" color="primary">
                                    ${budgetData.total_estimates?.total_personnel_costs?.toLocaleString() || 'N/A'}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6">Logistics Costs</Typography>
                                  <Typography variant="h4" color="primary">
                                    ${budgetData.total_estimates?.total_logistics_costs?.toLocaleString() || 'N/A'}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6">Insurance Costs</Typography>
                                  <Typography variant="h4" color="primary">
                                    ${budgetData.total_estimates?.total_insurance_costs?.toLocaleString() || 'N/A'}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card>
                                <CardContent>
                                  <Typography variant="h6">Contingency</Typography>
                                  <Typography variant="h4" color="primary">
                                    ${budgetData.total_estimates?.contingency_amount?.toLocaleString() || budgetData.contingency?.toLocaleString() || 'N/A'}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>

                          {/* Cost Distribution Pie Chart */}
                          <Card sx={{ mb: 4, p: 2 }}>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>Cost Distribution</Typography>
                              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                Visual representation of budget allocation across major categories
                              </Typography>
                              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Placeholder for chart - in a real app, you'd use a charting library */}
                                <Typography color="textSecondary">
                                  [Pie Chart Visualization Would Appear Here]
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      )}

                      {/* Location Details */}
                      {budgetView === 'location' && (
                        <Box>
                          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            📍 Location Costs Breakdown
                          </Typography>
                          
                          {budgetData.location_costs ? (
                            Object.entries(budgetData.location_costs).map(([locId, locData]: [string, any], index) => (
                              <Accordion key={index} defaultExpanded={index === 0}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    Location: {locId}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                      <Typography variant="body1">
                                        <strong>Daily Rate:</strong> ${locData.daily_rate?.toLocaleString()}
                                      </Typography>
                                      <Typography variant="body1">
                                        <strong>Permit Costs:</strong> ${locData.permit_costs?.toLocaleString()}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                      <Typography variant="body1">
                                        <strong>Total Days:</strong> {locData.total_days}
                                      </Typography>
                                      <Typography variant="body1">
                                        <strong>Total Cost:</strong> ${locData.total_cost?.toLocaleString()}
                                      </Typography>
                                    </Grid>
                                    
                                    {locData.additional_fees && locData.additional_fees.length > 0 && (
                                      <Grid item xs={12}>
                                        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                                          Additional Fees:
                                        </Typography>
                                        <List dense>
                                          {locData.additional_fees.map((fee: string, i: number) => (
                                            <ListItem key={i}>
                                              <ListItemText primary={fee} />
                                            </ListItem>
                                          ))}
                                        </List>
                                      </Grid>
                                    )}
                                  </Grid>
                                </AccordionDetails>
                              </Accordion>
                            ))
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No detailed location cost data available.
                            </Typography>
                          )}
                        </Box>
                      )}

                      {/* Equipment & Personnel */}
                      {budgetView === 'equipment' && (
                        <Box>
                          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            🎥 Equipment & Personnel Costs
                          </Typography>
                          
                          {/* Equipment Costs */}
                          <Typography variant="h6" gutterBottom>Equipment Costs</Typography>
                          {budgetData.equipment_costs ? (
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                              {Object.entries(budgetData.equipment_costs).map(([equipType, equipData]: [string, any], index) => (
                                <Grid item xs={12} md={6} key={index}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                        {equipType.charAt(0).toUpperCase() + equipType.slice(1)} Equipment
                                      </Typography>
                                      
                                      {equipData.items && (
                                        <Box sx={{ mb: 2 }}>
                                          <Typography variant="subtitle2" gutterBottom>Items:</Typography>
                                          <List dense>
                                            {equipData.items.map((item: string, i: number) => (
                                              <ListItem key={i} disablePadding>
                                                <ListItemText 
                                                  primary={`${item}: $${equipData.rental_rates?.[item]?.toLocaleString() || 'N/A'}/day`} 
                                                />
                                              </ListItem>
                                            ))}
                                          </List>
                                        </Box>
                                      )}
                                      
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Typography>Insurance Costs:</Typography>
                                        <Typography>${equipData.insurance_costs?.toLocaleString() || 'N/A'}</Typography>
                                      </Box>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                        <Typography fontWeight={600}>Total Cost:</Typography>
                                        <Typography fontWeight={600}>${equipData.total_cost?.toLocaleString() || 'N/A'}</Typography>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                              No detailed equipment cost data available.
                            </Typography>
                          )}
                          
                          {/* Personnel Costs */}
                          <Divider sx={{ my: 4 }} />
                          <Typography variant="h6" gutterBottom>Personnel Costs</Typography>
                          {budgetData.personnel_costs ? (
                            <Grid container spacing={3}>
                              {Object.entries(budgetData.personnel_costs).map(([role, roleData]: [string, any], index) => (
                                <Grid item xs={12} md={6} key={index}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                        {role.charAt(0).toUpperCase() + role.slice(1).replace(/_/g, ' ')}
                                      </Typography>
                                      
                                      <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                          <Typography variant="body2">Daily Rate:</Typography>
                                          <Typography variant="body1">${roleData.daily_rate?.toLocaleString() || 'N/A'}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography variant="body2">Overtime Rate:</Typography>
                                          <Typography variant="body1">${roleData.overtime_rate?.toLocaleString() || 'N/A'}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography variant="body2">Total Days:</Typography>
                                          <Typography variant="body1">{roleData.total_days || 'N/A'}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography variant="body2">Benefits:</Typography>
                                          <Typography variant="body1">${roleData.benefits?.toLocaleString() || 'N/A'}</Typography>
                                        </Grid>
                                      </Grid>
                                      
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Typography fontWeight={600}>Total Cost:</Typography>
                                        <Typography fontWeight={600}>${roleData.total_cost?.toLocaleString() || 'N/A'}</Typography>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No detailed personnel cost data available.
                            </Typography>
                          )}
                        </Box>
                      )}

                      {/* Logistics & Insurance */}
                      {budgetView === 'logistics' && (
                        <Box>
                          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            🚛 Logistics & Insurance
                          </Typography>
                          
                          {/* Logistics Costs */}
                          <Typography variant="h6" gutterBottom>Logistics Costs</Typography>
                          {budgetData.logistics_costs ? (
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                              <Grid item xs={12} md={4}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                      Transportation
                                    </Typography>
                                    {budgetData.logistics_costs.transportation && (
                                      <List dense>
                                        {Object.entries(budgetData.logistics_costs.transportation).map(([item, cost]: [string, any], i) => (
                                          <ListItem key={i} disablePadding>
                                            <ListItemText 
                                              primary={`${item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' ')}`}
                                              secondary={`$${cost?.toLocaleString() || 'N/A'}`}
                                            />
                                          </ListItem>
                                        ))}
                                      </List>
                                    )}
                                  </CardContent>
                                </Card>
                              </Grid>
                              
                              <Grid item xs={12} md={4}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                      Accommodation
                                    </Typography>
                                    {budgetData.logistics_costs.accommodation && (
                                      <List dense>
                                        {Object.entries(budgetData.logistics_costs.accommodation).map(([item, cost]: [string, any], i) => (
                                          <ListItem key={i} disablePadding>
                                            <ListItemText 
                                              primary={`${item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' ')}`}
                                              secondary={`$${cost?.toLocaleString() || 'N/A'}`}
                                            />
                                          </ListItem>
                                        ))}
                                      </List>
                                    )}
                                  </CardContent>
                                </Card>
                              </Grid>
                              
                              <Grid item xs={12} md={4}>
                                <Card>
                                  <CardContent>
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                      Catering
                                    </Typography>
                                    {budgetData.logistics_costs.catering && (
                                      <List dense>
                                        {Object.entries(budgetData.logistics_costs.catering).map(([item, cost]: [string, any], i) => (
                                          <ListItem key={i} disablePadding>
                                            <ListItemText 
                                              primary={`${item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' ')}`}
                                              secondary={`$${cost?.toLocaleString() || 'N/A'}`}
                                            />
                                          </ListItem>
                                        ))}
                                      </List>
                                    )}
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                          ) : (
                            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                              No detailed logistics cost data available.
                            </Typography>
                          )}
                          
                          {/* Insurance & Contingency */}
                          <Divider sx={{ my: 4 }} />
                          <Typography variant="h6" gutterBottom>Insurance & Contingency</Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Card>
                                <CardContent>
                                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Insurance
                                  </Typography>
                                  {budgetData.insurance_costs ? (
                                    <List dense>
                                      {Object.entries(budgetData.insurance_costs).map(([type, cost]: [string, any], i) => (
                                        <ListItem key={i} disablePadding>
                                          <ListItemText 
                                            primary={`${type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ')}`}
                                            secondary={`$${cost?.toLocaleString() || 'N/A'}`}
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  ) : (
                                    <Typography variant="body1" color="textSecondary">
                                      No detailed insurance data available.
                                    </Typography>
                                  )}
                                </CardContent>
                              </Card>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <Card>
                                <CardContent>
                                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Contingency
                                  </Typography>
                                  {budgetData.contingency ? (
                                    <Box>
                                      <Typography variant="body1">
                                        <strong>Percentage:</strong> {budgetData.contingency.percentage || 'N/A'}%
                                      </Typography>
                                      <Typography variant="body1">
                                        <strong>Amount:</strong> ${budgetData.contingency.amount?.toLocaleString() || 'N/A'}
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <Typography variant="body1" color="textSecondary">
                                      No detailed contingency data available.
                                    </Typography>
                                  )}
                                </CardContent>
                              </Card>
                            </Grid>
                          </Grid>
                        </Box>
                      )}

                      {/* Vendor Analysis */}
                      {budgetView === 'vendor' && (
                        <Box>
                          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            Vendor Analysis
                          </Typography>
                          
                          {budgetData.vendor_status ? (
                            <Box>
                              <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={4}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Total Vendors</Typography>
                                      <Typography variant="h4" color="primary">
                                        {budgetData.vendor_status.total_vendors || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Total Spend</Typography>
                                      <Typography variant="h4" color="primary">
                                        ${budgetData.vendor_status.total_spend?.toLocaleString() || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Outstanding Payments</Typography>
                                      <Typography variant="h4" color="primary">
                                        ${budgetData.vendor_status.outstanding_payments?.toLocaleString() || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              </Grid>
                              
                              {/* Vendor Performance Chart */}
                              <Card sx={{ mb: 4, p: 2 }}>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>Vendor Performance Scores</Typography>
                                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography color="textSecondary">
                                      [Vendor Performance Chart Would Appear Here]
                                    </Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                              
                              {/* Vendor Details */}
                              <Typography variant="h6" gutterBottom>Vendor Details</Typography>
                              {budgetData.vendor_status.spend_by_vendor && (
                                <TableContainer component={Paper}>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Vendor</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Total Spend</TableCell>
                                        <TableCell>Status</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {Object.entries(budgetData.vendor_status.spend_by_vendor).map(([vendor, data]: [string, any], index) => (
                                        <TableRow key={index}>
                                          <TableCell>{vendor}</TableCell>
                                          <TableCell>{data.category || 'N/A'}</TableCell>
                                          <TableCell>${data.total_spend?.toLocaleString() || 'N/A'}</TableCell>
                                          <TableCell>
                                            <Chip 
                                              label={data.status || 'Active'} 
                                              color={data.status === 'Paid' ? 'success' : 'primary'} 
                                              size="small" 
                                            />
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              )}
                            </Box>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No vendor analysis data available.
                            </Typography>
                          )}
                        </Box>
                      )}

                      {/* Cash Flow */}
                      {budgetView === 'cashflow' && (
                        <Box>
                          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            Cash Flow Analysis
                          </Typography>
                          
                          {budgetData.cash_flow_status ? (
                            <Box>
                              <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={6}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Current Balance</Typography>
                                      <Typography variant="h4" color="primary">
                                        ${budgetData.cash_flow_status.current_balance?.toLocaleString() || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Upcoming Payments</Typography>
                                      <Typography variant="h4" color="primary">
                                        ${budgetData.cash_flow_status.upcoming_total?.toLocaleString() || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              </Grid>
                              
                              <Alert 
                                severity={
                                  budgetData.cash_flow_status.health_status === 'good' ? 'success' : 
                                  budgetData.cash_flow_status.health_status === 'warning' ? 'warning' : 'info'
                                }
                                sx={{ mb: 4 }}
                              >
                                Cash Flow Health Status: {budgetData.cash_flow_status.health_status?.charAt(0).toUpperCase() + budgetData.cash_flow_status.health_status?.slice(1) || 'Unknown'}
                              </Alert>
                              
                              {/* Recommendations */}
                              {budgetData.cash_flow_status.recommendations && (
                                <Card sx={{ mb: 4 }}>
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>Recommendations</Typography>
                                    <List>
                                      {budgetData.cash_flow_status.recommendations.map((rec: string, i: number) => (
                                        <ListItem key={i}>
                                          <ListItemText primary={rec} />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </CardContent>
                                </Card>
                              )}
                              
                              {/* Cash Flow Projection Chart */}
                              <Card sx={{ mb: 4, p: 2 }}>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>Cash Flow Projections</Typography>
                                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography color="textSecondary">
                                      [Cash Flow Projection Chart Would Appear Here]
                                    </Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Box>
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No cash flow analysis data available.
                            </Typography>
                          )}
                        </Box>
                      )}

                      {/* Scenario Analysis */}
                      {budgetView === 'scenario' && (
                        <Box>
                          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            Scenario Analysis
                          </Typography>
                          
                          <Card sx={{ mb: 4 }}>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>Select Scenario</Typography>
                              <FormControl fullWidth sx={{ mb: 3 }}>
                                <Select
                                  value="base"
                                  onChange={(e) => console.log(e.target.value)}
                                >
                                  <MenuItem value="base">Base</MenuItem>
                                  <MenuItem value="optimistic">Optimistic</MenuItem>
                                  <MenuItem value="conservative">Conservative</MenuItem>
                                  <MenuItem value="aggressive">Aggressive Cost Cutting</MenuItem>
                                </Select>
                              </FormControl>
                              
                              <Typography variant="h6" gutterBottom>Scenario Parameters</Typography>
                              <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item xs={12}>
                                  <Typography gutterBottom>Quality Impact Tolerance</Typography>
                                  <Slider
                                    defaultValue={50}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography gutterBottom>Timeline Flexibility (days)</Typography>
                                  <Slider
                                    defaultValue={5}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={30}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography gutterBottom>Risk Tolerance</Typography>
                                  <ToggleButtonGroup
                                    value="medium"
                                    exclusive
                                    onChange={(e, value) => console.log(value)}
                                    fullWidth
                                  >
                                    <ToggleButton value="low">Low</ToggleButton>
                                    <ToggleButton value="medium">Medium</ToggleButton>
                                    <ToggleButton value="high">High</ToggleButton>
                                  </ToggleButtonGroup>
                                </Grid>
                              </Grid>
                              
                              <Button
                                variant="contained"
                                onClick={() => optimizeBudget('base')}
                                disabled={loading}
                              >
                                Run Scenario Analysis
                              </Button>
                            </CardContent>
                          </Card>
                          
                          {budgetData.scenario_results && (
                            <Box>
                              <Typography variant="h6" gutterBottom>Scenario Comparison</Typography>
                              <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={4}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Original Total</Typography>
                                      <Typography variant="h4" color="primary">
                                        ${budgetData.total_estimates?.grand_total?.toLocaleString() || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Optimized Total</Typography>
                                      <Typography variant="h4" color="primary">
                                        ${budgetData.scenario_results.optimized_budget?.total_estimates?.grand_total?.toLocaleString() || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Card>
                                    <CardContent>
                                      <Typography variant="h6">Potential Savings</Typography>
                                      <Typography variant="h4" color="success.main">
                                        ${(
                                          (budgetData.total_estimates?.grand_total || 0) - 
                                          (budgetData.scenario_results.optimized_budget?.total_estimates?.grand_total || 0)
                                        ).toLocaleString() || 'N/A'}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              </Grid>
                              
                              {/* Impact Analysis */}
                              {budgetData.scenario_results.impact_analysis && (
                                <Card sx={{ mb: 4 }}>
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>Impact Analysis</Typography>
                                    <Grid container spacing={3}>
                                      <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle2">Quality Impact:</Typography>
                                        <Typography>
                                          {budgetData.scenario_results.impact_analysis.quality_impact?.level || 'Unknown'}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle2">Timeline Impact:</Typography>
                                        <Typography>
                                          {budgetData.scenario_results.impact_analysis.timeline_impact?.delay_days || 0} days
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle2">Risk Assessment:</Typography>
                                        <List dense>
                                          {budgetData.scenario_results.impact_analysis.risk_assessment?.map((risk: string, i: number) => (
                                            <ListItem key={i} disablePadding>
                                              <ListItemText primary={risk} />
                                            </ListItem>
                                          ))}
                                        </List>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                </Card>
                              )}
                              
                              {/* Recommendations */}
                              {budgetData.scenario_results.recommendations && (
                                <Card>
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>Recommendations</Typography>
                                    <List>
                                      {budgetData.scenario_results.recommendations.map((rec: any, i: number) => (
                                        <ListItem key={i}>
                                          <ListItemText 
                                            primary={rec.action} 
                                            secondary={`Priority: ${rec.priority} | Timeline: ${rec.timeline}`} 
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </CardContent>
                                </Card>
                              )}
                            </Box>
                          )}
                        </Box>
                      )}
                  {!budgetData ? (
                    <Button
                      variant="contained"
                      onClick={createBudget}
                      disabled={loading}
                      sx={{
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                          : 'linear-gradient(90deg, #4361ee, #f72585)',
                      }}
                    >
                      Create Budget
                    </Button>
                  ) : (
                    <Box>
                      {/* Budget Overview */}
                      <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)', mb: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                            : 'linear-gradient(90deg, #4361ee, #f72585)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}>
                          Budget Overview
                        </Typography>

                        {/* Budget Summary */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Total Budget</Typography>
                                <Typography variant="h4" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.grand_total?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Per Day Average</Typography>
                                <Typography variant="h4" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.per_day_average?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Contingency</Typography>
                                <Typography variant="h4" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.contingency_amount?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>

                        {/* Main Cost Categories */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Location Costs</Typography>
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.total_location_costs?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Equipment Costs</Typography>
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.total_equipment_costs?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Personnel Costs</Typography>
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.total_personnel_costs?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Logistics Costs</Typography>
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.total_logistics_costs?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card>
                              <CardContent>
                                <Typography variant="h6">Insurance Costs</Typography>
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                  ${budgetData?.total_estimates?.total_insurance_costs?.toLocaleString() || '0'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>

                        {/* Cost Distribution Chart */}
                        {budgetData?.total_estimates && (
                          <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" gutterBottom>Cost Distribution</Typography>
                            <Box sx={{ height: 400 }}>
                              <ResponsivePie
                                data={[
                                  {
                                    id: 'Location',
                                    value: budgetData.total_estimates.total_location_costs || 0,
                                    label: 'Location'
                                  },
                                  {
                                    id: 'Equipment',
                                    value: budgetData.total_estimates.total_equipment_costs || 0,
                                    label: 'Equipment'
                                  },
                                  {
                                    id: 'Personnel',
                                    value: budgetData.total_estimates.total_personnel_costs || 0,
                                    label: 'Personnel'
                                  },
                                  {
                                    id: 'Logistics',
                                    value: budgetData.total_estimates.total_logistics_costs || 0,
                                    label: 'Logistics'
                                  },
                                  {
                                    id: 'Insurance',
                                    value: budgetData.total_estimates.total_insurance_costs || 0,
                                    label: 'Insurance'
                                  },
                                  {
                                    id: 'Contingency',
                                    value: budgetData.total_estimates.contingency_amount || 0,
                                    label: 'Contingency'
                                  }
                                ]}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.5}
                                padAngle={0.7}
                                cornerRadius={3}
                                activeOuterRadiusOffset={8}
                                colors={{ scheme: 'nivo' }}
                                borderWidth={1}
                                borderColor={{ theme: 'background' }}
                                arcLinkLabelsSkipAngle={10}
                                arcLinkLabelsTextColor={theme.palette.text.primary}
                                arcLinkLabelsThickness={2}
                                arcLinkLabelsColor={{ from: 'color' }}
                                arcLabelsSkipAngle={10}
                                arcLabelsTextColor="white"
                                legends={[
                                  {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: theme.palette.text.primary,
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle'
                                  }
                                ]}
                              />
                            </Box>
                          </Box>
                        )}
                      </Paper>

                      {/* Insurance Breakdown */}
                      {budgetData.insurance && (
                        <Card sx={{ mb: 4 }}>
                          <CardHeader title="Insurance Breakdown" />
                          <CardContent>
                            <Grid container spacing={2}>
                              {Object.entries(budgetData.insurance).map(([type, cost]) => (
                                <Grid xs={12} md={4} key={type}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{type.replace('_', ' ').toUpperCase()}</Typography>
                                    <Typography>${(cost as number).toLocaleString()}</Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                        </Card>
                      )}

                      {/* Day-wise Budget Breakdown */}
                      <Typography variant="h5" sx={{ mb: 3 }}>Day-wise Budget Breakdown</Typography>
                      {budgetData.days?.map((day, index) => (
                        <Accordion key={index} sx={{ mb: 2 }}>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>
                              Day {index + 1}: ${day.total.toLocaleString()}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {/* Categories */}
                            <Typography variant="h6" gutterBottom>Categories</Typography>
                            {Object.entries(day.categories).map(([category, amount]) => (
                              <Box key={category} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>{category}</Typography>
                                <Typography>${(amount as number).toLocaleString()}</Typography>
                              </Box>
                            ))}

                            {/* Scene Costs */}
                            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Scene Costs</Typography>
                            {day.scenes.map((scene) => (
                              <Box key={scene.scene_number} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Scene {scene.scene_number}</Typography>
                                <Typography>${scene.cost?.toLocaleString()}</Typography>
                              </Box>
                            ))}

                            {/* Local Vendors */}
                            {day.local_vendors && day.local_vendors.length > 0 && (
                              <>
                                <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Local Vendors</Typography>
                                {day.local_vendors.map((vendor, vIndex) => (
                                  <Card key={vIndex} sx={{ mb: 2, p: 2 }}>
                                    <Typography variant="subtitle1">{vendor.name} ({vendor.type})</Typography>
                                    <Typography>Rate: {vendor.estimated_rate}</Typography>
                                    {vendor.contact && (
                                      <Typography variant="body2">Contact: {vendor.contact}</Typography>
                                    )}
                                  </Card>
                                ))}
                              </>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      ))}

                      {/* Download Button */}
                      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          onClick={() => {
                            const dataStr = JSON.stringify(budgetData, null, 2);
                            const blob = new Blob([dataStr], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'budget_estimate.json';
                            link.click();
                            URL.revokeObjectURL(url);
                          }}
                          startIcon={<Download />}
                        >
                          Download Budget (JSON)
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  Please complete scheduling first to create a budget.
                </Typography>
              )}
            </Paper>
          </TabPanel>

          <TabPanel value={currentTab} index={6}>
            {/* Storyboard Tab */}
            <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)' }}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Storyboard Generation
              </Typography>
              {scriptData ? (
                <Box>
                  {scriptData.scenes?.map((scene: any, index: number) => (
                    <Card key={index} sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Scene {scene.scene_number}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {scene.description}
                        </Typography>
                        {!scene.storyboard ? (
                          <Button
                            variant="contained"
                            onClick={() => generateStoryboard(scene.scene_id, scene.description)}
                            disabled={loading}
                            sx={{
                              mt: 2,
                              background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(90deg, #738bff, #ff5eb1)'
                                : 'linear-gradient(90deg, #4361ee, #f72585)',
                            }}
                          >
                            Generate Storyboard
                          </Button>
                        ) : (
                          <Box sx={{ mt: 2 }}>
                            <img
                              src={scene.storyboard}
                              alt={`Storyboard for Scene ${scene.scene_number}`}
                              style={{ maxWidth: '100%', borderRadius: 8 }}
                            />
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  Please upload or enter a script first to generate storyboards.
                </Typography>
              )}
            </Paper>
          </TabPanel>

          <TabPanel value={currentTab} index={7}>
            {/* Overview Tab */}
            <Paper sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(10px)' }}>
              <Typography variant="h4" gutterBottom fontWeight={700} sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #a4b8ff, #ff90d1)'
                  : 'linear-gradient(90deg, #4361ee, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Project Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Script Status
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Chip
                          label={scriptData ? 'Uploaded' : 'Not Started'}
                          color={scriptData ? 'success' : 'default'}
                        />
                        <Chip
                          label={oneLinerData ? 'One-Liner Generated' : 'One-Liner Pending'}
                          color={oneLinerData ? 'success' : 'default'}
                        />
                        <Chip
                          label={characterData ? 'Characters Analyzed' : 'Character Analysis Pending'}
                          color={characterData ? 'success' : 'default'}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Production Status
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Chip
                          label={scheduleData ? 'Schedule Created' : 'Schedule Pending'}
                          color={scheduleData ? 'success' : 'default'}
                        />
                        <Chip
                          label={budgetData ? 'Budget Created' : 'Budget Pending'}
                          color={budgetData ? 'success' : 'default'}
                        />
                        <Chip
                          label={storyboardData ? 'Storyboards Generated' : 'Storyboards Pending'}
                          color={storyboardData ? 'success' : 'default'}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Quick Actions
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => setCurrentTab(0)}
                          startIcon={<UploadFile />}
                        >
                          Upload New Script
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={clearAllData}
                          startIcon={<Refresh />}
                          color="error"
                        >
                          Reset Project
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}
