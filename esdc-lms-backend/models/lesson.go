package models

import "time"

type Lesson struct {
    ID          uint       `gorm:"primaryKey" json:"id"`
    CreatedAt   time.Time  `json:"-"`
    UpdatedAt   time.Time  `json:"-"`
    DeletedAt   *time.Time `gorm:"index" json:"-"`

    Title       string `json:"title"`
    ContentType string `json:"contentType"`
    ContentURL  string `json:"contentURL"`
    TextContent string `json:"textContent"`
    ModuleID    uint   `json:"moduleId"`
}
