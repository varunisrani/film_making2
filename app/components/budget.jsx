import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  AttachMoney,
  LocationOn,
  CameraAlt,
  People,
  LocalShipping,
  Security,
  TrendingUp,
  Assessment,
  Refresh
} from '@mui/icons-material';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

export const BudgetTab = ({ scriptData, scheduleData, darkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [qualityLevel, setQualityLevel] = useState('Medium');
  const [equipmentPreference, setEquipmentPreference] = useState('Standard');
  const [crewSize, setCrewSize] = useState('Medium');
  const [targetBudget, setTargetBudget] = useState(0);
  const [scenarioType, setScenarioType] = useState('Base');
  const [riskTolerance, setRiskTolerance] = useState('Medium');
  const [timelineFlexibility, setTimelineFlexibility] = useState(5);
  const [qualityImpact, setQualityImpact] = useState(50);

  // Load budget data when component mounts
  useEffect(() => {
    const loadBudgetData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/storage/budget_results.json');
        if (!response.ok) {
          throw new Error('Failed to load budget data');
        }
        const result = await response.json();
        console.log('Loaded budget data:', result);
        
        // Extract the actual budget data from the response
        if (result.success && result.data) {
          setBudgetData(result.data);
        } else {
          throw new Error('Invalid budget data format');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading budget data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBudgetData();
  }, []);

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Budget Overview Section
  const BudgetOverview = ({ budgetData }) => {
    if (!budgetData) return null;

    // Add default values and null checks
    const totalBudget = budgetData.total_estimates?.grand_total || 0;
    const locationCosts = budgetData.total_estimates?.total_location_costs || 0;
    const equipmentCosts = budgetData.total_estimates?.total_equipment_costs || 0;
    const crewCosts = budgetData.total_estimates?.total_personnel_costs || 0;
    const otherCosts = (
      (budgetData.total_estimates?.total_logistics_costs || 0) +
      (budgetData.total_estimates?.total_insurance_costs || 0) +
      (budgetData.total_estimates?.contingency_amount || 0)
    );

    const data = [
      {
        id: 'Locations',
        label: 'Locations',
        value: locationCosts,
        color: 'hsl(45, 70%, 50%)'
      },
      {
        id: 'Equipment',
        label: 'Equipment',
        value: equipmentCosts,
        color: 'hsl(180, 70%, 50%)'
      },
      {
        id: 'Crew',
        label: 'Crew',
        value: crewCosts,
        color: 'hsl(270, 70%, 50%)'
      },
      {
        id: 'Other',
        label: 'Other',
        value: otherCosts,
        color: 'hsl(315, 70%, 50%)'
      }
    ];

    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Total Budget: {formatCurrency(totalBudget)}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Location Costs
                </Typography>
                <Typography variant="h5">
                  {formatCurrency(locationCosts)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Equipment Costs
                </Typography>
                <Typography variant="h5">
                  {formatCurrency(equipmentCosts)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Personnel Costs
                </Typography>
                <Typography variant="h5">
                  {formatCurrency(crewCosts)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ height: 400, mb: 4 }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={darkMode ? '#fff' : '#333'}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
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
                itemTextColor: darkMode ? '#fff' : '#333',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
              },
            ]}
          />
        </Box>
      </Box>
    );
  };

  // Location Details Section
  const LocationDetails = ({ data }) => {
    if (!data?.location_costs) return null;

    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Location Costs Breakdown
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Daily Rate</TableCell>
                <TableCell>Permit Costs</TableCell>
                <TableCell>Total Days</TableCell>
                <TableCell>Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data.location_costs).map(([locationId, details]) => (
                <TableRow key={locationId}>
                  <TableCell>{locationId}</TableCell>
                  <TableCell>{formatCurrency(details.daily_rate)}</TableCell>
                  <TableCell>{formatCurrency(details.permit_costs)}</TableCell>
                  <TableCell>{details.total_days}</TableCell>
                  <TableCell>{formatCurrency(details.total_cost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Equipment and Personnel Section
  const EquipmentPersonnel = ({ data }) => {
    if (!data?.equipment_costs || !data?.personnel_costs) return null;

    return (
      <Box>
        {/* Equipment Costs */}
        <Typography variant="h5" gutterBottom>
          Equipment Costs
        </Typography>
        {Object.entries(data.equipment_costs).map(([category, details]) => (
          <Card key={category} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>Items:</Typography>
              <List dense>
                {details.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item}
                      secondary={details.rental_rates[item] ? `Rental Rate: ${formatCurrency(details.rental_rates[item])}` : null}
                    />
                  </ListItem>
                ))}
              </List>

              {details.insurance_costs && (
                <Typography>
                  Insurance Costs: {formatCurrency(details.insurance_costs)}
                </Typography>
              )}
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Total Cost: {formatCurrency(details.total_cost)}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Personnel Costs */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Personnel Costs
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Daily Rate</TableCell>
                <TableCell>Overtime Rate</TableCell>
                <TableCell>Total Days</TableCell>
                <TableCell>Benefits</TableCell>
                <TableCell>Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data.personnel_costs).map(([role, details]) => (
                <TableRow key={role}>
                  <TableCell>{role.replace('_', ' ').charAt(0).toUpperCase() + role.slice(1)}</TableCell>
                  <TableCell>{formatCurrency(details.daily_rate)}</TableCell>
                  <TableCell>{formatCurrency(details.overtime_rate)}</TableCell>
                  <TableCell>{details.total_days}</TableCell>
                  <TableCell>{formatCurrency(details.benefits)}</TableCell>
                  <TableCell>{formatCurrency(details.total_cost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Logistics and Insurance Section
  const LogisticsInsurance = ({ data }) => {
    if (!data?.logistics_costs || !data?.insurance_costs) return null;

    return (
      <Box>
        {/* Logistics Costs */}
        <Typography variant="h5" gutterBottom>
          Logistics Costs
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(data.logistics_costs).map(([category, details]) => (
            <Grid item xs={12} md={6} key={category}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  {typeof details === 'object' && !Array.isArray(details) ? (
                    Object.entries(details).map(([item, cost]) => (
                      <Typography key={item}>
                        {item.replace('_', ' ')}: {formatCurrency(cost)}
                      </Typography>
                    ))
                  ) : Array.isArray(details) ? (
                    <List dense>
                      {details.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography>{formatCurrency(details)}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Insurance Costs */}
        <Typography variant="h5" gutterBottom>
          Insurance Costs
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Insurance Cost
            </Typography>
            <Typography variant="h4">
              {formatCurrency(data.insurance_costs.type)}
            </Typography>
          </CardContent>
        </Card>

        {/* Contingency */}
        {data.contingency && (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contingency
              </Typography>
              <Typography>
                Percentage: {data.contingency.percentage}%
              </Typography>
              <Typography>
                Amount: {formatCurrency(data.contingency.amount)}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    );
  };

  // Scenario Analysis Section
  const ScenarioAnalysis = () => {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Budget Scenario Analysis
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Scenario Parameters
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Scenario Type</InputLabel>
                  <Select
                    value={scenarioType}
                    onChange={(e) => setScenarioType(e.target.value)}
                    label="Scenario Type"
                  >
                    <MenuItem value="Base">Base Scenario</MenuItem>
                    <MenuItem value="Optimistic">Optimistic</MenuItem>
                    <MenuItem value="Conservative">Conservative</MenuItem>
                    <MenuItem value="Aggressive">Aggressive Cost Cutting</MenuItem>
                  </Select>
                </FormControl>

                <Typography gutterBottom>Quality Impact Tolerance</Typography>
                <Slider
                  value={qualityImpact}
                  onChange={(e, newValue) => setQualityImpact(newValue)}
                  valueLabelDisplay="auto"
                  marks
                  step={10}
                  min={0}
                  max={100}
                  sx={{ mb: 3 }}
                />

                <Typography gutterBottom>Timeline Flexibility (days)</Typography>
                <Slider
                  value={timelineFlexibility}
                  onChange={(e, newValue) => setTimelineFlexibility(newValue)}
                  valueLabelDisplay="auto"
                  marks
                  step={1}
                  min={0}
                  max={30}
                  sx={{ mb: 3 }}
                />

                <FormControl fullWidth>
                  <InputLabel>Risk Tolerance</InputLabel>
                  <Select
                    value={riskTolerance}
                    onChange={(e) => setRiskTolerance(e.target.value)}
                    label="Risk Tolerance"
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Analysis Results
                </Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      // Handle scenario analysis
                    }}
                  >
                    Run Scenario Analysis
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab
              icon={<AttachMoney />}
              label="Budget Overview"
              iconPosition="start"
            />
            <Tab icon={<LocationOn />} label="Location Details" iconPosition="start" />
            <Tab
              icon={<CameraAlt />}
              label="Equipment & Personnel"
              iconPosition="start"
            />
            <Tab
              icon={<LocalShipping />}
              label="Logistics & Insurance"
              iconPosition="start"
            />
            <Tab
              icon={<Assessment />}
              label="Scenario Analysis"
              iconPosition="start"
            />
          </Tabs>

          {budgetData ? (
            <>
              {activeTab === 0 && <BudgetOverview budgetData={budgetData} />}
              {activeTab === 1 && <LocationDetails data={budgetData} />}
              {activeTab === 2 && <EquipmentPersonnel data={budgetData} />}
              {activeTab === 3 && <LogisticsInsurance data={budgetData} />}
              {activeTab === 4 && <ScenarioAnalysis />}
            </>
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ p: 4, textAlign: 'center' }}>
              No budget data available. Please ensure budget_results.json is present.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}; 