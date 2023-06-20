<?php

namespace App\Http\Controllers;

use App\Models\AdminEnum;
use Illuminate\Http\Request;
const BRANDS=0;
const CATEGORIES=1;
class AdminEnumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AdminEnum  $adminEnum
     * @return \Illuminate\Http\Response
     */
    public function show($adminEnum)
    {
        $enum=AdminEnum::find($adminEnum);
        return $enum;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AdminEnum  $adminEnum
     * @return \Illuminate\Http\Response
     */
    public function edit(AdminEnum $adminEnum)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AdminEnum  $adminEnum
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $type)
    {
        $enum=AdminEnum::find(1);
        if($type==BRANDS){
            $enum->brands=$request['dataarray'];
        }
        if($type==CATEGORIES){
            $enum->categories=$request['dataarray'];
        }
        $enum->save();
        return $enum;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AdminEnum  $adminEnum
     * @return \Illuminate\Http\Response
     */
    public function destroy(AdminEnum $adminEnum)
    {
        //
    }
}
