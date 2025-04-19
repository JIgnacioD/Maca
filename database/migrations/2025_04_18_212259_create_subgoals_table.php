<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subgoals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goals_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('description');
            $table->integer('value');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subgoals');
    }
};
