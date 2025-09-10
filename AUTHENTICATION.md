# Authentication and Authorization Documentation

This document explains how private routes and role-based authorization work in the GiG Geni application.

## Overview

The application uses a comprehensive authentication and authorization system that includes:
- JWT token-based authentication
- Middleware-based route protection
- Role-based access control (RBAC)
- Client-side authentication guards

## Architecture Components

### 1. Middleware (`middleware.ts`)

The Next.js middleware acts as the primary gatekeeper for route protection, running on every request before pages are rendered.

#### Route Categories

**Public Routes** (No authentication required):
- `/` - Home page
- `/competitions` - Competition listing
- `/competitions/[id]` - Competition details (public viewing)
- `/leaderboards` - Public leaderboards
- `/contact` - Contact page

**Authentication Required Routes**:
- `/profile` - User profile management
- `/settings` - User settings
- `/notifications` - User notifications
- `/competitions/my` - User's competitions

**Role-Based Protected Routes**:
- **Employer Only**:
  - `/competitions/create` - Create new competitions
  - `/competitions/manage` - Manage competitions
  - `/competitions/manage/[id]` - Manage specific competition

- **Employee Only**:
  - `/competitions/join` - Join competitions

- **Admin Access**:
  - All routes (inherits all permissions)

#### JWT Token Processing

```typescript
// Token extraction from cookies
const authCookie = request.cookies.get('auth-token');
const accessToken = authCookie.value; // Direct JWT string

// JWT decoding with URL-safe base64 handling
const tokenParts = accessToken.split('.');
let base64Payload = tokenParts[1];
base64Payload = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
while (base64Payload.length % 4) {
  base64Payload += '=';
}

const payload = JSON.parse(atob(base64Payload));
```

#### Authentication Flow

1. **Token Validation**:
   - Extract JWT from `auth-token` cookie
   - Decode and parse JWT payload
   - Check token expiration
   - Extract user information (id, email, role, name)

2. **Route Protection Logic**:
   - Check if route is public → Allow access
   - Check if user is authenticated → Redirect to home if not
   - Check role-based permissions → Redirect if unauthorized
   - Allow access if all checks pass

3. **Redirect Behavior**:
   - Unauthenticated users: `/?auth=required`
   - Unauthorized users: `/?error=unauthorized`

### 2. Authentication Store (`store/authStore.ts`)

Zustand-based state management for authentication with persistence.

