# Public  endpoints:
*comments:
GET /comments
GET /comments/{id}
*auth:
POST auth/login
POST auth/register
{
    
}
POST auth/{token}/verify-email
POST auth/reset-password
*user:
GET user-profile
*search:
POST search

*file:
POST files/add


# Private endpoints:
*comments:
POST /comments
PUT  /comments/{id}
DELETE /comments/{id}
*auth:
POST auth/logout
POST auth/refresh

*user:
GET /user


*file:
GET files/{id}
GET files/no-ordered


# Front routes:
auth/refresh
auth/
