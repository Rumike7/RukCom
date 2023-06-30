<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;


class OrderController extends Controller
{

/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::get();
        foreach ($orders as $o){
            $items=$o->items;
            foreach ($items as $i){
                $productId=$i->product_id;
                $product=Product::find($productId);
                $i->product=$product;

            }
            $userId=$o->user_id;
            $user=User::find($userId);
            $o->user=$user;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::find($id);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $order=Order::find($id);
        if($request['shipping_method'])$order->shipping_method=$request['shipping_method'];
        if($request['status'])$order->status=$request['status'];
        if($request['paid'])$order->paid=$request['paid'];
        //TODO: Update the others fields

        if (!$order->save()) {
            return response()->json(['error' => 'Failed to create order.'], 500);
        }

        return response()->json(['message' => 'Order created successfully.'], 200);
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }





}
