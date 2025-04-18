<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('tipo_vias', function (Blueprint $table) {
            $table->string('codigo', 2)->primary();
            $table->string('denominacion');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('tipo_vias');
    }
};
