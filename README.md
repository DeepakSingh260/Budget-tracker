# Budget Tracker Application Documentation

## Overview
The Budget Tracker is a full-stack web application designed to help users manage their personal finances. It provides features for tracking expenses, managing budgets, categorizing transactions, and visualizing financial data. The application follows a modern architecture with a React frontend and Django backend, implementing best practices for security, performance, and user experience.

## Technical Stack

### Frontend
- **Framework**: React.js (v19.1.0)
  - Functional components with hooks
  - Custom hooks for reusable logic
  - Context API for theme management
- **State Management**: Redux Toolkit (v2.8.2)
  - Slices for feature-based state management
  - Async thunks for API calls
  - Persisted authentication state
- **UI Library**: Material-UI (v7.1.0)
  - Custom theme configuration
  - Responsive components
  - Material icons integration
- **Routing**: React Router (v7.6.0)
  - HashRouter for deployment compatibility
  - Protected route implementation
  - Nested routing structure
- **HTTP Client**: Axios (v1.9.0)
  - Interceptors for token management
  - Error handling middleware
  - Request/response logging
- **Date Handling**: date-fns (v4.1.0)
  - Date formatting utilities
  - Date manipulation functions
  - Localization support

### Backend
- **Framework**: Django (v4.2.0)
  - REST API architecture
  - Model-View-Serializer pattern
  - Custom middleware implementation
- **REST API**: Django REST Framework
  - ViewSets for CRUD operations
  - Custom permissions
  - Nested serializers
- **Authentication**: JWT (JSON Web Tokens)
  - Access and refresh token implementation
  - Token blacklisting
  - Custom authentication backend
- **Database**: 
  - SQLite (Development)
  - PostgreSQL (Production)
  - Database migrations
  - Query optimization
- **CORS**: django-cors-headers
  - Production CORS configuration
  - Security headers
  - Rate limiting

## Design Approach

### 1. Architecture
- **Frontend-Backend Separation**
  - RESTful API design
  - Stateless communication
  - API versioning support
  - Environment-based configuration
- **Component-Based Design**
  - Atomic design principles
  - Reusable component library
  - Component composition
  - Props validation
- **State Management**
  - Redux store structure
  - Action creators
  - Reducer composition
  - Middleware implementation
- **Responsive Design**
  - Mobile-first approach
  - Breakpoint system
  - Fluid typography
  - Flexible layouts

### 2. Security
- **JWT Authentication**
  - Token generation and validation
  - Refresh token rotation
  - Token expiration handling
  - Secure token storage
- **Protected Routes**
  - Route guards
  - Role-based access
  - Session management
  - Redirect handling
- **Data Security**
  - Input validation
  - XSS prevention
  - CSRF protection
  - SQL injection prevention

### 3. Data Flow
- **Redux Implementation**
  - Action types
  - Action creators
  - Reducers
  - Selectors
- **API Integration**
  - Service layer abstraction
  - Error handling
  - Loading states
  - Cache management
- **State Updates**
  - Optimistic updates
  - Error recovery
  - Loading indicators
  - Success notifications

### 4. User Experience
- **Navigation**
  - Breadcrumb navigation
  - Quick actions
  - Search functionality
  - Filtering options
- **Feedback**
  - Toast notifications
  - Loading spinners
  - Error messages
  - Success confirmations
- **Accessibility**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - Color contrast

## Key Features

### 1. Authentication
- **User Registration**
  - Form validation
  - Password strength requirements
  - Email verification
  - Duplicate username check
- **Login System**
  - Remember me functionality
  - Password reset
  - Session management
  - Multiple device support
- **Security Features**
  - Password hashing
  - Rate limiting
  - Account lockout
  - Session timeout

### 2. Categories Management
- **Category Operations**
  - CRUD operations
  - Category hierarchy
  - Default categories
  - Category icons
- **Category Analytics**
  - Spending patterns
  - Category trends
  - Budget allocation
  - Expense distribution

### 3. Transaction Management
- **Transaction Features**
  - Income/expense tracking
  - Recurring transactions
  - Transaction categories
  - Transaction notes
- **Transaction Analysis**
  - Date-based filtering
  - Category filtering
  - Amount filtering
  - Search functionality

