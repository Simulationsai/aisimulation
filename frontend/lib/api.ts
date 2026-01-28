// Get API URL and ensure no trailing slash - ABSOLUTE FIX
const getApiUrl = () => {
  let url = (process.env.NEXT_PUBLIC_API_URL || 'https://simulationai-api.onrender.com').trim();
  // Remove ALL trailing slashes
  url = url.replace(/\/+$/, '');
  // Safety: Remove any double slashes (except protocol)
  if (url.includes('//') && url.indexOf('//') !== url.indexOf('://')) {
    const protocol = url.substring(0, url.indexOf('://') + 3);
    const rest = url.substring(url.indexOf('://') + 3);
    url = protocol + rest.replace(/\/+/g, '/');
  }
  return url;
};

const API_URL = getApiUrl();

// Log on module load for debugging
if (typeof window !== 'undefined') {
  console.log('🔧 API_URL initialized:', API_URL);
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // ABSOLUTE FIX: Clean everything and rebuild
  let baseUrl = (API_URL || '').trim();
  // Remove ALL trailing slashes
  baseUrl = baseUrl.replace(/\/+$/, '');
  
  let cleanEndpoint = endpoint.trim();
  // Remove ALL leading slashes
  cleanEndpoint = cleanEndpoint.replace(/^\/+/, '');
  
  // Build URL with exactly one slash
  let url = baseUrl + '/' + cleanEndpoint;
  
  // CRITICAL: Fix any double slashes (but preserve http:// or https://)
  url = url.replace(/([^:])\/\//g, '$1/');
  
  // Final safety: If still has double slash, force fix
  if (url.includes('//') && url.indexOf('://') < url.lastIndexOf('//')) {
    const protocol = url.substring(0, url.indexOf('://') + 3);
    const rest = url.substring(url.indexOf('://') + 3);
    url = protocol + rest.replace(/\/+/g, '/');
  }
  
  // Final validation and emergency fix
  const protocolIndex = url.indexOf('://');
  if (url.includes('//') && url.lastIndexOf('//') !== protocolIndex) {
    console.error('❌ DOUBLE SLASH DETECTED! Fixing...', url);
    // Emergency fix: preserve protocol, fix rest
    const protocol = url.substring(0, protocolIndex + 3);
    const rest = url.substring(protocolIndex + 3);
    url = protocol + rest.replace(/\/+/g, '/');
    console.log('✅ EMERGENCY FIXED:', url);
  }
  
  // Log for debugging
  console.log('🔗 API Request URL:', url);
  console.log('   Base URL:', baseUrl);
  console.log('   Endpoint:', cleanEndpoint);
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  try {
    console.log('🌐 API Request:', url, options.method || 'GET'); // Debug log
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorData: any = { message: response.statusText };
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        }
      } catch (e) {
        // If JSON parsing fails, use status text
        console.warn('Failed to parse error response as JSON:', e);
      }
      console.error('❌ API Error:', response.status, errorData); // Debug log
      // Extract message from error response (NestJS format: { message, error, statusCode })
      const errorMessage = errorData.message || errorData.error || response.statusText || 'Request failed';
      throw new ApiError(response.status, errorMessage);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {} as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('❌ Network Error:', error); // Debug log
    throw new Error('Network error: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

export const api = {
  baseURL: API_URL,

  // Health check
  async health() {
    return request<{ status: string; timestamp: string; service: string; version: string }>('api/health');
  },

  // Waitlist
  waitlist: {
    async join(email: string) {
      return request<{ success: boolean; message: string }>('api/waitlist/join', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },
    async count() {
      return request<{ count: number }>('api/waitlist/count');
    },
  },

  // Auth
  auth: {
    async login(email: string, password: string) {
      const response = await request<{ token: string; user: any }>('api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (typeof window !== 'undefined' && response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      return response;
    },
    async register(data: { name: string; email: string; password: string }) {
      const response = await request<{ token: string; user: any }>('api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (typeof window !== 'undefined' && response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      return response;
    },
    async walletLogin(walletAddress: string) {
      const response = await request<{ token: string; user: any }>('api/auth/wallet-login', {
        method: 'POST',
        body: JSON.stringify({ walletAddress }),
      });
      if (typeof window !== 'undefined' && response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      return response;
    },
    logout() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    },
    getToken() {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
      }
      return null;
    },
  },

  // Wallet
  wallet: {
    async getBalance() {
      return request<{ total: number; available: number; staked: number; pending: number; currency: string }>('api/wallet/balance');
    },
    async deposit(amount: number, txHash: string) {
      return request<{ id: string; type: string; amount: number; status: string; timestamp: Date }>('api/wallet/deposit', {
        method: 'POST',
        body: JSON.stringify({ amount, txHash }),
      });
    },
    async withdraw(amount: number, address: string) {
      return request<{ id: string; type: string; amount: number; status: string; timestamp: Date }>('api/wallet/withdraw', {
        method: 'POST',
        body: JSON.stringify({ amount, address }),
      });
    },
    async getTransactions() {
      return request<any[]>('api/wallet/transactions');
    },
    async getDepositAddress() {
      return request<{ address: string; network: string; chainId: number }>('api/wallet/address');
    },
  },

  // Users
  users: {
    async getMe() {
      return request<{
        id: string;
        name: string;
        username?: string;
        email: string;
        walletAddress?: string;
        twitterHandle?: string;
        discordHandle?: string;
      }>('api/users/me');
    },
    async updateMe(data: {
      name?: string;
      username?: string;
      email?: string;
      walletAddress?: string;
      twitterHandle?: string;
      discordHandle?: string;
    }) {
      return request('api/users/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
  },

  // API Keys
  apiKeys: {
    async list() {
      return request<any[]>('api/api-keys');
    },
    async create(name: string) {
      return request<{ id: string; name: string; key: string; created: Date }>('api/api-keys', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
    },
    async delete(id: string) {
      return request<{ success: boolean }>(`api/api-keys/${id}`, {
        method: 'DELETE',
      });
    },
    async getUsage(id: string) {
      return request<{ requests: number; lastUsed: Date | null; limit: number }>(`api/api-keys/usage/${id}`);
    },
  },

  // Nodes
  nodes: {
    async list() {
      return request<any[]>('api/nodes');
    },
    async createLite() {
      return request<any>('api/nodes/lite', {
        method: 'POST',
      });
    },
    async createUltra(token: string) {
      return request<any>('api/nodes/ultra', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
    },
    async get(id: string) {
      return request<any>(`api/nodes/${id}`);
    },
    async start(id: string) {
      return request<any>(`api/nodes/${id}/start`, {
        method: 'POST',
      });
    },
    async stop(id: string) {
      return request<any>(`api/nodes/${id}/stop`, {
        method: 'POST',
      });
    },
    async getMetrics(id: string) {
      return request<{ cpu: number; memory: number; bandwidth: number; latency: number; tasksCompleted: number }>(`api/nodes/${id}/metrics`);
    },
    async delete(id: string) {
      return request<{ success: boolean }>(`api/nodes/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Airdrop
  airdrop: {
    async getStatus() {
      return request<{
        airdropUser: any;
        tasks: any[];
        mandatoryTasks: {
          follow: boolean;
          retweet: boolean;
          likeComment: boolean;
        };
        optionalTasks: {
          dailyLike: boolean;
          reposts: number;
          comments: number;
        };
      }>('api/airdrop/status');
    },
    async getReferralStats() {
      return request<{
        referralCode: string;
        totalReferrals: number;
        totalReferralEarnings: number;
        referrals: any[];
      }>('api/airdrop/referral-stats');
    },
    async registerWithReferral(referralCode: string) {
      return request<any>('api/airdrop/register-referral', {
        method: 'POST',
        body: JSON.stringify({ referralCode }),
      });
    },
    async updateTwitter(twitterHandle: string, twitterUserId?: string) {
      return request<any>('api/airdrop/update-twitter', {
        method: 'POST',
        body: JSON.stringify({ twitterHandle, twitterUserId }),
      });
    },
    async completeMandatoryTask(taskType: string, proof?: string) {
      return request<any>('api/airdrop/complete-mandatory-task', {
        method: 'POST',
        body: JSON.stringify({ taskType, proof }),
      });
    },
    async completeOptionalTask(taskType: string, proof?: string) {
      return request<any>('api/airdrop/complete-optional-task', {
        method: 'POST',
        body: JSON.stringify({ taskType, proof }),
      });
    },
    async checkReferralCode(code: string) {
      return request<{ valid: boolean; code?: string }>(`api/airdrop/referral-code/${code}`);
    },
  },
};

export default api;
