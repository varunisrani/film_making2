export interface ScriptResults {
  metadata: {
    title?: string;
    author?: string;
    genre?: string;
    [key: string]: unknown;
  };
  parsed_data: {
    scenes: Array<{
      id: string;
      location_id: string;
      [key: string]: unknown;
    }>;
    characters: Array<{
      id: string;
      name: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface ScheduleResults {
  schedule: Array<{
    day: number;
    scenes: Array<{
      id: string;
      location_id: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

export interface BudgetRequest {
  script_results: ScriptResults;
  schedule_results: ScheduleResults;
  production_data?: {
    script_metadata?: Record<string, unknown>;
    scene_count: number;
    character_count: number;
    schedule_days: number;
    quality_level: 'High' | 'Medium' | 'Low';
  };
  location_data?: {
    locations: string[];
  };
  crew_data?: {
    size: 'Large' | 'Medium' | 'Small';
    equipment_level: 'Premium' | 'Standard' | 'Budget';
    departments: string[];
  };
  target_budget?: number;
  constraints?: Record<string, unknown>;
}

export interface LocationCost {
  daily_rate: number;
  total_days: number;
  total_cost: number;
  additional_fees?: Record<string, number>;
}

export interface EquipmentCost {
  daily_rate: number;
  total_days: number;
  total_cost: number;
  specifications?: Record<string, string>;
}

export interface PersonnelCost {
  daily_rate: number;
  total_days: number;
  total_cost: number;
  role: string;
  department: string;
}

export interface LogisticsCost {
  type: string;
  cost_per_unit: number;
  units: number;
  total_cost: number;
}

export interface BudgetData {
  total_estimates: {
    grand_total: number;
    per_day_average: number;
    total_location_costs: number;
    total_equipment_costs: number;
    total_personnel_costs: number;
    total_logistics_costs: number;
    total_insurance_costs: number;
  };
  location_costs?: Record<string, LocationCost>;
  equipment_costs?: Record<string, EquipmentCost>;
  personnel_costs?: Record<string, PersonnelCost>;
  logistics_costs?: Record<string, LogisticsCost>;
  insurance?: Record<string, number>;
  cash_flow_status?: {
    current_balance: number;
    upcoming_total: number;
    health_status: 'good' | 'warning' | 'critical';
    recommendations?: string[];
  };
  scenario_results?: {
    optimized_budget: {
      total_estimates: {
        grand_total: number;
      };
    };
    recommendations: Array<{
      action: string;
      priority: string;
      timeline: string;
    }>;
  };
  production_data?: {
    quality_level: string;
  };
  crew_data?: {
    size: string;
    equipment_level: string;
  };
}

export interface BudgetSummary {
  totalBudget: number;
  perDayAverage: number;
  savingsPercentage: number;
}

export type BudgetView = 'overview' | 'location' | 'equipment' | 'logistics' | 'vendor' | 'cashflow' | 'scenario';

export interface ScenarioConstraints {
  quality_impact_tolerance: number;
  timeline_flexibility: number;
  risk_tolerance: 'high' | 'medium' | 'low';
  original_constraints: {
    quality_level: string;
    equipment_preference: string;
    crew_size: string;
  };
} 