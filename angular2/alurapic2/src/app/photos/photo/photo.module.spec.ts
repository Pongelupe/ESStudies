import { PhotoModule } from './photo.module';

describe('PhotoModule', () => {
  let photoModule: PhotoModule;

  beforeEach(() => {
    photoModule = new PhotoModule();
  });

  it('should create an instance', () => {
    expect(photoModule).toBeTruthy();
  });
});
