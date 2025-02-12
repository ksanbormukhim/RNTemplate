const apiRequest = async <T>(
  url: string,
  options: RequestInit
): Promise<[number, T | any]> => {
  try {
    const response = await fetch(url, options);

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

    return [response.status, result];
  } catch (error: any) {
    return [500, error];
  }
};

const apiService = {
  buildQueryString: (params: Record<string, any>) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value));
      }
    });
    return query.toString();
  },

  // GET request
  get: async <T>(
    url: string,
    params?: Record<string, any>,
    init?: Omit<RequestInit, 'method'>
  ): Promise<[number, T | any]> => {
    const queryString = params ? `?${apiService.buildQueryString(params)}` : '';
    return await apiRequest(`${url}`, { method: 'GET', ...init });
  },

  //   POST request (FormData)
  post: async <T>(
    url: string,
    formData: FormData,
    init?: Omit<RequestInit, 'method' | 'headers' | 'body'>
  ): Promise<[number, T | any]> => {
    return await apiRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
      ...init,
    });
  },

  // DELETE request
  delete: async <T>(
    url: string,
    init?: Omit<RequestInit, 'method'>
  ): Promise<[number, T | any]> => {
    return await apiRequest(url, { method: 'DELETE', ...init });
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
