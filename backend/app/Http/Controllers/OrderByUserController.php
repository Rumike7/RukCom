<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\PaymentMethods;
use App\Models\User;
use App\Models\OrderItem;
use App\Models\ShippingAddress;
use App\Models\Product;
use App\Models\Rating;


class OrderByUserController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $orders = Order::where('user_id', '=',  $userId )->get();
        foreach ($orders as $o){
            $items=$o->items;
            foreach ($items as $i){
                $productId=$i->product_id;
                $product=Product::find($productId);
                $i->product=$product;

            }
        }
        return $orders;
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
     * @param  \App\Http\Requests\StoreOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request,$userId)
    {
        $validatedData = $request->validated();
        $data= $validatedData['data'];
        $items= $validatedData['items'];
        $user=User::find($userId);


        if($data['payment'] && $data['shipping'] && $user){
            if(!$user->shipping_address_id || !$user->payment_method_id){
                $paymentMethods = new PaymentMethods($data['payment']);
                $shippingAddress = new ShippingAddress($data['shipping']);
                $paymentMethods->save();
                $shippingAddress->save();

                $user->shipping_address_id=$shippingAddress->id;
                $user->payment_method_id=$paymentMethods->id;

                if (!$user->save()) {
                    return response()->json(['error' => 'Failed to update user.'], 500);
                }
            }

        }
        $order=new Order;
        $order->user_id=$userId;
        $order->order_date=date("Y/m/d");
        if($data['items'])$order->shipping_method=$data['items']['shippingMethod'];
        $sum=0;
        $order->status='validation';
        $order->paid=false;
        $order->total_amount=$sum;

        if (!$order->save()) {
            return response()->json(['error' => 'Failed to create order.'], 500);
        }
        foreach ($items as $i) {
            $item=new OrderItem();
            $item->order_id=$order->id;
            $item->product_id=$i["product"]["id"];
            $item->quantity=$i["quantity"];

            $sum+=$i["product"]["price"]*$i["quantity"];
            if (!$item->save()) {
                return response()->json(['error' => 'Failed to create an order item.'], 500);
            }
        }
        $order->total_amount=$sum;

        if (!$order->save()) {
            return response()->json(['error' => 'Failed to create order.'], 500);
        }

        return response()->json(['message' => 'Order created successfully.'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($userId,$order)
    {
        $order = Order::where('user_id', '=',  $userId )->find($order);
        if (!$order) {
            session()->flash('error', 'Order not found.');
            return response()->json(['error' => 'Order not found.'], 404);
        }
        $items=$order->items;
        foreach ($items as $i){
            $productId=$i->product_id;
            $product=Product::find($productId);
            $i->product=$product;
        }
        return $order;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit($userId,$order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update($request,$userId, $order)
    {
        $validatedData = $request->validated();
        $order = Order::find($order);//or $request->id;
        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 500);
        }

        //TODO :Update function



        // if (!$order->save()) {
        //     return response()->json(['error' => 'Failed to update product.'], 500);
        // }
        if (!$order->save()) {
            return response()->json(['error' => 'Failed to update order.'], 500);
        }
        return response()->json(['message' => 'Order updated successfully.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId,$order)
    {
        $order = Order::find($order);
        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 500);
        }


        if (!$order->delete()) {
            return response()->json(['error' => 'Failed to delete order.'], 500);
        }

        return response()->json(['message' => 'Order deleted successfully.'], 200);
    }

    public function setRatings($userId,$orderId)
    {

        $order = Order::find($orderId);
        if (!$order) {
            session()->flash('error', 'Order not found.');
            return response()->json(['error' => 'Order not found.'], 404);
        }
        $sum=0;$n=0;
        $items=$order->items;
        foreach ($items as $i){
            $productId=$i->product_id;
            $rating=Rating::where('user_id',$userId)
                ->where('product_id',$productId)->first();
                if($rating){
                    $sum+=$rating->rating;
                    $n++;
                }
        }
        $sum/=$n;
        $order->rating=$sum;

        if (!$order->save()) {
            return response()->json(['error' => 'Failed to set rating.'], 500);
        }

        return $order;

    }
}
