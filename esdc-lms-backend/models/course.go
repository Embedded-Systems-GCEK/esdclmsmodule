package models

import "time"

type Course struct {
    ID          uint       `gorm:"primaryKey" json:"id"`
    CreatedAt   time.Time  `json:"-"`
    UpdatedAt   time.Time  `json:"-"`
    DeletedAt   *time.Time `gorm:"index" json:"-"`

    Title       string    `json:"title"`
    Code        string    `gorm:"unique" json:"code"`
    Description string    `json:"description"`
    Modules     []Module  `json:"modules"`
}
