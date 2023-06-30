<?php

namespace App\Http\Requests;
use App\Models\AdminEnum;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $enum=AdminEnum::find(1);
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'numeric|min:0|max:100',
            'quantity' => 'required|integer|min:0',
            'rating' => 'integer|min:0|max:5',
            'type' => 'nullable|string|max:255',
            'about' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'imgpath' => 'nullable|string|max:255',
            'category' => ['required',Rule::in($enum->categories)],
            'brand' => ['required',Rule::in($enum->brands)],
            'is_featured' => 'accepted',
            'is_published' => 'accepted',
        ];
    }
}
