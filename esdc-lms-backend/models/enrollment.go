package models

import "time"

type Enrollment struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    CreatedAt time.Time  `json:"-"`
    UpdatedAt time.Time  `json:"-"`
    DeletedAt *time.Time `gorm:"index" json:"-"`

    UserID   uint `json:"userId"`
    CourseID uint `json:"courseId"`
}
