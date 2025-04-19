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
        Schema::create('merchandising_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchandising_subgoal_id')->constrained('merchandising_subgoal')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('stock_load')->default(0);
            $table->integer('stock_used')->default(0);
            $table->timestamp('load_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchandising_user');
    }
};
