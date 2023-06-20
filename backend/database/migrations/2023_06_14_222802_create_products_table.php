<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\AdminEnum;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->decimal('discount', 8, 2)->default(0);
            $table->unsignedInteger('quantity');
            $table->unsignedInteger('rating')->default(0);
            $table->string('type')->nullable();
            $table->text('about')->nullable();
            $table->string('image')->nullable();
            $table->string('imgpath')->nullable();
            $table->string('category')->default('');
            $table->string('brand')->default('');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // Schema::create('product_categories', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->unsignedBigInteger('product_id');
        //     $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        //     $table->timestamps();
        // });
    }

    public function down()
    {
        // Schema::dropIfExists('product_categories');
        Schema::dropIfExists('products');
    }
};
