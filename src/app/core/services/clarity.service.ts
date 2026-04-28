import { Injectable } from '@angular/core';

// Declaração de tipo para o objeto global window.clarity
// O Microsoft Clarity injeta esta função via script no index.html
declare global {
  interface Window {
    clarity?: (method: string, ...args: unknown[]) => void;
  }
}

const CLARITY_MOCK_KEY = 'flastore_clarity_mock';

@Injectable({ providedIn: 'root' })
export class ClarityService {
  trackProductClick(productId: number, productName: string, action: string): void {
    this.trackEvent('product_click', { productId, productName, action });
  }

  trackEvent(eventName: string, data?: Record<string, unknown>): void {
    // Chama o Clarity real se estiver disponível (script inserido no index.html)
    if (typeof window.clarity === 'function') {
      window.clarity('event', eventName);
    }

    // Salva no localStorage para fins de mock/debug
    const log: unknown[] = JSON.parse(localStorage.getItem(CLARITY_MOCK_KEY) || '[]');
    log.push({ eventName, data, timestamp: new Date().toISOString() });
    localStorage.setItem(CLARITY_MOCK_KEY, JSON.stringify(log));
  }
}
