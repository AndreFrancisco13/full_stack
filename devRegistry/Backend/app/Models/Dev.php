<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dev extends Model
{
    protected $casts = [
        'stack' => 'array',
    ];
    
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'nickname', 'name', 'birth_date', 'stack']; 
}


