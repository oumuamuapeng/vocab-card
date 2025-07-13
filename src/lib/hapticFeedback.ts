// Haptic feedback patterns for different interactions
export enum HapticPattern {
  LIGHT = 'light',
  MEDIUM = 'medium', 
  HEAVY = 'heavy',
  SUCCESS = 'success',
  ERROR = 'error',
  SELECTION = 'selection'
}

interface HapticOptions {
  pattern?: HapticPattern;
  duration?: number;
  delay?: number;
}

class HapticFeedbackManager {
  private isSupported: boolean = false;
  private isEnabled: boolean = true;

  constructor() {
    this.checkSupport();
  }

  private checkSupport(): void {
    // Check for various haptic APIs
    this.isSupported = !!(
      navigator.vibrate || 
      (navigator as any).mozVibrate || 
      (navigator as any).webkitVibrate
    );
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  getIsSupported(): boolean {
    return this.isSupported;
  }

  getIsEnabled(): boolean {
    return this.isEnabled;
  }

  private vibrate(pattern: number | number[]): void {
    if (!this.isSupported || !this.isEnabled) {
      return;
    }

    try {
      if (navigator.vibrate) {
        navigator.vibrate(pattern);
      } else if ((navigator as any).mozVibrate) {
        (navigator as any).mozVibrate(pattern);
      } else if ((navigator as any).webkitVibrate) {
        (navigator as any).webkitVibrate(pattern);
      }
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Basic haptic patterns
  light(): void {
    this.vibrate(50);
  }

  medium(): void {
    this.vibrate(100);
  }

  heavy(): void {
    this.vibrate(200);
  }

  // Contextual patterns for the vocabulary app
  tap(): void {
    this.vibrate(25); // Very light for button taps
  }

  cardFlip(): void {
    this.vibrate([30, 20, 50]); // Quick double tap feel
  }

  wordComplete(): void {
    this.vibrate([100, 50, 100]); // Success celebration
  }

  levelComplete(): void {
    this.vibrate([200, 100, 200, 100, 300]); // Big celebration
  }

  error(): void {
    this.vibrate([50, 50, 50]); // Three quick buzzes
  }

  selection(): void {
    this.vibrate(75); // Medium feedback for selections
  }

  swipe(): void {
    this.vibrate(40); // Light feedback for swipe gestures
  }

  longPress(): void {
    this.vibrate(150); // Longer feedback for long press
  }

  // Custom pattern support
  custom(options: HapticOptions): void {
    const { pattern = HapticPattern.MEDIUM, duration = 100 } = options;
    
    switch (pattern) {
      case HapticPattern.LIGHT:
        this.vibrate(Math.min(duration, 50));
        break;
      case HapticPattern.MEDIUM:
        this.vibrate(Math.min(duration, 100));
        break;
      case HapticPattern.HEAVY:
        this.vibrate(Math.min(duration, 200));
        break;
      case HapticPattern.SUCCESS:
        this.vibrate([100, 50, 100]);
        break;
      case HapticPattern.ERROR:
        this.vibrate([50, 50, 50]);
        break;
      case HapticPattern.SELECTION:
        this.vibrate(75);
        break;
      default:
        this.vibrate(duration);
    }
  }

  // Stop all vibration
  stop(): void {
    if (this.isSupported) {
      this.vibrate(0);
    }
  }
}

// Singleton instance
export const hapticFeedback = new HapticFeedbackManager();

// React hook for haptic feedback
export const useHapticFeedback = () => {
  return {
    isSupported: hapticFeedback.getIsSupported(),
    isEnabled: hapticFeedback.getIsEnabled(),
    setEnabled: (enabled: boolean) => hapticFeedback.setEnabled(enabled),
    
    // Basic patterns
    light: () => hapticFeedback.light(),
    medium: () => hapticFeedback.medium(),
    heavy: () => hapticFeedback.heavy(),
    
    // App-specific patterns
    tap: () => hapticFeedback.tap(),
    cardFlip: () => hapticFeedback.cardFlip(),
    wordComplete: () => hapticFeedback.wordComplete(),
    levelComplete: () => hapticFeedback.levelComplete(),
    error: () => hapticFeedback.error(),
    selection: () => hapticFeedback.selection(),
    swipe: () => hapticFeedback.swipe(),
    longPress: () => hapticFeedback.longPress(),
    
    // Custom pattern
    custom: (options: HapticOptions) => hapticFeedback.custom(options),
    stop: () => hapticFeedback.stop(),
  };
};