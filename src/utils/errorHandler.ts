interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function handleApiError(error: unknown): never {
  const err = error as ApiError;
  const message = err.response?.data?.message || err.message || "Something went wrong";

  console.error("[API ERROR]", message);
  throw new Error(message);
}
