<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminEnumController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderByUserController;
use App\Http\Controllers\RatingController;
use App\Models\ShippingAddress;
use App\Models\PaymentMethods;
use Illuminate\Support\Facades\Storage;
use OpenAI\Laravel\Facades\OpenAI;
use GuzzleHttp\Client;
use App\Models\Rating;

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
Route::apiResource('orders', OrderController::class);
Route::apiResource('ratings', RatingController::class);
Route::apiResource('{userId}/orders', OrderByUserController::class);
Route::get('/payment/{id}',  function ($id){return PaymentMethods::find($id);});
Route::get('/shipping/{id}', function ($id){return ShippingAddress::find($id);});
Route::get('rated/{userId}/{productId}', function ($userId,$productId){
    $rating=Rating::where('user_id',$userId)
        ->where('product_id',$productId)->first();
    if(!$rating)return -1;
    return $rating->id;
});
Route::get('ratings/products/{productId}', [ProductController::class,'setRatings']); 
Route::get('ratings/orders/{userId}/{orderId}', [OrderByUserController::class,'setRatings']);

Route::post('/chat', function (Request $request){
    $prompt=$request["prompt"];
    $client=new Client(['base_uri'=>'https://www.botlibre.com']);
    $res=$client->post('rest/json/chat',[
        'headers' => ['Content-Type' => 'application/json'],
        'body'=>'{
            "application":"4420406921881890074",
            "instance":"165",
            "message":"'.$prompt.'"
        }'
    ]);
    return json_encode(json_decode($res->getBody(),true)["message"]);
});
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
