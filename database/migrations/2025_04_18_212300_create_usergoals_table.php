<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usergoals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('timegoals_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('progress', 8, 2)->default(0); // Progreso actual del objetivo
            $table->enum('status', ['pending', 'in_progress', 'completed', 'failed'])->default('pending');
            $table->dateTime('completed_at')->nullable(); // Fecha de finalización
            $table->text('notes')->nullable(); // Notas o comentarios adicionales
            $table->timestamps();
            $table->softDeletes(); // Permite el borrado lógico

            // Índices para mejorar el rendimiento de las consultas
            $table->index(['user_id', 'status']);
            $table->index('completed_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usergoals');
    }
};
