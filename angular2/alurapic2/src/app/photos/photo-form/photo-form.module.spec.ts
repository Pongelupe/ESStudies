import { PhotoFormModule } from './photo-form.module';

describe('PhotoFormModule', () => {
  let photoFormModule: PhotoFormModule;

  beforeEach(() => {
    photoFormModule = new PhotoFormModule();
  });

  it('should create an instance', () => {
    expect(photoFormModule).toBeTruthy();
  });
});
