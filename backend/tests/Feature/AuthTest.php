<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Testing\Fluent\AssertableJson;
use App\Models\User;
use Laravel\Sanctum\Sanctum;



class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_register()
    {
        $response = $this->postJson("/api/auth/register",[
            'email' => 'marti@gmail.com',
            'username' => 'marti',
            'password' => '123456'
        ]);


        $response->assertJson(fn (AssertableJson $json) =>
            $json->hasAll('message', 'user')
                ->etc()
        );
        
        $response->assertSessionHas('_flash');
    }

    public function test_login()
    {
        $response = $this->postJson("/api/auth/login",[
            'email' => 'martin@gmail.com',
            // 'password' => '123456'
        ]);

        $response->dump();

        $response->assertJson(fn (AssertableJson $json) =>
            $json->hasAny('email', 'username','message')
                ->etc()
        );
        $response->assertSessionHas('_flash');
    }
    public function test_confirm_password()
    {
        $user=User::where('email','marti@gmail.com')->first();
        Sanctum::actingAs(
            $user,
            ['*']
        );
        $response = $this->withSession(['banned'=>false])
            ->postJson("/api/auth/confirm-password",[
                'password' => '123456'
             ]);
  
        $response->dump();

        $response->assertJson(fn (AssertableJson $json) =>
            $json
                ->hasAny('user','message')
                ->etc()
        );
    }
    public function test_logout()
    {
        $user=User::where('email','martin@gmail.com')->first();
        Sanctum::actingAs(
            $user,
            ['*']
        );
        $response = $this->withSession(['banned'=>false])
            ->getJson("/api/auth/logout");
  
        $response->dump();

        $response->assertJson(fn (AssertableJson $json) =>
            $json
                ->hasAny('user','message')
        );
        

    }
    public function test_reset_password()
    {
        $user=User::where('email','martin@gmail.com')->first();
        Sanctum::actingAs(
            $user,
            ['*']
        );
        $response = $this->withSession(['banned'=>false])
            ->postJson("/api/auth/reset-password",[
                'password' => '123456'
            ]);

             
        // $response->dump();
 
        $response->assertJson(fn (AssertableJson $json) =>
            $json
                ->hasAny('user','message')
                ->etc()
        );
    }

    public function test_verify_email()
    {
        $user=User::where('email','martin@gmail.com')->first();
        Sanctum::actingAs(
            $user,
            ['*']
        );
        $response = $this->withSession(['banned'=>false])
        ->postJson("/api/auth/verify-email",[
            'password' => '123456'
         ]);
        $response->dump();

        $response->assertJson(fn (AssertableJson $json) =>
            $json
                ->hasAny('user','message')
                ->etc()
        );
    }


}
