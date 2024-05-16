import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Create from '../components/Create'; // Adjust the path as necessary

test('renders Create component', () => {
    render(<Create />);
    expect(screen.getByText(/Add New Tea/i)).toBeInTheDocument();
});

test('allows user to submit form', () => {
    render(<Create />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Green Tea' } });
    fireEvent.change(screen.getByLabelText(/Level/i), { target: { value: 'Medium' } });
    fireEvent.click(screen.getByText(/Add Tea/i));
    expect(screen.getByText(/Green Tea/i)).toBeInTheDocument();
});
