import { VmessageModule } from './vmessage.module';

describe('VmessageModule', () => {
  let vmessageModule: VmessageModule;

  beforeEach(() => {
    vmessageModule = new VmessageModule();
  });

  it('should create an instance', () => {
    expect(vmessageModule).toBeTruthy();
  });
});
