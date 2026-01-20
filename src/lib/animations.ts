/**
 * Premium animation utilities for consistent, smooth micro-interactions
 * Inspired by Notion, Linear, and Vercel's design language
 */

// Elegant easing functions
export const easings = {
  /** Smooth, natural deceleration */
  smooth: [0.25, 0.1, 0.25, 1] as const,
  /** Quick, responsive feel */
  snappy: [0.4, 0, 0.2, 1] as const,
  /** Gentle, relaxed motion */
  gentle: [0.33, 1, 0.68, 1] as const,
  /** Slight overshoot for playful elements */
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  /** Linear for progress indicators */
  linear: [0, 0, 1, 1] as const,
}

// Fast, responsive durations (in seconds)
export const durations = {
  /** 100ms - Instant feedback */
  instant: 0.1,
  /** 150ms - Quick interactions */
  fast: 0.15,
  /** 200ms - Standard transitions */
  normal: 0.2,
  /** 300ms - Emphasis animations */
  slow: 0.3,
  /** 400ms - Page transitions */
  slower: 0.4,
}

// Fade in with subtle upward motion
export const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: durations.normal, ease: easings.smooth },
}

// Fade in with subtle downward motion
export const fadeInDown = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
  transition: { duration: durations.normal, ease: easings.smooth },
}

// Simple fade
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: durations.fast, ease: easings.smooth },
}

// Scale fade for modals/popovers
export const scaleFade = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: durations.fast, ease: easings.snappy },
}

// Slide from direction
export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'right') => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const value = direction === 'right' || direction === 'down' ? 16 : -16

  return {
    initial: { opacity: 0, [axis]: value },
    animate: { opacity: 1, [axis]: 0 },
    exit: { opacity: 0, [axis]: value },
    transition: { duration: durations.normal, ease: easings.smooth },
  }
}

// Stagger children animations
export const staggerContainer = (staggerDelay = 0.05) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.02,
    },
  },
})

export const staggerItem = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.fast, ease: easings.smooth },
}

// Sidebar collapse/expand
export const sidebarVariants = {
  expanded: { width: 256 },
  collapsed: { width: 64 },
}

// Layout transition for smooth resizing
export const layoutTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
}

// Hover scale effect
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: durations.instant },
}

// Subtle hover lift
export const hoverLift = {
  whileHover: { y: -2 },
  transition: { duration: durations.fast, ease: easings.smooth },
}

// Press effect
export const pressEffect = {
  whileTap: { scale: 0.98 },
  transition: { duration: durations.instant },
}

// Shimmer effect for skeleton loading
export const shimmer = {
  initial: { x: '-100%' },
  animate: { x: '100%' },
  transition: {
    repeat: Infinity,
    duration: 1.5,
    ease: easings.linear,
  },
}

// Pulse for attention
export const pulse = {
  animate: {
    opacity: [1, 0.6, 1],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: easings.smooth,
  },
}

// Active indicator animation
export const activeIndicator = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: durations.fast, ease: easings.snappy },
}

// Page transition
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: durations.normal, ease: easings.smooth },
}
