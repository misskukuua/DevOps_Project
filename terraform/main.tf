terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "web" {
  image  = "ubuntu-20-04-x64"
  name   = "devops-blog-api"
  region = "nyc3"
  size   = "s-1vcpu-1gb"

  ssh_keys = [var.ssh_fingerprint]

  tags = ["web"]
}

variable "do_token" {}
variable "ssh_fingerprint" {}
