<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HandleCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, 
    string $cookie_type="email") 
    {
        if($request->hasCookie($cookie_type)){
            $data=$request->cookie($cookie_type); 

            return $next($request)->json(['valueCookie'=>$data,
                'hasCookie'=>true,
                'cookie_type'=>$cookie_type,
                'cookie_date'=>$data
                ],201);
        } 
        
        return $next($request);
        
    }
}
