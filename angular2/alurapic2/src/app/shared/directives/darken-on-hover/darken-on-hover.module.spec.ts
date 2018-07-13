import { DarkenOnHoverModule } from './darken-on-hover.module';

describe('DarkenOnHoverModule', () => {
  let darkenOnHoverModule: DarkenOnHoverModule;

  beforeEach(() => {
    darkenOnHoverModule = new DarkenOnHoverModule();
  });

  it('should create an instance', () => {
    expect(darkenOnHoverModule).toBeTruthy();
  });
});
