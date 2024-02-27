// Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, remaining, dispatch, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState('');

    const handleBudgetChange = (event) => {
        const value = event.target.value;

        // Check if the entered value is a number
        if (isNaN(value)) {
            setError('Please enter a valid number');
        } else {
            const numericValue = parseFloat(value);

            // Check if the entered value exceeds the upper limit (20000)
            if (numericValue > 20000) {
                setError('Budget cannot exceed 20000');
            } else if (numericValue < remaining) {
                // Check if the entered value is lower than spending
                setError('Budget cannot be lower than spending');
            } else {
                setError('');
                setNewBudget(numericValue);

                // Dispatch the action to update the budget in the state
                dispatch({ type: 'SET_BUDGET', payload: numericValue });
            }
        }
    };

    const handleIncreaseBudget = () => {
        // Increase the budget by 10
        const increasedBudget = newBudget + 10;

        // Check if the increased value exceeds the upper limit
        if (increasedBudget > 20000) {
            setError('Budget cannot exceed 20000');
        } else {
            setError('');
            setNewBudget(increasedBudget);

            // Dispatch the action to update the budget in the state
            dispatch({ type: 'SET_BUDGET', payload: increasedBudget });
        }
    };

    const handleDecreaseBudget = () => {
        // Decrease the budget by 10
        const decreasedBudget = newBudget - 10;

        // Check if the decreased value is lower than spending
        if (decreasedBudget < remaining) {
            setError('Budget cannot be lower than spending');
        } else {
            setError('');
            setNewBudget(decreasedBudget);

            // Dispatch the action to update the budget in the state
            dispatch({ type: 'SET_BUDGET', payload: decreasedBudget });
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{newBudget}</span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange} />
            <button id="increment" onClick={handleIncreaseBudget}>+</button>
            <button id="decrement" onClick={handleDecreaseBudget}>-</button>
            <br />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default Budget;
