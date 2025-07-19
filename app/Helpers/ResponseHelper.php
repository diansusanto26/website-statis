<?php

namespace App\Helpers;

use illuminate\Http\JsonResponse;

class ResponseHelper
{
    public static function JsonResponse($success, $message, $data, $statusCode): JsonResponse
    {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }
}