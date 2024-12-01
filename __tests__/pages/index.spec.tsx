import Home from '@/pages';
import { render } from '@testing-library/react';

describe('Home Page', () => {
  it('render heading', () => {
    const { getByRole } = render(<Home />);

    const headingElement = getByRole('heading', {
      name: /The Journal: Design Resources, Interviews and Industry News/i,
    });

    expect(headingElement).toBeInTheDocument();
  });
});
