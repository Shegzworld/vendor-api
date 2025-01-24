import axios from "axios";
import { apiBaseUrl } from "./apiService";

class Endpoint {
  private apiBaseUrl = apiBaseUrl;

  // Method to log in a user
  public async loginUser(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/auth/login`, {
        email,
        password,
      });

      // Assuming the backend sends back an access token
      const { access: token } = response.data;

      // Save the token in localStorage or another secure storage
      if (token) {
        localStorage.setItem("authToken", token);
      }

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  // Method to register a new user
  public async registerUser(
    username: string,
    email: string,
    password: string,
    role: string,
    name: string,
    phone: string,
    address: string
  ): Promise<void> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/customers/`, {
        username,
        email,
        password,
        role,
        name,
        phone,
        address,
      });

      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }
}

export const endpoint = new Endpoint();
