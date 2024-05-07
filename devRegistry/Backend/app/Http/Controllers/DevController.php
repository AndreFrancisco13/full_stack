<?php

namespace App\Http\Controllers;

use App\Models\Dev;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class DevController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $devs = Dev::limit(20)->get();
        $count = Dev::count();
        return response()->json($devs, 200)->header('X-Total-Count', $count);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Request data:', $request->all());
    
        $validator = Validator::make($request->all(), [
            'nickname' => 'required|string|max:32|unique:devs',
            'name' => 'required|string|max:100',
            'birth_date' => 'required|date_format:Y-m-d',
            'stack' => 'nullable|array'
        ]);
    
        if ($validator->fails()) {
            Log::error('Validation failed:', $validator->errors()->toArray());
            return response()->json($validator->errors(), 422);
        }
    
        $dev = Dev::create([
            'id' => Str::uuid(),
            'nickname' => $request->nickname,
            'name' => $request->name,
            'birth_date' => $request->birth_date,
            'stack' => $request->stack,
        ]);
    
        Log::info('New dev created:', ['id' => $dev->id]);
    
        return response()->json(['id' => $dev->id], 201)->header('Location', "/devs/{$dev->id}");
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dev = Dev::find($id);

    if (!$dev) {
        return response()->json(['message' => 'Developer not found'], 404);
    }

    return response()->json($dev, 200);  // Alterado para retornar o objeto completo
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function search(Request $request)
{
    $terms = $request->query('terms');

    if (!$terms) {
        return response()->json(['message' => 'Terms query is required'], 400);
    }

    $devs = Dev::where('nickname', 'LIKE', "%{$terms}%")
               ->orWhere('name', 'LIKE', "%{$terms}%")
               ->orWhere('stack', 'LIKE', "%{$terms}%")
               ->limit(20)
               ->get();

    return response()->json($devs, 200);
}
}
