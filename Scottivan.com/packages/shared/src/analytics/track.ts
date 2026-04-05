/** No-op page view tracker — swap implementation when analytics provider is added */
export function trackPageView(_path?: string): void {
  // Future: integrate Plausible, PostHog, or custom CloudFront log analytics
}
