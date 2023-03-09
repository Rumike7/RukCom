<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class AuthController extends UserController
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required_without:email'],
            'email' => ['required_without:username', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials,$remember = true)) {
            $request->session()->regenerate();
            $user= User::where('email',$request->email)
                ->orWhere('username',$request->username)
                ->first();
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => $user,
                ],201);

        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Register the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),401);
        }
        $uuid=(string)Str::uuid();


        $request->flash();
        $newUser=new User([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $newUser->uuid=$uuid;
        $newUser->save();
        $token = $newUser->createToken('user');

        return response()->json($newUser,201);
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Successfully logged out.'],201);
    }

    /**
     * Confirm the password before perform an action or be redirected.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function confirmPassword(Request $request){

        if (! Hash::check($request->password, $request->user()->password)) {
            return response()->json([
                'user'=>[
                    'password' => 'The provided password does not match our records.'
                ],
            ]);
        }
        // $request->session()->passwordConfirmed();

        return response()->json(['message' => 'Successfully confirm your password'],201);
    }
    /** Reset the password because the user forgot their password
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
    */
    public function resetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'user'=>[
                    'email' => 'The provided email is invalid.'
                ],
            ]);
        }
        $user = User::where('email',$request->email)->first();
        if(!$user){
            return response()->json([
                'user'=>[
                    'email' => 'The provided email is invalid.'
                ],
            ]);
        }
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json(['message' => 'Successfully reset your password'],201);
    }

    public function verifyEmail(Request $request){
        if (! Hash::check($request->password, $request->user()->password)) {
            return response()->json([
                'user'=>[
                    'password' => 'The provided password does not match our records.'
                ],
            ]);
        }
        // $request->session()->passwordConfirmed();

        return response()->json(['message' => 'Successfully verify your email'],201);

    }

}
