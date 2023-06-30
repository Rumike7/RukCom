<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
use App\Models\Product;
use App\Models\User;


class RatingController extends Controller
{

/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ratings = Rating::get();
        
        return $ratings;
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
        $rating=new Rating([
            'user_id'=>$request->user_id,
            'product_id'=>$request->product_id,
            'rating'=>$request->rating,
            'comment'=>$request->comment,
        ]);

        if (!$rating->save()) {
            return response()->json(['error' => 'Failed to create rating.'], 500);
        }
        return response()->json(['message' => 'Rating successful created.'], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $rating = Rating::find($id);
        if (!$rating) {
            session()->flash('error', 'Rating not found.');
            return response()->json(['error' => 'Rating not found.'], 404);
        }

        return $rating;
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
        $rating=Rating::find($id);
        if($request['rating'])$rating->rating=$request['rating'];
        if($request['comment'])$rating->paid=$request['comment'];

        if (!$rating->save()) {
            return response()->json(['error' => 'Failed to create rating.'], 500);
        }

        return response()->json(['message' => 'Rating created successfully.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $rating = Rating::find($id);
        if (!$rating) {
            return response()->json(['error' => 'Rating not found.'], 500);
        }


        if (!$rating->delete()) {
            return response()->json(['error' => 'Failed to delete rating.'], 500);
        }

        return response()->json(['message' => 'Rating deleted successfully.'], 200);
    }
    
    
    


}
