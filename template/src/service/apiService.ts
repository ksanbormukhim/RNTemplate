// apiService.ts
const apiBaseUrl = 'https://your-api-url.com'; // Replace with your actual API base URL

// Helper function to handle requests
const apiRequest = async <T>(
  url: string,
  options: RequestInit
): Promise<[number, T | any]> => {
  try {
    const response = await fetch(`${apiBaseUrl}${url}`, options);

    const contentType = response.headers.get('Content-Type');
    let result: any;

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    return [response.status, result]; // Return status and result as an array
  } catch (error: any) {
    return [500, error]; // Return error status and message
  }
};

// Service functions for various API requests
const apiService = {
  // GET request
  get: async <T>(url: string): Promise<[number, T | any]> => {
    return await apiRequest(url, { method: 'GET' });
  },

  //   POST request (FormData)
  post: async <T>(
    url: string,
    formData: FormData
  ): Promise<[number, T | any]> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    };
    return await apiRequest(url, options);
  },

  // DELETE request
  delete: async <T>(url: string): Promise<[number, T | any]> => {
    return await apiRequest(url, { method: 'DELETE' });
  },

  // PUT request (optional)
  //   put: async <T >(
  //     url: string,
  //     data: any
  //   ): Promise<[number, T | any]> => {
  //     return await apiRequest(url, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   },

  // PATCH request (optional)
  //   patch: async <T >(
  //     url: string,
  //     data: any
  //   ): Promise<[number, T | any]> => {
  //     return await apiRequest(url, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   },
};

export default apiService;
