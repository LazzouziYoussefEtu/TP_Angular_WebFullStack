<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'productID',
        'productTitle',
        'productPrice',
        'productImage',
        'category',
        'productDescription',
    ];

    public function scopeFilter($query, array $filters)
    {
        if ($filters['search'] ?? false) {
            $query->where('productTitle', 'like', '%' . $filters['search'] . '%');
        }

        if ($filters['category'] ?? false) {
            $query->where('category', $filters['category']);
        }
    }
}
