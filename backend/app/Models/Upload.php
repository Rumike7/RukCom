<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'faculty',
        'domain'
      ];
    
    public function user()
    {
      return $this->belongsTo(User::class,'user_id');
    }
    
    public function admin()
    {
      return $this->belongsTo(User::class,'admin_id');
    }
    
}
