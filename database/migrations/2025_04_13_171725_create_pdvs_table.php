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
        Schema::create('pdvs', function (Blueprint $table) {
            $table->id(); // ID autoincremental
            $table->string('nombre_pdv'); // Nombre del PDV
            $table->text('descripcion')->nullable(); // Descripción del PDV
            $table->string('direccion'); // Dirección del PDV
            $table->string('cp', 10); // Código postal
            $table->string('localidad'); // Localidad
            $table->string('provincia'); // Provincia
            $table->decimal('lat', 10, 7); // Latitud (coordenadas geográficas)
            $table->decimal('lng', 10, 7); // Longitud (coordenadas geográficas)
            $table->timestamps(); // Campos created_at y updated_at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pdvs');
    }
};
