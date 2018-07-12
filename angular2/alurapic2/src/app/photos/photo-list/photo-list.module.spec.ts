import { PhotoListModule } from './photo-list.module';

describe('PhotoListModule', () => {
  let photoListModule: PhotoListModule;

  beforeEach(() => {
    photoListModule = new PhotoListModule();
  });

  it('should create an instance', () => {
    expect(photoListModule).toBeTruthy();
  });
});
