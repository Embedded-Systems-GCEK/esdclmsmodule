package database

import (
    "fmt"
    "log"
    "os"

    "esdc-lms-backend/models"

    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
    host := os.Getenv("DB_HOST")
    user := os.Getenv("DB_USER")
    pass := os.Getenv("DB_PASS")
    dbName := os.Getenv("DB_NAME")
    port := os.Getenv("DB_PORT")

    if host == "" {
        host = "127.0.0.1"
    }
    if port == "" {
        port = "3306"
    }

    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        user, pass, host, port, dbName)

    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("❌ Failed to connect to database:", err)
    }

    DB = db
    log.Println("✅ Database connected")

    if err := db.AutoMigrate(
        &models.User{},
        &models.Course{},
        &models.Module{},
        &models.Lesson{},
        &models.Enrollment{},
    ); err != nil {
        log.Fatal("❌ Auto-migration failed:", err)
    }

    log.Println("✅ Auto-migration completed")
}
