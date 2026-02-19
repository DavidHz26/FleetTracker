import '@testing-library/jest-dom';
import { vi } from 'vitest';

export const mockNavigate = vi.fn();
export const mockShowMessage = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
});
