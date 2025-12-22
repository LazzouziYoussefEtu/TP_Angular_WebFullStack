<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;
use App\Models\User;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed some data for testing if needed, or rely on factories
        // Since we don't have the factories definitions visible, we'll try to create model instances directly
    }

    /**
     * Test getting products with pagination.
     */
    public function test_get_products_paginated()
    {
        // Arrange: Create 25 products
        Product::factory()->count(25)->create();

        // Act
        $response = $this->getJson('/api/products');

        // Assert
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['productID', 'productTitle', 'productPrice', 'category']
                     ],
                     'current_page',
                     'last_page',
                     'total'
                 ]);
        
        $this->assertEquals(20, count($response->json('data'))); // Default per page is 20
    }

    /**
     * Test searching products.
     */
    public function test_search_products()
    {
        // Arrange
        Product::factory()->create(['productTitle' => 'UniqueiPhone 15']);
        Product::factory()->create(['productTitle' => 'Samsung Galaxy']);

        // Act
        $response = $this->getJson('/api/products?search=UniqueiPhone');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
        $this->assertEquals('UniqueiPhone 15', $data[0]['productTitle']);
    }

    /**
     * Test filtering products by category.
     */
    public function test_filter_products_by_category()
    {
        // Arrange
        Product::factory()->create(['category' => 'electronics', 'productTitle' => 'TV']);
        Product::factory()->create(['category' => 'books', 'productTitle' => 'Novel']);

        // Act
        $response = $this->getJson('/api/products?category=electronics');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        foreach ($data as $item) {
            $this->assertEquals('electronics', $item['category']);
        }
    }

    /**
     * Test creating a user.
     */
    public function test_create_user()
    {
        // Arrange
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ];

        // Act
        $response = $this->postJson('/api/users', $userData);

        // Assert
        $response->assertStatus(201)
                 ->assertJsonFragment($userData);
        
        $this->assertDatabaseHas('users', $userData);
    }

    /**
     * Test validation when creating a user.
     */
    public function test_create_user_validation()
    {
        // Act
        $response = $this->postJson('/api/users', []);

        // Assert
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name', 'email']);
    }

    /**
     * Test deleting a user.
     */
    public function test_delete_user()
    {
        // Arrange
        $user = User::factory()->create(['email' => 'delete-me@example.com']);

        // Act
        $response = $this->deleteJson("/api/users/{$user->email}");

        // Assert
        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['email' => 'delete-me@example.com']);
    }
}
