package models

import "time"

type User struct {
    ID           uint      `gorm:"primaryKey" json:"id"`
    CreatedAt    time.Time `json:"-"`
    UpdatedAt    time.Time `json:"-"`
    DeletedAt    *time.Time `gorm:"index" json:"-"`

    Name         string `json:"name"`
    Email        string `gorm:"unique" json:"email"`
    PasswordHash string `json:"-"`
    Role         string `json:"role"` // "admin" or "student"
}
