import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { getElapsedTime } from "../src/utils/time.js";

describe("Test time utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const mockSystemTime = new Date("2026-06-05T12:00:00.000Z");
    vi.setSystemTime(mockSystemTime);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('should return 0 for all fields when the past date matches current time', () => {
    const result = getElapsedTime('2026-06-05T12:00:00.000Z');
    
    expect(result).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  test('should correctly calculate elapsed seconds, minutes, hours, and days', () => {
    // Past date is exactly 2 days, 3 hours, 4 minutes, and 5 seconds ago
    const pastDate = new Date('2026-06-03T08:55:55.000Z');
    
    const result = getElapsedTime(pastDate);

    expect(result).toEqual({
      hours: 51,
      minutes: 4,
      seconds: 5,
    });
  });

  test('should throw error when date is in future', () => {
    const pastDate = new Date('2026-06-06T08:55:55.000Z');

    expect(() => getElapsedTime(pastDate).toThrow("Start time cannot be more than now."));
  });
});
