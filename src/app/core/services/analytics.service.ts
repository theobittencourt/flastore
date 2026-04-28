import { Injectable } from '@angular/core';
import { AnalyticsAction, AnalyticsEvent } from '../../models/analytics-event.model';

const STORAGE_KEY = 'flastore_analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackClick(productId: number, productName: string, action: AnalyticsAction): void {
    const event: AnalyticsEvent = {
      productId,
      productName,
      action,
      timestamp: new Date().toISOString()
    };
    const events = this.getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  getEvents(): AnalyticsEvent[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  getRecentEvents(limit = 20): AnalyticsEvent[] {
    return this.getEvents().slice().reverse().slice(0, limit);
  }

  countByProduct(): Record<number, { name: string; count: number }> {
    return this.getEvents().reduce((acc, e) => {
      if (!acc[e.productId]) acc[e.productId] = { name: e.productName, count: 0 };
      acc[e.productId].count++;
      return acc;
    }, {} as Record<number, { name: string; count: number }>);
  }

  getRanking(): { id: number; name: string; count: number }[] {
    const counts = this.countByProduct();
    return Object.entries(counts)
      .map(([id, data]) => ({ id: +id, name: data.name, count: data.count }))
      .sort((a, b) => b.count - a.count);
  }

  getMostClicked(): { productId: number; name: string; count: number } | null {
    const ranking = this.getRanking();
    if (!ranking.length) return null;
    const top = ranking[0];
    return { productId: top.id, name: top.name, count: top.count };
  }

  getTotalClicks(): number {
    return this.getEvents().length;
  }

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
