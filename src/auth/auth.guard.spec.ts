import { AuthenticationGuard } from './authentification.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthenticationGuard()).toBeDefined();
  });
});