#### State Structure

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => boolean;
  register: (userData: any) => boolean;
  logout: () => void;
  setTokenAndUser: (token: string) => void;
  getTokenFromCookie: () => string | null;
}
```

#### JWT Token Management

**Token Creation**:
```typescript
const createMockJWT = (user: any) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  return `${btoa(JSON.stringify(header))}.${btoa(JSON.stringify(payload))}.signature`;
};
```

**Cookie Management**:
- Tokens stored directly as strings in `auth-token` cookie
- 24-hour expiration for security
- Automatic cleanup on logout

### 3. Client-Side Guards

#### AuthGuard Component (`components/auth/AuthGuard.tsx`)

Protects components that require authentication:

```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback, 
  requireAuth = true 
}) => {
  const { isAuthenticated } = useAuthStore();
  
  if (requireAuth && !isAuthenticated) {
    return fallback || <AuthModal />;
  }
  
  return <>{children}</>;
};
```

#### RoleBasedAccess Component (`components/auth/RoleBasedAccess.tsx`)

Provides fine-grained role-based access control:

```typescript
interface RoleBasedAccessProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  allowedRoles,
  children,
  fallback
}) => {
  const { user } = useAuthStore();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return fallback || <div>Access Denied</div>;
  }
  
  return <>{children}</>;
};
```

## User Roles and Permissions

### Role Hierarchy

1. **Employee**
   - Can join competitions
   - Can view own profile and settings
   - Can access notifications
   - Can view public competition details

2. **Employer**
   - All employee permissions
   - Can create competitions
   - Can manage own competitions
   - Can view competition management dashboard

3. **Admin**
   - All permissions
   - Can access all routes
   - Can manage all competitions
   - System administration capabilities

### Permission Matrix

| Route | Public | Employee | Employer | Admin |
|-------|--------|----------|----------|---------|
| `/` | ✅ | ✅ | ✅ | ✅ |
| `/competitions` | ✅ | ✅ | ✅ | ✅ |
| `/competitions/[id]` | ✅ | ✅ | ✅ | ✅ |
| `/profile` | ❌ | ✅ | ✅ | ✅ |
| `/settings` | ❌ | ✅ | ✅ | ✅ |
| `/notifications` | ❌ | ✅ | ✅ | ✅ |
| `/competitions/my` | ❌ | ✅ | ✅ | ✅ |
| `/competitions/join` | ❌ | ✅ | ❌ | ✅ |
| `/competitions/create` | ❌ | ❌ | ✅ | ✅ |
| `/competitions/manage` | ❌ | ❌ | ✅ | ✅ |

## Security Features

### JWT Token Security

1. **Expiration Handling**:
   - Tokens expire after 24 hours
   - Automatic logout on token expiration
   - Server-side expiration validation

2. **URL-Safe Base64 Encoding**:
   - Handles JWT tokens with URL-safe characters
   - Automatic padding correction
   - Robust decoding with error handling

3. **Cookie Security**:
   - HttpOnly cookies (when implemented server-side)
   - Secure flag for HTTPS
   - SameSite protection

### Route Protection Layers

1. **Middleware Layer** (Server-side):
   - First line of defense
   - Runs before page rendering
   - Handles redirects and access control

2. **Component Guards** (Client-side):
   - Secondary protection
   - Handles UI state and fallbacks
   - Provides user feedback

3. **State Management**:
   - Persistent authentication state
   - Automatic token refresh (when implemented)
   - Cross-tab synchronization

## Usage Examples

### Protecting a Page

```typescript
// pages/profile/page.tsx
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div>Protected Profile Content</div>
    </AuthGuard>
  );
}
```

### Role-Based Component Access

```typescript
// components/CompetitionActions.tsx
import { RoleBasedAccess } from '@/components/auth/RoleBasedAccess';

export default function CompetitionActions() {
  return (
    <div>
      <RoleBasedAccess allowedRoles={['employer', 'admin']}>
        <button>Create Competition</button>
      </RoleBasedAccess>
      
      <RoleBasedAccess allowedRoles={['employee']}>
        <button>Join Competition</button>
      </RoleBasedAccess>
    </div>
  );
}
```

### Custom Hook Usage

```typescript
// hooks/useAuth.ts
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  const hasRole = (role: string) => user?.role === role;
  const hasAnyRole = (roles: string[]) => user && roles.includes(user.role);
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasAnyRole
  };
}
```

## Error Handling

### Authentication Errors

1. **Invalid Token**:
   - Automatic logout
   - Redirect to login
   - Clear stored state

2. **Expired Token**:
   - Show expiration message
   - Redirect to home
   - Prompt for re-authentication

3. **Insufficient Permissions**:
   - Show access denied message
   - Redirect to appropriate page
   - Log security events

### Error Messages

- `?auth=required` - Authentication required
- `?error=unauthorized` - Insufficient permissions
- `?error=expired` - Token expired

## Best Practices

1. **Always use middleware for server-side protection**
2. **Implement client-side guards for better UX**
3. **Validate tokens on both client and server**
4. **Use role-based access for fine-grained control**
5. **Handle errors gracefully with user feedback**
6. **Keep authentication state synchronized**
7. **Implement proper logout functionality**
8. **Use HTTPS in production**
9. **Regularly rotate JWT secrets**
10. **Monitor authentication events**

## Future Enhancements

- [ ] Implement refresh token mechanism
- [ ] Add multi-factor authentication
- [ ] Implement session management
- [ ] Add audit logging
- [ ] Implement rate limiting
- [ ] Add OAuth integration
- [ ] Implement password policies
- [ ] Add account lockout mechanisms