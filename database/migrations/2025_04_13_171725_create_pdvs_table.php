<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// TABLA DE PUNTOS DE VENTA (pdv)

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
            $table->string('tipo_via',3); // Tipo de la via del PDV
            $table->string('nombre_via',100); // Nombre de la via del PDV
            $table->string('num_via',4); // Número de la via del PDV
            $table->string('cp', 5); // Código postal
            $table->string('localidad'); // Localidad
            $table->string('provincia'); // Provincia
            $table->decimal('lat', 10, 7); // Latitud (coordenadas geográficas)
            $table->decimal('lng', 10, 7); // Longitud (coordenadas geográficas)

            $table->softDeletes();
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
