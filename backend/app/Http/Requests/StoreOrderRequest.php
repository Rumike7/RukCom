<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
        return [
            'data.shipping.firstName' => 'required|string|max:255',
            'data.shipping.lastName' => 'required|string|max:255',
            'data.shipping.streetAddress' => 'required|string|max:255',
            'data.shipping.city' => 'required|string|max:255',
            'data.shipping.state' => 'required|string|max:255',
            'data.shipping.postalCode' => 'required|string|max:20',
            'data.shipping.country' => 'required|string|max:255',
            'data.shipping.phoneNumber' => 'required|string|max:20',
            'data.payment.creditCardNumber' => 'required|string|max:20',
            'data.payment.expirationDate' => 'required|date',
            'data.payment.cvv' => 'required|string|max:4',
            'data.payment.billingAddress' => 'required|string|max:255',
            'data.items.shippingMethod' => 'required|string|max:255',
            'items.*.product.id' => 'required|integer',
            'items.*.product.price' => 'required|integer',
            'items.*.quantity' => 'required|integer',
        ];
    }
}
