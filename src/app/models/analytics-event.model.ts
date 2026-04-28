export type AnalyticsAction = 'view' | 'buy' | 'add-to-cart' | 'details';

export interface AnalyticsEvent {
  productId: number;
  productName: string;
  action: AnalyticsAction;
  timestamp: string;
}
