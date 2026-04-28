import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AnalyticsEvent } from '../../../../models/analytics-event.model';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  private analytics = inject(AnalyticsService);
  private auth = inject(AuthService);
  private router = inject(Router);

  eventos: AnalyticsEvent[] = [];
  ranking: { id: number; name: string; count: number }[] = [];
  mostClicked: { productId: number; name: string; count: number } | null = null;
  totalCliques = 0;

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.totalCliques = this.analytics.getTotalClicks();
    this.eventos = this.analytics.getRecentEvents(20);
    this.ranking = this.analytics.getRanking();
    this.mostClicked = this.analytics.getMostClicked();
  }

  limparEstatisticas(): void {
    if (confirm('Deseja limpar todas as estatísticas? Esta ação não pode ser desfeita.')) {
      this.analytics.clearAll();
      this.carregarDados();
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

  porcentagem(count: number): number {
    if (!this.totalCliques) return 0;
    return Math.round((count / this.totalCliques) * 100);
  }
}
