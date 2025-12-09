package models

import "time"

type Module struct {
    ID          uint       `gorm:"primaryKey" json:"id"`
    CreatedAt   time.Time  `json:"-"`
    UpdatedAt   time.Time  `json:"-"`
    DeletedAt   *time.Time `gorm:"index" json:"-"`

    Title       string   `json:"title"`
    Description string   `json:"description"`
    CourseID    uint     `json:"courseId"`
    Lessons     []Lesson `json:"lessons"`
}
