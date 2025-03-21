import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};


export const addExpense = async (expenseData: { expenseName: string; amount: string; category: string; date: string; description: string }) => {
    try {
      const response = await axios.post(`${API_URL}/api/expense/add`, expenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });
      return response.data;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
};

export const updateExpense = async (id: string, expenseData: {
    expenseName: string;
    amount: string;
    category: string;
    date: string;
    description: string;
  }) => {
    try {
      const response = await axios.put(`${API_URL}/api/expense/update/${id}`, expenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  export const fetchExpenses = async () => {
    try {
      const userData = localStorage.getItem("user-info");  
      if (!userData) {
        throw new Error("No user data found");
      }
      const token = JSON.parse(userData).token;
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await axios.get(`${API_URL}/api/expense/list`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      return { expenses: response.data.expenses, totalExpenses: response.data.totalExpenses };
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;  
    }
  };
  

