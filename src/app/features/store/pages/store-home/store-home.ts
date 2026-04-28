import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { ClarityService } from '../../../../core/services/clarity.service';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-store-home',
  imports: [Navbar, ProductCard],
  templateUrl: './store-home.html',
  styleUrl: './store-home.css'
})
export class StoreHome {
  private productService = inject(ProductService);
  private analytics = inject(AnalyticsService);
  private clarity = inject(ClarityService);

  categorias = this.productService.getCategorias();
  categoriaAtiva = signal<string>('Todos');

  get produtos(): Product[] {
    const cat = this.categoriaAtiva();
    return cat === 'Todos'
      ? this.productService.getAll()
      : this.productService.getByCategoria(cat);
  }

  filtrar(categoria: string): void {
    this.categoriaAtiva.set(categoria);
  }

  onBuyNow(produto: Product): void {
    this.analytics.trackClick(produto.id, produto.nome, 'buy');
    this.clarity.trackProductClick(produto.id, produto.nome, 'buy');
    alert(`Compra de "${produto.nome}" iniciada!\n(Integração de pagamento não implementada neste mock)`);
  }

  onAddToCart(produto: Product): void {
    this.analytics.trackClick(produto.id, produto.nome, 'add-to-cart');
    this.clarity.trackProductClick(produto.id, produto.nome, 'add-to-cart');
    alert(`"${produto.nome}" adicionado ao carrinho!\n(Carrinho não implementado neste mock)`);
  }
}
