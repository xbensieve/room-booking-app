const API_BASE_URL = "http://localhost:8081/api";

export interface ApiResponse<T> {
  data: T;
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetHotelsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const hotelService = {
  async getHotels(params: GetHotelsParams = {}): Promise<ApiResponse<any[]>> {
    const { page = 1, pageSize = 10, search } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (search) {
      searchParams.append("search", search);
    }

    const response = await fetch(`${API_BASE_URL}/hotels?${searchParams}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }

    return response.json();
  },

  async createHotel(data: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/hotels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create hotel");
    }

    return response.json();
  },

  async updateHotel(id: number, data: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update hotel");
    }

    return response.json();
  },

  async deleteHotel(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete hotel");
    }
  },
};