### 4. Budget Management
- **Budget Features**
  - Monthly budgets
  - Category budgets
  - Budget alerts
  - Budget rollover
- **Budget Analysis**
  - Budget vs actual
  - Spending trends
  - Category analysis
  - Forecast projections

### 5. Dashboard
- **Overview Components**
  - Balance summary
  - Recent transactions
  - Budget status
  - Category breakdown
- **Visualizations**
  - Expense charts
  - Income charts
  - Budget charts
  - Trend analysis

## API Endpoints

### Authentication
- POST `/auth/register/`
  - Request: `{ username, email, password, password2 }`
  - Response: `{ user, token }`
- POST `/auth/login/`
  - Request: `{ username, password }`
  - Response: `{ access, refresh }`
- GET `/auth/user/`
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ user }`

### Categories
- GET `/categories/`
  - Query params: `{ user }`
  - Response: `[{ id, name, user, created_at }]`
- POST `/categories/`
  - Request: `{ name }`
  - Response: `{ id, name, user, created_at }`
- PUT `/categories/{id}/`
  - Request: `{ name }`
  - Response: `{ id, name, user, created_at }`
- DELETE `/categories/{id}/`
  - Response: `204 No Content`

### Transactions
- GET `/transactions/`
  - Query params: `{ user, category, date_from, date_to }`
  - Response: `[{ id, amount, description, category, date }]`
- POST `/transactions/`
  - Request: `{ amount, description, category, date, type }`
  - Response: `{ id, amount, description, category, date }`
- PUT `/transactions/{id}/`
  - Request: `{ amount, description, category, date, type }`
  - Response: `{ id, amount, description, category, date }`
- DELETE `/transactions/{id}/`
  - Response: `204 No Content`

### Budgets
- GET `/budgets/`
  - Query params: `{ user, month }`
  - Response: `[{ id, amount, category, month }]`
- POST `/budgets/`
  - Request: `{ amount, category, month }`
  - Response: `{ id, amount, category, month }`
- PUT `/budgets/{id}/`
  - Request: `{ amount, category, month }`
  - Response: `{ id, amount, category, month }`
- DELETE `/budgets/{id}/`
  - Response: `204 No Content`

## Database Schema

### User Model
```python
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    date_joined = models.DateTimeField(auto_now_add=True)
```

### Category Model
```python
class Category(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Transaction Model
```python
class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('income', 'Income'),
        ('expense', 'Expense'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
```

### Budget Model
```python
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
```

## Deployment

### Frontend Deployment
- **Build Process**
  - Environment configuration
  - Asset optimization
  - Code splitting
  - Cache busting
- **Hosting Configuration**
  - Static file serving
  - SSL configuration
  - Domain setup
  - CDN integration

### Backend Deployment
- **Server Setup**
  - Gunicorn configuration
  - Nginx reverse proxy
  - SSL termination
  - Static file serving
- **Database Configuration**
  - PostgreSQL setup
  - Connection pooling
  - Backup strategy
  - Migration handling

## Test Credentials

### Admin User
- Username: user1
- Password: strongpassword123
- Access Level: Full access to all features
- Role: Administrator

### Test User
- Username: user1
- Password: strongpassword123
- Access Level: Standard user features
- Role: Regular user

## Future Improvements

1. **Enhanced Analytics**
   - Advanced financial reports
   - Custom date range analysis
   - Data export (CSV, PDF)
   - Interactive charts
   - Predictive analytics

2. **Additional Features**
   - Recurring transactions
   - Bill reminders
   - Receipt image upload
   - Multi-currency support
   - Investment tracking
   - Goal setting
   - Budget templates

3. **Performance Optimization**
   - Redis caching
   - Lazy loading
   - Pagination
   - Query optimization
   - Asset optimization
   - CDN integration

4. **Security Enhancements**
   - Two-factor authentication
   - Password reset
   - Session management
   - Audit logging
   - IP whitelisting
   - Security headers

## Conclusion
The Budget Tracker application demonstrates a robust implementation of modern web development practices. The architecture ensures scalability, maintainability, and security while delivering a smooth user experience. The application's modular design allows for easy extension and maintenance, making it a solid foundation for future enhancements. 
