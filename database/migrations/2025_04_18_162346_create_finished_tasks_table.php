<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('finished_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('pdv_id')->constrained('pdvs')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamp('start_date');
            $table->decimal('start_lat', 10, 7); // Start latitude
            $table->decimal('start_lng', 10, 7); // Start longitude
            $table->timestamp('end_date')->nullable();
            $table->decimal('end_lat', 10, 7)->nullable(); // Finish latitude
            $table->decimal('end_lng', 10, 7)->nullable(); // Finish longitude

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('finished_tasks');
    }
};
