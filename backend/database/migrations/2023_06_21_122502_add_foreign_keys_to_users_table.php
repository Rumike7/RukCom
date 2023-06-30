<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // $table->unsignedBigInteger('shipping_address_id')->nullable();
            // $table->unsignedBigInteger('payment_method_id')->nullable();

            // $table->foreign('shipping_address_id')->references('id')->on('shipping_addresses')->onDelete('cascade');
            // $table->foreign('payment_method_id')->references('id')->on('payment_methods')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // $table->dropForeign(['shipping_address_id']);
            // $table->dropForeign(['payment_method_id']);
            // $table->dropColumn('shipping_address_id');
            // $table->dropColumn('payment_method_id');
        });
    }
};
