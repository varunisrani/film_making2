import { useState, useMemo, useCallback } from 'react';
import { BudgetData, BudgetRequest, ScenarioConstraints, BudgetSummary } from '../types/budget';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const useBudget = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  // Load budget from local storage on mount
  useState(() => {
    const savedBudget = localStorage.getItem('budgetData');
    if (savedBudget) {
      try {
        setBudgetData(JSON.parse(savedBudget));
      } catch (err) {
        console.error('Failed to load saved budget:', err);
      }
    }
  });

  // Save budget to local storage whenever it changes
  useCallback(() => {
    if (budgetData) {
      localStorage.setItem('budgetData', JSON.stringify(budgetData));
    }
  }, [budgetData]);

  // Validate budget data before API calls
  const validateBudgetData = (data: Partial<BudgetRequest>): boolean => {
    if (!data.script_results || !data.schedule_results) {
      setError('Script and schedule data are required');
      return false;
    }
    if (data.target_budget && data.target_budget < 0) {
      setError('Target budget must be positive');
      return false;
    }
    return true;
  };

  // Create budget
  const createBudget = async (data: BudgetRequest) => {
    if (!validateBudgetData(data)) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${API_URL}/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create budget');
      }
      
      const result = await response.json();
      setBudgetData(result.data);
      setSuccess('Budget created successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      console.error('Budget creation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Optimize budget
  const optimizeBudget = async (scenario: string, constraints: ScenarioConstraints) => {
    if (!budgetData) {
      setError('No budget data available for optimization');
      return;
    }
    
    setOptimizationProgress(0);
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${API_URL}/budget/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario_constraints: constraints,
          scenario
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to optimize budget');
      }
      
      const result = await response.json();
      setBudgetData({
        ...budgetData,
        scenario_results: result.data
      });
      
      setSuccess('Budget optimization completed!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      console.error('Budget optimization failed:', err);
    } finally {
      setLoading(false);
      setOptimizationProgress(100);
    }
  };

  // Memoized budget summary
  const budgetSummary = useMemo<BudgetSummary | null>(() => {
    if (!budgetData) return null;
    
    const originalTotal = budgetData.total_estimates.grand_total;
    const optimizedTotal = budgetData.scenario_results?.optimized_budget.total_estimates.grand_total;
    
    return {
      totalBudget: originalTotal,
      perDayAverage: budgetData.total_estimates.per_day_average,
      savingsPercentage: optimizedTotal 
        ? ((originalTotal - optimizedTotal) / originalTotal) * 100 
        : 0
    };
  }, [budgetData]);

  return {
    budgetData,
    budgetSummary,
    loading,
    error,
    success,
    optimizationProgress,
    createBudget,
    optimizeBudget,
    setError,
    setSuccess
  };
}; 