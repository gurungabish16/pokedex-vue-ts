async function request<TResponse>(
    url: string,
    config?: RequestInit
): Promise<TResponse> {
    const response = await fetch(url, config);
    return await response.json();
}
async function requestFile(
    url: string,
    config?: RequestInit
): Promise<Blob> {
    const response = await fetch(url, config);
    return await response.blob();
}

export const api = {
    get: <TResponse>(url: string) => request<TResponse>(url),
    getBlob: (url: string) => requestFile(url),
}

