variable "tf_state_bucket" {
  description = "Name of S3 bucket in AWS fo storing TF state"
  default     = "devops-app-set"
}

variable "tf_state_lock_table" {
  description = "Namee of the DynamoDB table for TF state locking"
  default     = "devop-app-lock"
}

variable "project" {
  description = "Project name for tagging resources"
  default     = "recipe-app-api"
}

variable "contact" {
  description = "Contact name for tagging resource"
  default     = "jerome@example.com"
}
