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
            $table->string('pdv_name'); // Nombre del PDV
            $table->text('description')->nullable(); // Descripción del PDV
            $table->string('address'); // Dirección del PDV
            $table->string('street_type',2); // Tipo de la via del PDV
            $table->string('street_name',100); // Nombre de la via del PDV
            $table->string('street_num',4); // Número de la via del PDV
            $table->string('cp', 5); // Código postal
            $table->string('city'); // Localidad
            $table->string('province'); // Provincia
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
