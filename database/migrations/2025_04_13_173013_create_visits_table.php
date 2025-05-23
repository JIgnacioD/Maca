<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// TABLA DE LA VISITA REALIZADA, POR QUE USUARIO SE REGISTRA UNA VISITA Y DESCRIPCION DE LA MISMA

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pdv_id')->constrained('pdvs')->onDelete('cascade'); // Relationship with PDV
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Relaciship with users
            $table->foreignId('contact_id')->constrained('contacts')->onDelete('cascade'); // Relaciship with users
            $table->text('description')->nullable(); // Descripción del PDV
            $table->timestamp('start_time'); // Visit start time
            $table->timestamp('end_time')->nullable(); // End time (nullable if not completed yet)
            $table->decimal('start_lat', 10, 7); // Start latitude
            $table->decimal('start_lng', 10, 7); // Start longitude
            $table->decimal('end_lat', 10, 7)->nullable(); // End latitude (nullable)
            $table->decimal('end_lng', 10, 7)->nullable(); // End longitude (nullable)

            $table->softDeletes();
            $table->timestamps(); // created_at and updated_at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
