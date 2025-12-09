package controllers

import (
    "net/http"
    "strconv"

    "esdc-lms-backend/database"
    "esdc-lms-backend/models"

    "github.com/gin-gonic/gin"
)

func CreateCourse(c *gin.Context) {
    var body struct {
        Title       string `json:"title"`
        Code        string `json:"code"`
        Description string `json:"description"`
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
        return
    }

    course := models.Course{
        Title:       body.Title,
        Code:        body.Code,
        Description: body.Description,
    }

    if err := database.DB.Create(&course).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create course"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "id":          course.ID,
        "title":       course.Title,
        "code":        course.Code,
        "description": course.Description,
    })
}

func DeleteCourse(c *gin.Context) {
    id := c.Param("id")

    if err := database.DB.Delete(&models.Course{}, id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete course"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Course deleted"})
}

func AddModule(c *gin.Context) {
    courseIDStr := c.Param("id")
    courseID64, err := strconv.ParseUint(courseIDStr, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course id"})
        return
    }

    var body struct {
        Title       string `json:"title"`
        Description string `json:"description"`
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
        return
    }

    module := models.Module{
        Title:       body.Title,
        Description: body.Description,
        CourseID:    uint(courseID64),
    }

    if err := database.DB.Create(&module).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create module"})
        return
    }

    c.JSON(http.StatusOK, module)
}

func AddLesson(c *gin.Context) {
    moduleIDStr := c.Param("id")
    moduleID64, err := strconv.ParseUint(moduleIDStr, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid module id"})
        return
    }

    var body struct {
        Title       string `json:"title"`
        ContentType string `json:"contentType"`
        ContentURL  string `json:"contentURL"`
        TextContent string `json:"textContent"`
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
        return
    }

    lesson := models.Lesson{
        Title:       body.Title,
        ContentType: body.ContentType,
        ContentURL:  body.ContentURL,
        TextContent: body.TextContent,
        ModuleID:    uint(moduleID64),
    }

    if err := database.DB.Create(&lesson).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create lesson"})
        return
    }

    c.JSON(http.StatusOK, lesson)
}
