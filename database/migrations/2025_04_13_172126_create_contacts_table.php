<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id(); // ID autoincremental
            $table->string('nombre'); // Nombre del contacto
            $table->string('apellidos'); // Apellidos del contacto
            $table->string('telefono')->unique(); // Teléfono
            $table->string('email')->unique()->nullable(); // Email único
            $table->string('cargo'); // Cargo en la empresa

            $table->softDeletes();
            $table->timestamps(); // Campos created_at y updated_at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
