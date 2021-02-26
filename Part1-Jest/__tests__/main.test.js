const { expect } = require('@jest/globals');
const formatVolumeIconPath = require('../assets/scripts/main');

describe('Tests', () => {
  test('volume value greater than 66', () => {
    expect(formatVolumeIconPath(70)).toContain('3');
  });

  test('volume value less than or equal to 66', () => {
    expect(formatVolumeIconPath(50)).toMatch(new RegExp('./assets/media/icons/volume-level-[0,1,2].svg'))
  });

  test('volume value greater than 33', () => {
    expect(formatVolumeIconPath(34)).toContain('2');
  });

  test('volume value less than or equal to 33', () => {
    expect(formatVolumeIconPath(33)).toMatch(new RegExp('./assets/media/icons/volume-level-[0,1].svg'))
  });

  test('volume value greater than 0', () => {
    expect(formatVolumeIconPath(10)).toContain('1');
  });

  test('volume value less than or equal to 0', () => {
    expect(formatVolumeIconPath(0)).toContain('0');
  });
});