<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Upload;
use App\Http\Controllers\MessageController;

class AdminController extends MessageController
{
    private function setAdmin(User $user){
        $user->admin = true;
    }
    public function isAdmin(User $user){
        return $user->admin;
    }
    public function unverifiedBooks(){
        return Upload::where('accepted',0)->get();
    }
    public function verifiedBooks(){
        return Upload::where('accepted',1)->get();
    }
    public function accept(Request $request){
        $upload=$request->upload();
        $upload->accepted=1;
        $upload->admin=$request->user;
        $this->uploadMessage($upload, $upload->filename." est accepté pour faire parti du catalogue");
    }
    public function reject(Request $request){
        $upload=$request->upload();
        $upload->accepted=-1;
        $upload->admin=$request->user;
        $this->uploadMessage($upload, $upload->filename." est malheuresement rejeté, ressayer voir!");
    }
    public function setType(Upload $upload,$type){
        $upload->type=$type;
    }
}
