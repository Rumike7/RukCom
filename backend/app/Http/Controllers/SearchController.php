<?php

namespace App\Http\Controllers;

use App\Models\Search;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateSearchRequest;

class SearchController extends Controller
{
    public function __construct(){
        $this->middleware('auth:sanctum');
    }
    /**
     * Search by query.
     *
     * @return \Illuminate\Http\Response
     */
    public function searchByKeyWord(Request $request)
    {
        $query = $request->input('query');
        return response()->json;
    }

    public function searchByCategory(Request $request)
    {
        $category = $request->input('category');
        return response()->json;
    }

}
