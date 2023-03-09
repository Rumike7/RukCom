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
    
        Schema::create('uploads', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->string('filename');
            //image_path:storage_path()."/app/images/".filename
            //file_path:storage_path()."/app/files/".filenam,

            $table->integer('accepted')->default(0);
            $table->integer('admin_id')->unsigned()->index()->default(1);
            $table->string('domain')->default("")->nullable();
            $table->string('faculty')->default("")->nullable();
            $table->string('type')->default("Cours");
            $table->string('file_path');
            $table->string('image_path')->default(
                "backend/storage/app/images/images.pdf"
            );
            $table->string('liked')->default('0');
            $table->text('description')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
            $table->foreign('admin_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('uploads');
    }
};
