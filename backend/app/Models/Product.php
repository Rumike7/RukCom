<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Rating;

class Product extends Model
{
    use HasFactory;

    public function items():HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function ratings():HasMany
    {
        return $this->HasMany(Rating::class);
    }

}
