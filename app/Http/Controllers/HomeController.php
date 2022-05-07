<?php


namespace App\Http\Controllers;


use Inertia\Inertia;

class HomeController extends Controller
{
    public function welcome()
    {
        return Inertia::render('Welcome/Index',[]);
    }

}
