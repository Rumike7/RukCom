<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use App\Http\Requests\UpdateFileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Upload;

class FileController extends Controller
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

    public function store(Request $request)
    {
      $validator=Validator::make($request->all(),[
        'title' => 'required:max:255',
        'image_path' => 'required',
        'path' => 'required',
      ]);
      if($validator->fails()){
        return response()->json([
            'validation' => 'failed',
            'message' =>'File is not created',
            'file'=>$validator->errors(),
        ],401);  
      }
      $newfile=$request->user()->files()->create([
        'title' => $request->get('title'),
        'image_path' => $request->get('image_path'),
        'path' => $request->get('path')
      ]);
      return response()->json([
        'validation' => 'success',
        'message' => 'Your file is submitted Successfully',
        'file'=>$newfile,
    ],201);

    }

    public function upload(Request $request)
    {
      $uploadedFile = $request->file('file');
      if($uploadedFile)
      {
        $begin=time()."___";
        $filename = $uploadedFile->getClientOriginalName();
        $user= User::where('email',$request->email)->firstOrFail();

        Storage::putFileAs(
          'files/'.$user->uuid,
          $uploadedFile,
          $filename
        );
        $upload = new Upload;
        $upload->filename = $filename;
        $upload->faculty = $request->faculty;
        $upload->domain = $request->domain;
        $upload->file_path = 'backend/storage/app/files/'.$user->uuid.'/'.$filename;
        $upload->user()->associate($user);

        $upload->save();
      }
    }    
    
}
