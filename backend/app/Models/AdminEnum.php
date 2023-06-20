<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminEnum extends Model
{
    use HasFactory;
    protected $casts=[
        'categories'=>'array',
        'brands'=>'array',
    ];
    // default value
    protected $attributes=[
        'categories'=>'[]',
        'brands'=>'[]',
    ];
}
