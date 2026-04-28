import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Interceptor funcional do Angular — equivalente ao padrão de interceptor do Axios no Vue.
// Injeta automaticamente o token JWT em todos os requests HTTP feitos via HttpClient.
// Para usar com Axios: seria o interceptor em axios.defaults.headers ou axios.interceptors.request.use()
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};
