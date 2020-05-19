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
  key_name = "aws_play"
  security_groups = ["allow_ssh"]

  tags = {
    Name = "web"
    project = "terraform"
  }
}

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"
  # vpc_id: using default AWS account VPC

  ingress {
    description = "SSH from world"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # tags = {}
}


