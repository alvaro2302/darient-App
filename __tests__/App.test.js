import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { render, waitFor } from '@testing-library/react-native';
import InitialStack from '../app/StackScreen/InitialStack';
import { useAuthStore } from '../app/Store/Auth';

// Mock the Auth store
jest.mock('../app/Store/Auth', () => ({
  useAuthStore: jest.fn()
}));

// Mock the components
jest.mock('../app/TabBottoms', () => {
  const MockTabBottoms = () => null;
  MockTabBottoms.displayName = 'TabBottoms';
  return MockTabBottoms;
});

jest.mock('../app/StackScreen/SignUpStack', () => {
  const MockSignUpStack = () => null;
  MockSignUpStack.displayName = 'SignUpStack';
  return MockSignUpStack;
});

// Mock react-native-paper
jest.mock('react-native-paper', () => {
  const React = require('react');
  return {
    ActivityIndicator: ({ testID, ...props }) => 
      React.createElement('View', { testID, ...props })
  };
});

// Mock the Auth store
jest.mock('../app/Store/Auth', () => ({
  useAuthStore: jest.fn()
}));

describe('InitialStack Component', () => {
  const mockValidateUser = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  test('should render ActivityIndicator when loading is true', () => {
    useAuthStore.mockReturnValue({
      validateUser: mockValidateUser,
      user: null,
      loading: true
    });

    const { getByTestId } = render(<InitialStack />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('should render TabBottoms when user is authenticated', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    
    useAuthStore.mockReturnValue({
      validateUser: mockValidateUser,
      user: mockUser,
      loading: false
    });

    const { findByTestId } = render(<InitialStack />);
    
    await waitFor(() => {
      expect(findByTestId('tab-bottoms')).toBeTruthy();
    });
  });

  test('should render SignUpStack when user is not authenticated', async () => {
    useAuthStore.mockReturnValue({
      validateUser: mockValidateUser,
      user: null,
      loading: false
    });

    const { findByTestId } = render(<InitialStack />);
    
    await waitFor(() => {
      expect(findByTestId('signup-stack')).toBeTruthy();
    });
  });

  test('should call validateUser on component mount', () => {
    useAuthStore.mockReturnValue({
      validateUser: mockValidateUser,
      user: null,
      loading: false
    });

    render(<InitialStack />);
    
    expect(mockValidateUser).toHaveBeenCalledTimes(1);
  });

  test('should log user data when user is present', () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    
    useAuthStore.mockReturnValue({
      validateUser: mockValidateUser,
      user: mockUser,
      loading: false
    });

    render(<InitialStack />);
    
    expect(console.log).toHaveBeenCalledWith('user', mockUser);
  });
});