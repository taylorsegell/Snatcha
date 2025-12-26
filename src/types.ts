/**
 * Type definitions for the extension
 */

export interface User {
  logged_in: boolean;
  id: string | number;
  premium_token: string | null;
  active_on: 'flaticon' | 'icons8' | 'iconscout' | 'fontawesome' | null;
}

export interface IconScoutUserTraits {
  uuid?: string;
}

export interface IconScoutResponse {
  response: {
    item: {
      urls: {
        original: string;
      };
    };
  };
}

export interface Icons8ApiResponse {
  icon: {
    name?: string;
    svg?: string;
  };
}

export interface FlaticonApiResponse {
  url: string;
}
