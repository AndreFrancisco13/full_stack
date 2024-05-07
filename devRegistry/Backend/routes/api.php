<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevController; 

Route::middleware('api')->group(function () {
    Route::post('/devs', [DevController::class, 'store']);
    Route::get('/devs', [DevController::class, 'index']);
    Route::get('/devs/search', [DevController::class, 'search']);
    Route::get('/devs/{id}', [DevController::class, 'show']);
    
});

