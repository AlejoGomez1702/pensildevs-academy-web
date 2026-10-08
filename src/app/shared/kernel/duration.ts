const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;

/** Length of a video, a course or a reading. Shown rounded to the nearest minute. */
export class Duration {
  private constructor(readonly seconds: number) {}

  static ofSeconds(seconds: number): Duration {
    if (!Number.isFinite(seconds) || seconds < 0) {
      throw new RangeError(`A duration cannot be ${seconds} seconds`);
    }
    return new Duration(seconds);
  }

  static ofMinutes(minutes: number): Duration {
    return Duration.ofSeconds(minutes * SECONDS_PER_MINUTE);
  }

  static sum(durations: readonly Duration[]): Duration {
    return Duration.ofSeconds(durations.reduce((total, duration) => total + duration.seconds, 0));
  }

  /** "8 min", "1 h", "1 h 05 min". Anything under a minute reads as "1 min", never "0 min". */
  format(): string {
    const totalMinutes = Math.max(1, Math.round(this.seconds / SECONDS_PER_MINUTE));
    const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
    const minutes = totalMinutes % MINUTES_PER_HOUR;
    if (hours === 0) {
      return `${minutes} min`;
    }
    return minutes === 0 ? `${hours} h` : `${hours} h ${String(minutes).padStart(2, '0')} min`;
  }
}
