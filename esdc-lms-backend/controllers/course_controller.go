package controllers

import (
    "net/http"
    "strconv"

    "esdc-lms-backend/database"
    "esdc-lms-backend/models"

    "github.com/gin-gonic/gin"
)

func GetCourses(c *gin.Context) {
    var courses []models.Course
    if err := database.DB.Find(&courses).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch courses"})
        return
    }
    c.JSON(http.StatusOK, courses)
}

func GetCourseByID(c *gin.Context) {
    id := c.Param("id")

    var course models.Course
    if err := database.DB.
        Preload("Modules.Lessons").
        First(&course, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
        return
    }

    var isEnrolled bool
    if userIDVal, exists := c.Get("user_id"); exists {
        userID, _ := userIDVal.(int)
        var enrollment models.Enrollment
        if err := database.DB.
            Where("user_id = ? AND course_id = ?", userID, course.ID).
            First(&enrollment).Error; err == nil {
            isEnrolled = true
        }
    }

    c.JSON(http.StatusOK, gin.H{
        "id":          course.ID,
        "title":       course.Title,
        "code":        course.Code,
        "description": course.Description,
        "modules":     course.Modules,
        "isEnrolled":  isEnrolled,
    })
}

func EnrollCourse(c *gin.Context) {
    idStr := c.Param("id")
    courseID64, err := strconv.ParseUint(idStr, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course id"})
        return
    }

    userIDVal, exists := c.Get("user_id")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }
    userID, _ := userIDVal.(int)

    enrollment := models.Enrollment{
        UserID:   uint(userID),
        CourseID: uint(courseID64),
    }

    // Prevent duplicate enrollments
    var existing models.Enrollment
    if err := database.DB.
        Where("user_id = ? AND course_id = ?", enrollment.UserID, enrollment.CourseID).
        First(&existing).Error; err == nil {
        c.JSON(http.StatusOK, gin.H{"message": "Already enrolled"})
        return
    }

    if err := database.DB.Create(&enrollment).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to enroll"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Enrolled successfully"})
}
func GetLessonByID(c *gin.Context) {
    id := c.Param("id")
    var lesson models.Lesson
    if err := database.DB.First(&lesson, id).Error; err != nil {
        c.JSON(404, gin.H{"error": "Lesson not found"})
        return
    }
    c.JSON(200, lesson)
}
