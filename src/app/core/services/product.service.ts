import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products: Product[] = [
    {
      id: 1,
      nome: 'Camisa Flamengo Home 2024/25',
      categoria: 'Camisas',
      preco: 299.90,
      descricao: 'A camisa oficial do Mengão para a temporada 2024/25. Confeccionada em tecido respirável de alta performance, com o escudo bordado e as listras tradicionais vermelho e preto. Ideal para vestir na arquibancada ou no dia a dia.',
      imagem: 'https://placehold.co/480x560/CC0000/FFFFFF?text=Camisa+Home+24%2F25',
      destaque: true
    },
    {
      id: 2,
      nome: 'Camisa Flamengo Away 2024/25',
      categoria: 'Camisas',
      preco: 279.90,
      descricao: 'A camisa reserva do Flamengo para 2024/25, com design moderno em branco e detalhes em vermelho e preto. Tecido leve, confortável e de alta qualidade.',
      imagem: 'https://placehold.co/480x560/FFFFFF/CC0000?text=Camisa+Away+24%2F25',
      destaque: false
    },
    {
      id: 3,
      nome: 'Casaco Flamengo Viagem',
      categoria: 'Casacos',
      preco: 449.90,
      descricao: 'O casaco oficial de viagem do elenco profissional do Flamengo. Material premium em preto com detalhes em vermelho, zíper frontal e bolsos laterais. Perfeito para os dias frios.',
      imagem: 'https://placehold.co/480x560/0D0D0D/CC0000?text=Casaco+Viagem',
      destaque: true
    },
    {
      id: 4,
      nome: 'Short Flamengo Treino',
      categoria: 'Shorts',
      preco: 149.90,
      descricao: 'Short de treino oficial do Flamengo, com tecido leve e elástico de alta performance. Elástico na cintura com cordão ajustável e dois bolsos laterais.',
      imagem: 'https://placehold.co/480x560/1A1A1A/E30613?text=Short+Treino',
      destaque: false
    },
    {
      id: 5,
      nome: 'Boné Flamengo Aba Curva',
      categoria: 'Acessórios',
      preco: 89.90,
      descricao: 'Boné oficial do Flamengo com aba curva, regulagem traseira e bordado do escudo na frente. Disponível em preto com detalhes em vermelho.',
      imagem: 'https://placehold.co/480x560/0D0D0D/FFFFFF?text=Boné+Flamengo',
      destaque: false
    },
    {
      id: 6,
      nome: 'Camiseta Baby Look Flamengo',
      categoria: 'Camisas',
      preco: 199.90,
      descricao: 'Camiseta baby look feminina do Flamengo, corte justo e modelagem moderna. Estampa do escudo no peito, tecido macio e confortável para o uso diário.',
      imagem: 'https://placehold.co/480x560/B3000E/FFFFFF?text=Baby+Look',
      destaque: true
    },
    {
      id: 7,
      nome: 'Meia Flamengo Oficial',
      categoria: 'Acessórios',
      preco: 49.90,
      descricao: 'Par de meias oficiais do Flamengo com elástico reforçado e proteção no calcanhar. Listras vermelho e preto com logo do clube bordado.',
      imagem: 'https://placehold.co/480x560/1A1A1A/FFFFFF?text=Meia+Oficial',
      destaque: false
    },
    {
      id: 8,
      nome: 'Cachecol Flamengo Vermelho e Preto',
      categoria: 'Acessórios',
      preco: 79.90,
      descricao: 'Cachecol oficial do Flamengo em tricô, com as cores tradicionais do clube. Ideal para os dias frios na arquibancada. Acompanha franja nas duas pontas.',
      imagem: 'https://placehold.co/480x560/CC0000/0D0D0D?text=Cachecol+FLA',
      destaque: false
    }
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getFeatured(): Product[] {
    return this.products.filter(p => p.destaque);
  }

  getByCategoria(categoria: string): Product[] {
    return this.products.filter(p => p.categoria === categoria);
  }

  getCategorias(): string[] {
    return [...new Set(this.products.map(p => p.categoria))];
  }
}
