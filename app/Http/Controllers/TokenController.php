<?php

namespace App\Http\Controllers;

use App\Models\Token;
use Illuminate\Http\Request;
use Kreait\Firebase\Exception\MessagingException;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Laravel\Firebase\Facades\Firebase;

class TokenController extends Controller
{
    public function store(Request $request)
    {
        $data=$request->validate([
            'token'=>['string','required']
        ]);
        $token=Token::where('token',$data['token'])->get();
        if(!$token){
            Token::create($data);
        }
        return 'success';
    }
    public function notify(Request $request)
    {
        $data = $request->validate([
            'title' => ['string', 'required'],
            'body' => ['string', 'required']
        ]);


        $notification = Notification::fromArray([
            'title' => $data['title'],
            'body' => $data['body'],
            'icon' => 'stock_ticker_update'
        ]);


        $deviceTokens = array();
        $tokens = Token::all();
        foreach ($tokens as $token) {
            if ($token->token) {
                array_push($deviceTokens, $token->token);
            }
        }
        $messaging = Firebase::project('Allied')->messaging();
        $message = CloudMessage::new()->withNotification($notification); // Any instance of KreaitMessagingMessage
        try {
            $sendReport = $messaging->sendMulticast($message, $deviceTokens);
        } catch (MessagingException $e) {
            //  dd($e);
        } catch (FirebaseException $e) {
            // dd($e);
        }
    }
}
