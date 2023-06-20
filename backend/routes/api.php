<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminEnumController;
use App\Models\AdminEnum;
use Illuminate\Support\Facades\Storage;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the 'api' middleware group. Enjoy building your API!
|
*/



Route::apiResource('users', UserController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('adminenums', AdminEnumController::class);
Route::prefix('products')->controller(ProductController::class)->group(function(){
    Route::get('/search', 'index');
    Route::get('/search/{keys}', 'search');
});

//Authentication routes
Route::prefix('auth')->controller(AuthController::class)->group(function(){
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/logout', 'logout');
        Route::post('/confirm-password', 'confirmPassword');
        Route::post('/reset-password', 'resetPassword');
        Route::post('/verify-email', 'verifyEmail');

    });
});

//Tokens
Route::post('/tokens/create/{token_name}', function (Request $request) {
    $token = $request->user()->createToken("token_name");
    return ['token' => $token->plainTextToken];
});

//Image
Route::get('/public/{folder}/{filename}', function ($folder,$filename) {
    $path = 'public/'.$folder.'/' . $filename;
    if (Storage::exists($path)) {
        $file = Storage::get($path);
        $type = Storage::mimeType($path);
        $response = response($file, 200)->header('Content-Type', $type);
        return $response;
    }
    abort(404);
})->name('image');
