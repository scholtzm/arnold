import SettingsStore from '../settings-store.js';

it('provides settings', () => {
  const settings = SettingsStore.get();
  expect(settings).toBeDefined();
});
