// Set JWT Token in Header with Angular HttpInterceptor
// In general, when implementing token-based authentication, 
// we need to set the token in the request header. It authenticates the request 
// so that we can get the data securely.

import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { TokenService } from "../services/token.service";
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken
            }
        });
        return next.handle(req);
    }
}