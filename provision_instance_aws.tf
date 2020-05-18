# Configure the AWS Provider
provider "aws" {
  version = "~> 2.0"
  profile = "default"
  region = "us-west-1"
  shared_credentials_file = "~/.aws/credentials_personal_devops"
}

resource "aws_instance" "web" {
  ami = "ami-0f56279347d2fa43e"
  instance_type = "t3.nano"

  tags = {
    Name = "web"
    project = "terraform"
  }
}
