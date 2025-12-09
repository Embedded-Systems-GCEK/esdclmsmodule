package routes

import (
    "esdc-lms-backend/controllers"
    "esdc-lms-backend/middleware"

    "github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {

    // Public Auth Routes
    r.POST("/api/auth/register", controllers.Register)
    r.POST("/api/auth/login", controllers.Login)

    // Protected Routes (Student + Admin)
    api := r.Group("/api")
    api.Use(middleware.AuthRequired())
    {
        api.GET("/courses", controllers.GetCourses)
        api.GET("/courses/:id", controllers.GetCourseByID)
        api.POST("/courses/:id/enroll", controllers.EnrollCourse)

        // 📌 FIXED: Lesson route must be inside API group
        api.GET("/lessons/:id", controllers.GetLessonByID)
    }

    // Admin Routes
    admin := r.Group("/api/admin")
    admin.Use(middleware.AuthRequired(), middleware.AdminOnly())
    {
        admin.POST("/courses", controllers.CreateCourse)
        admin.DELETE("/courses/:id", controllers.DeleteCourse)
        admin.POST("/courses/:id/modules", controllers.AddModule)
        admin.POST("/modules/:id/lessons", controllers.AddLesson)
    }
}
