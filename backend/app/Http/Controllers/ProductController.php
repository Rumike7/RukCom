<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();
        $product = new Product;
        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->discount = $validatedData['discount'] ?? 0;
        $product->quantity = $validatedData['quantity'];
        $product->rating = $validatedData['rating'] ?? 0;
        $product->type = $validatedData['type'] ?? null;
        $product->about = $validatedData['about'] ?? null;
        $product->category = $validatedData['category'];
        $product->brand = $validatedData['brand'];
        $product->is_featured = $validatedData['is_featured'] ?? false;
        $product->is_published = $validatedData['is_published'] ?? true;

        // Upload image file (if present) and set the image and imgpath fields
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('public/products', $filename);
            $product->image = $filename;
            $product->imgpath = $path;
        }
        if (!$product->save()) {
            return response()->json(['error' => 'Failed to create product.'], 500);
        }
        return response()->json(['message' => 'Product created successfully.'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product = Product::find($product);
        if (!$product) {
            session()->flash('error', 'Product not found.');
            return response()->json(['error' => 'Product not found.'], 404);
        }

        return response()->json($product[0], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, $product)
    {
        $validatedData = $request->validated();
        $product = Product::find($product);//or $request->id;
        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 500);
        }

        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->discount = $validatedData['discount'] ?? 0;
        $product->quantity = $validatedData['quantity'];
        $product->rating = $validatedData['rating'] ?? 0;
        $product->type = $validatedData['type'] ?? null;
        $product->about = $validatedData['about'] ?? null;
        $product->category = $validatedData['category'];
        $product->brand = $validatedData['brand'];
        $product->is_featured = $validatedData['is_featured'] ?? false;
        $product->is_published = $validatedData['is_published'] ?? true;

        // Upload image file (if present) and set the image and imgpath fields
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('public/products', $filename);
            $product->image = $filename;
            $product->imgpath = $path;
        }

        // if (!$product->save()) {
        //     return response()->json(['error' => 'Failed to update product.'], 500);
        // }
        if (!$product->save()) {
            return response()->json(['error' => 'Failed to update product.'], 500);
        }
        return response()->json(['message' => 'Product updated successfully.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($product)
    {
        $product = Product::find($product);
        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 500);
        }

        // Delete the associated image file (if present)
        if ($product->image && Storage::exists('public/products/' . $product->image)) {
            Storage::delete('public/products/' . $product->image);
        }

        if (!$product->delete()) {
            return response()->json(['error' => 'Failed to delete product.'], 500);
        }

        return response()->json(['message' => 'Product deleted successfully.'], 200);
    }

    public function search(Request $request,$k)
    {
        if($k=='')return response()->json(['products' => []]);
        $keys = explode(' ', $k);

        $products = Product::where(function ($query) use ($keys) {
            foreach ($keys as $key) {
                $query->orWhere('name', 'LIKE', '%' . $key . '%')
                    ->orWhere('description', 'LIKE', '%' . $key . '%')
                    ->orWhere('type', 'LIKE', '%' . $key . '%')
                    ->orWhere('about', 'LIKE', '%' . $key . '%')
                    ->orWhere('category', 'LIKE', '%' . $key . '%')
                    ->orWhere('brand', 'LIKE', '%' . $key . '%');
            }
        })->get();

        if ($products->isEmpty()) {
            return response()->json(['products' => []]);
        }

        return response()->json(['products' => $products]);
    }
}
