import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { ClarityService } from '../../../../core/services/clarity.service';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [Navbar, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private analytics = inject(AnalyticsService);
  private clarity = inject(ClarityService);

  produto: Product | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produto = this.productService.getById(id);

    if (this.produto) {
      this.analytics.trackClick(this.produto.id, this.produto.nome, 'details');
      this.clarity.trackProductClick(this.produto.id, this.produto.nome, 'details');
    }
  }

  onBuyNow(): void {
    if (!this.produto) return;
    this.analytics.trackClick(this.produto.id, this.produto.nome, 'buy');
    this.clarity.trackProductClick(this.produto.id, this.produto.nome, 'buy');
    alert(`Compra de "${this.produto.nome}" iniciada!\n(Integração de pagamento não implementada neste mock)`);
  }

  onAddToCart(): void {
    if (!this.produto) return;
    this.analytics.trackClick(this.produto.id, this.produto.nome, 'add-to-cart');
    this.clarity.trackProductClick(this.produto.id, this.produto.nome, 'add-to-cart');
    alert(`"${this.produto.nome}" adicionado ao carrinho!\n(Carrinho não implementado neste mock)`);
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
