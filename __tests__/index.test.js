import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders a heading', async () => {
    fetch.mockResponse(JSON.stringify([]));

    const { getByRole } = render(<Home />);

    const heading = getByRole('heading', {
      name: /Transactions/i,
    });

    await waitFor(() => expect(heading).toBeInTheDocument());
  });
});
