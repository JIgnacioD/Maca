<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('timegoals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subgoals_id')->constrained()->onDelete('cascade');
            $table->date('start_date');
            $table->integer('active_days');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timegoals');
    }
};
